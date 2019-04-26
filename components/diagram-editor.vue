<template lang="pug">
.ql-bubble
  diagram-view(v-model="value" :pin_id.sync="pin_id" ref="view")
  hr.footnote
  div.form
    button(@click="submit" :class="{ ban, warn }")
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
    .fine
      p(v-for="pin in pin_icons")
        a.btn(@click="del_icon(pin)") DEL
        i.mdi.mdi-account
        select(v-model="pin.roll" key="roll")
          option(:value="  0") ↑
          option(:value=" 90") →
          option(:value="180") ↓
          option(:value="270") ←
        input(v-model.trim="pin.label" key="label")
        a.btn(v-if="can_line(pin.v)" @click="add_line(pin.v)")
          i.mdi.mdi-transit-connection-variant
        a.btn(v-if="can_cluster(pin.v)" @click="add_cluster(pin.v)")
          i.mdi.mdi-account-group


      p(v-for="pin in pin_lines")
        a.btn(@click="del_line(pin)") DEL
        i.mdi.mdi-transit-connection-variant
        select.name(v-model="pin.v" key="v")
          option(v-for="(o, key) in calcs" v-if="'hide' != o.class" :value="key") {{o.label}}
        select(v-model="pin.vpos" key="vpos")
          option(:value="  0") ↑
          option(:value=" 90") →
          option(:value="180") ↓
          option(:value="270") ←
        select(v-model="pin.line" key="line")
          option(v-for="[v, txt] in line_styles" :value="v") {{ txt }}
        select(v-model="pin.wpos" key="wpos")
          option(:value="  0") ↑
          option(:value=" 90") →
          option(:value="180") ↓
          option(:value="270") ←
        select.name(v-model="pin.w" key="w")
          option(v-for="(o, key) in calcs" v-if="'hide' != o.class" :value="key") {{o.label}}
        input(v-model.trim="pin.label" key="label")
        a.btn(v-if="can_line(pin.v, pin.w)" @click="add_line(pin.v, pin.w)")
          i.mdi.mdi-transit-connection-variant
        a.btn(v-if="can_cluster(pin.v, pin.w)" @click="add_cluster(pin.v, pin.w)")
          i.mdi.mdi-account-group

      p(v-for="pin in pin_clusters")
        a.btn(@click="del_cluster(pin)") DEL
        i.mdi.mdi-account-group
        a.btn.name(
          v-for="(v, index) in pin.vs"
          v-if="calcs[v]"
          :key="`vs.${index}`"
          @click="pin.vs.splice(index, 1)"
        ) {{ calcs[v].label }}
        select.name(v-model="pin.vs[pin.vs.length]" key="vs.new")
          option(:value="undefined") (追加)
          option(v-for="(o, key) in calcs" v-if="'box' == o.class && ! pin.vs.includes(key)" :value="key") {{o.label}}
        input(v-model.trim="pin.label" key="label")

      div
        p(v-if="! pin_id")
          select(v-model="pin_face")
            option(:value="null") 描写するキャラクターを選ぼう。
            optgroup(v-for="tag in tags" :label="tag.label")
              option(v-for="o in pin_face_option(tag)" v-if="! Object.keys(calcs).includes(o.v)" :value="o") {{ o.label }}
          a.btn(v-if="can_icon(pin_face)" @click="add_icon(pin_face)") icon
</template>
<style lang="sass" scoped>
select.name
  max-width: 6em

a.name
  max-width: 3em
  overflow: hidden
  white-space: nowrap

input
  width: 8em

.ql-bubble
  z-index: 10
</style>
<script lang="coffee">
{ Query, State } = require "memory-orm"

parse_touch = (e)->
  { layerX, layerY } = e.changedTouches[0]
  { target } = e
  { layerX, layerY, target }

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
    pin_id: null
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

    add_icon: ({v, label}, roll = 0)->
      @value.icons.push { v, roll, label, x: 0, y: 0 }
      pin_face = null

    add_cluster: (...vs)->
      vs = vs.sort()
      @value.clusters.push { vs, label: "cluster" }

    add_line: (v, w = v)->
      for vpos in [0...360] by 90
        for wpos in [0...360] by 90
          if v == w
            continue if wpos <= vpos
            continue if vpos + 180 == wpos
            continue if @calcs[ id_line { v: w, w: v, vpos, wpos } ]
          continue if @calcs[ id_line { v, w, vpos, wpos } ]
          @value.lines.push { v, w, vpos, wpos, line: "o=o", label: "line" }
          return

    can_icon: (o)->
      return false unless o?.v
      ! @calcs[ o.v ]

    can_cluster: (...vs)->
      vs = vs.sort()
      ! @calcs[ id_cluster { vs } ]

    can_line: (v, w = v, vpos)->
      for vpos in [0...360] by 90
        for wpos in [0...360] by 90
          if v == w
            continue if wpos <= vpos
            continue if vpos + 180 == wpos
            continue if @calcs[ id_line { v: w, w: v, vpos, wpos } ]
          continue if @calcs[ id_line { v, w, vpos, wpos } ]
          return true
      return false

    del: (tgt, pin)->
      @value[tgt] =
        for o in @value[tgt] when pin != o
          o
      @$emit 'input', @value
    del_icon:    (pin)-> @del 'icons',    pin
    del_cluster: (pin)-> @del 'clusters', pin
    del_line:    (pin)-> @del 'lines',    pin

  computed:
    pin_icons:    -> @value.icons   .filter (o)=> o.v?.includes( @pin_id )| @pin_id?.includes o.v
    pin_lines:    -> @value.lines   .filter (o)=> id_line(o)?.includes( @pin_id ) || @pin_id?.includes [o.v,o.w].join()
    pin_clusters: -> @value.clusters.filter (o)=> id_cluster(o)?.includes( @pin_id ) || @pin_id?.includes id_cluster(o)

    move: ->
      left = top = 0 + "px"
      width = "100%"
      { left, top, width }
      unless @$refs.view
        return { left, width, top }

      { move, moved } = @$refs.view
      left = ( moved.x || move.x ) + "px"
      top  = ( moved.y || move.y ) + "px"
      width = "100%"
      { left, top, width }
        

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
