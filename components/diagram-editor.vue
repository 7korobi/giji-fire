<template lang="pug">
div
  diagram-view(v-model="value" :pin_id.sync="pin_id")
  hr.footnote
  div.form
    button.fine(@click="submit" :class="{ ban, warn }")
      i.mdi(:class="mark")
      span
        | {{chars}}/
        sub {{maxSize}}字
        | {{words}}/
        sub {{maxWord}}文
        | {{lines}}/
        sub {{maxRow}}人
    slot
  div
    div(v-if="pin_icon")
      a.btn(@click="del_icon(pin_icon)") DEL
      select(v-model="pin_icon.roll" key="roll")
        option(:value="  0") ↑
        option(:value=" 90") →
        option(:value="180") ↓
        option(:value="270") ←
      input(v-model.trim="pin_icon.label" key="label")
    div(v-if="pin_line")
      a.btn(@click="del_line(pin_line)") DEL
      select(v-model="pin_line.v" key="v")
        option(v-for="(o, key) in calcs" v-if="'hide' != o.class" :value="key") {{o.label}}
      select(v-model="pin_line.vpos" key="vpos")
        option(:value="  0") ↑
        option(:value=" 90") →
        option(:value="180") ↓
        option(:value="270") ←
      select(v-model="pin_line.line" key="line")
        option(v-for="[v, txt] in line_styles" :value="v") {{ txt }}
      select(v-model="pin_line.wpos" key="wpos")
        option(:value="  0") ↑
        option(:value=" 90") →
        option(:value="180") ↓
        option(:value="270") ←
      select(v-model="pin_line.w" key="w")
        option(v-for="(o, key) in calcs" v-if="'hide' != o.class" :value="key") {{o.label}}
      input(v-model.trim="pin_line.label" key="label")
    div(v-if="pin_cluster && pin_cluster.vs")
      a.btn(@click="del_cluster(pin_cluster)") DEL
      | &emsp;
      a.btn(
        v-for="(v, index) in pin_cluster.vs"
        v-if="calcs[v]"
        :key="`vs.${index}`"
        @click="pin_cluster.vs.splice(index, 1)"
      ) {{ calcs[v].label }}
      select(v-model="pin_cluster.vs[pin_cluster.vs.length]" key="vs.new")
        option(:value="undefined") (追加)
        option(v-for="(o, key) in calcs" v-if="'box' == o.class && ! pin_cluster.vs.includes(key)" :value="key") {{o.label}}
      input(v-model.trim="pin_cluster.label" key="label")
    div
      a.btn(v-if="pin_icon || pin_cluster" @click="add_line(pin_id)") line
      a.btn(v-if="pin_icon" @click="add_cluster(pin_id)") cluster
      p(v-if="! pin_id")
        select(v-model="pin_face")
          optgroup(v-for="tag in tags" :label="tag.label")
            option(v-for="o in pin_face_option(tag)" v-if="! Object.keys(calcs).includes(o.v)" :value="o") {{ o.label }}
        a.btn(v-if="pin_face" @click="add_icon(pin_face, 0)") icon
</template>

<script lang="coffee">
{ Query, State } = require "memory-orm"

editor = require './editor'

id_line = ({ v, w, vpos, wpos })->
  "#{[v,w]}=#{[vpos,wpos]}"
id_cluster = ({ vs })->
  "#{vs}"

module.exports = editor
  props:
    value: Object

  data: ->
    step: State.step
    pin_id: ''
    pin_face: null

  directives:
    agent:
      bind: (el, { def, value, arg, modifiers, expression }, { context, data } )->
        console.log 'bind', value, data.on
      inserted: (el, { def, value, oldValue, arg, modifiers, expression }, vnode )->
        #console.log 'inserted', value, vnode
      update: (el, { def, value, oldValue, arg, modifiers, expression }, vnode, oldVnode )->
        #console.log 'update', value, vnode, oldVnode
      componentUpdated: (el, { def, value, oldValue, arg, modifiers, expression }, vnode, oldVnode )->
        #console.log 'componentUpdated', value, vnode, oldVnode
      unbind: (el, { def, value, oldValue, arg, modifiers, expression }, vnode, _, is_unbind )->
        #console.log 'unbind', value, vnode, is_unbind

  methods:
    pin_face_option: (tag)->
      csid = tag.chr_set_id
      tag.faces.list.map (face)->
        id = v = face.id
        job =
          Query.chr_jobs
          .find "#{csid}_#{face.id}"
          ?.job
        label = "#{job} #{face.name}"

        { id, v, job, label }

    add_icon: ({v, label}, roll)->
      @value.icons.push { v, roll, label, x: 0, y: 0 }
      pin_face = null
    add_line: (v, w = v)-> @value.lines.push { v, w, line: "o=o", vpos: 0, wpos: 90, label: "line" }
    add_cluster: (...vs)-> @value.clusters.push { vs, label: "cluster" }

    del_icon:    -> @value.icons    = ( o for o in @value.icons    when @pin_id != o.v )
    del_line:    -> @value.lines    = ( o for o in @value.lines    when @pin_id != id_line o )
    del_cluster: -> @value.clusters = ( o for o in @value.clusters when @pin_id != id_cluster o )

  computed:
    pin_icon:    -> @value.icons   .find (o)=> @pin_id == o.v
    pin_line:    -> @value.lines   .find (o)=> @pin_id == id_line o
    pin_cluster: -> @value.clusters.find (o)=> @pin_id == id_cluster o

    meta: ->
      words = 0
      chars = 0
      for key, list of @value
        for { label } in list when label
          words += 1 if label.length
          chars += label.length
      size = [
        @value.icons.length
        words
        chars
      ]
      attrs = {}
      { attrs, size }

    line_styles: ->
      a = []
      for c, j in " .-="
        cc = " ╍─━"[j]
        for l, i in " <ox"
          ll = " ◀●✖"[i]
          for r, k in " >ox"
            rr = " ▶●✖"[k]
            a.push ["#{l}#{c}#{r}", "#{ll}#{cc}#{rr}"]
      a

    tags: ->
      Query.tags.reduce.list

    calcs: ->
      o = {}
      for { v, label } in @value.icons
        o[v] = { class: 'box', label }

      for { vs, label } in @value.clusters
        o[vs] = { class: "cluster", label }

      for oo in @value.lines
        vw = id_line oo
        { label } = oo
        o[vw] = { class: "hide", label }

      o

</script>
