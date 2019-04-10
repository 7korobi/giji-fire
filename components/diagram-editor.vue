<template lang="pug">
div
  article
    svg(:style="`max-width: 100%; width: ${root.width}px;`" :viewBox="view_box" :ref="'root'" v-on="movespace()")
      marker.edgePath#svg-marker-circle(viewBox="0 0 10 10" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="5" refY="5" orient="auto")
        circle(cx="5" cy="5" r="4")
      marker.edgePath#svg-marker-arrow-start(viewBox="0 0 10 10" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="3" refY="5" orient="auto")
        path.fill(d="M10,0 L0,5 L10,10 z")
      marker.edgePath#svg-marker-arrow-end(viewBox="0 0 10 10" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="7" refY="5" orient="auto")
        path.fill(d="M0,0 L10,5 L0,10 z")
      marker.edgePath#svg-marker-cross(viewBox="0 0 10 10" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="5" refY="5" orient="0")
        path.path(d="M0,0 L10,10 M0,10 L10,0 z")
      g
        rect( v-for="(o, key) in rects"  v-if="o" v-bind="o" v-on="draggable(key, o)")
        image(v-for="(o, key) in images" v-if="o" v-bind="o" v-on="draggable(key, o)")
      g.edgePath
        path.path(v-for="(o, key) in paths" fill="none" v-if="o" v-bind="o")
        rect(v-for="(o, key) in labels" v-if="o" v-bind="o" :ref="o.key")
        text(v-for="(o, key) in texts" v-if="o" v-bind="o" :ref="o.key" @click="pin_id = key")
          | {{ o.label }}
      g(v-if="move.id")
        rect.move(v-bind="moved")
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
    div(v-if="pin_icon")
      a.btn(@click="del_icon(pin_icon)") DEL
      input(v-model="pin_icon.v" key="v" style="width: 3em")
      select(v-model="pin_icon.roll" key="roll")
        option(:value="  0") ↑
        option(:value=" 90") →
        option(:value="180") ↓
        option(:value="270") ←
      input(v-model="pin_icon.label" key="label")
    div(v-if="pin_line")
      a.btn(@click="del_line(pin_line)") DEL
      select(v-model="pin_line.v" key="v")
        option(v-for="(o, key) in calcs" v-if="'hide' != o.class" :value="key") {{key}}
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
        option(v-for="(o, key) in calcs" v-if="'hide' != o.class" :value="key") {{key}}
      input(v-model="pin_line.label" key="label")
    div(v-if="pin_cluster && pin_cluster.vs")
      a.btn(@click="del_cluster(pin_cluster)") DEL
      | &emsp;
      a.btn(
        v-for="(v, index) in pin_cluster.vs"
        :key="`vs.${index}`"
        @click="pin_cluster.vs.splice(index, 1)"
      ) {{ v }}
      select(v-model="pin_cluster.vs[pin_cluster.vs.length]" key="vs.new")
        option(:value="undefined") (追加)
        option(v-for="(o, key) in calcs" v-if="'box' == o.class" :value="key") {{key}}
      input(v-model="pin_cluster.label" key="label")
    fieldset
      legend 追加
      a.btn(v-if="pin_icon || pin_cluster" @click="add_line(pin_id)") line
      a.btn(v-if="pin_icon" @click="add_cluster(pin_id)") cluster
      a.btn(v-if="! pin_id" @click="add_icon()") icon
</template>

<script lang="coffee">
# inspired by https://github.com/wakufactory/MarkDownDiagram

_ = require 'lodash'

{ Query, State } = require "memory-orm"
{ url } = require "~/config/live.yml"

line_id = ({ v, w, vpos, wpos })->
  "#{v}=#{vpos}+#{w}=#{wpos}"

parse_touch = (e)->
  { pageX, pageY } = e.changedTouches[0]
  { target } = e
  { pageX, pageY, target }

module.exports =
  props:
    value: Object

    is_ban:
      type: Boolean
      default: false

    is_warn:
      type: Boolean
      default: false

    maxSize:
      type: Number
      default: 100
    maxWord:
      type: Number
      default: 10
    maxRow:
      type: Number
      default: 1
    minRow:
      type: Number
      default: 1

    disabled:
      type: Boolean
      default: false

  data: ->
    step: State.step
    pin_id: ''
    move:
      id: null
      x:  0
      y:  0
      px: 0
      py: 0
    moved:
      x:  0
      y:  0
      rx: 0
      ry: 0
      width:  0
      height: 0
    style:
      icon:
        width:      90
        height:    130
      gap_size:     50
      label_height: 28
      line_slide:   25
      border_width:  5
      rx:            3
      ry:            3

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
    submit: _.debounce ->
      return if @ban

      @$emit 'submit', @value
    , 3000,
      leading:  true
      trailing: false

    add_icon: ()->
    add_line: (v, w = v)-> @value.lines.push { v, w, line: "o=o", vpos: 0, wpos: 90, label: "line" }
    add_cluster: (...vs)-> @value.clusters.push { vs, label: "cluster" }

    del_icon:    -> @value.icons    = ( o for o in @value.icons    when @pin_id != o.v )
    del_line:    -> @value.lines    = ( o for o in @value.lines    when @pin_id != line_id o )
    del_cluster: -> @value.clusters = ( o for o in @value.clusters when @pin_id != o.vs.join(',') )

    input: (value, $event)->
      $event = $event?.target?.value ? $event
      console.log value, $event
      _.set @value, value.join("."), $event

    do_move: (id)->
      for o, idx in @value.icons when o.v == id
        Object.assign o, @move_xy()
        @$emit "input", "icons.#{idx}.x", o.x
        @$emit "input", "icons.#{idx}.y", o.y
        return

    move_xy: ->
      { x, y, dx, dy } = @move
      x = parseInt x + dx
      y = parseInt y + dy
      { x, y }

    movespace: ->
      move = ({ pageX, pageY, target })=>
        if @move.id
          { px, py } = @move
          dx = (pageX - px)
          dy = (pageY - py)
          @move.dx = @zoom * dx
          @move.dy = @zoom * dy
          @recalc()
      finish = ({ pageX, pageY, target })=>
        if @move.id
          { px, py } = @move
          dx = (pageX - px)
          dy = (pageY - py)
          if dx == dy == 0
            @pin_id = @move.id
          else
            @move.dx = @zoom * dx
            @move.dy = @zoom * dy
            @do_move @move.id
          @move.id = null

      up = (o)=>
        unless @move.id
          @pin_id = null
        finish(o)

      cb =
        touchend: (e)=>
          up parse_touch e
        touchleave: (e)=>
          finish parse_touch e
        touchmove: (e)=>
          move parse_touch e
        mouseup: up
        mouseleave: finish
        mousemove: move

    draggable: (id)->
      start = ({ pageX, pageY, target })=>
        { x, y, rx, ry, width, height } = @rects[id]
        @moved = { x, y, rx, ry, width, height }
        @move = { id, x, y, px: pageX, py: pageY }

      cb =
        touchstart: (e)=>
          e.preventDefault()
          start parse_touch e
        mousedown: (e)=>
          e.preventDefault()
          start e
    
    recalc: ->
      Object.assign @moved, @move_xy()

    cover: (vos)->
      { label_height, icon } = @style
      vos = vos.filter (o)-> o
      unless vos.length
        x = y = @label_height
        vos.push { ...icon, x, y }

      xmin = Math.min ...vos.map (o)-> o.x
      xmax = Math.max ...vos.map (o)-> o.x + ( o.width  || 0 )
      ymin = Math.min ...vos.map (o)-> o.y
      ymax = Math.max ...vos.map (o)-> o.y + ( o.height || 0 )
      width  = xmax - xmin + label_height
      height = ymax - ymin + label_height
      x = xmin - 0.5 * label_height
      y = ymin - 0.5 * label_height

      { x, y, width, height }

    label_height_update: (height)->
      d = height - @style.label_height
      if 4 < d * d
        @style.label_height = parseInt height
        console.log height, d * d

    label_draw: (key)->
      return unless tgt = @$refs['rect-label-' + key]?[0]
      return unless box = @$refs[     'label-' + key]?[0]?.getBBox?()
      { width, height, x, y } = box
      return unless height
      return unless width

      { border_width } = @style
      width  = parseInt width  + 4 * border_width
      height = parseInt height + 2 * border_width
      x = parseInt x - 2 * border_width
      y = parseInt y - 1 * border_width
      @label_height_update height, key
      for key, val of { x, y, width, height }
        tgt.setAttribute key, val

  computed:
    lines: ->
      @value.icons.length
    words: ->
      length = 0
      for key, list of @value
        for { label } in list
          length += 1 if label.length
      length
    chars: ->
      length = 0
      for key, list of @value
        for { label } in list
          length += label.length
      length

    ban: ->
      ban = false
      ban ||= !( @value == @html )
      ban ||= !(       2 <= @chars <= @maxSize )
      ban ||= !(       1 <= @words <= @maxWord )
      ban ||= !( @minRow <= @lines <= @maxRow )
      ban ||= @is_ban
      ban

    warn: ->
      warn = false
      warn ||= @is_warn
      warn

    mark: ->
      m = "mdi-check-circle-outline"
      m = "mdi-alert-circle-outline" if @warn
      m = "mdi-cancel"               if @ban
      [m]

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

    pin_icon:    -> @value.icons   .find (o)=> @pin_id == o.v
    pin_line:    -> @value.lines   .find (o)=> @pin_id == line_id o
    pin_cluster: -> @value.clusters.find (o)=> @pin_id == o.vs.join(',')

    zoom: ->
      return 1.0 unless width = @$refs.root?.getClientRects?()?[0]?.width
      @root.width / width

    view_box: ->
      "#{@root.x} #{@root.y} #{@root.width} #{@root.height}"

    root: ->
      @cover Object.values @rects

    calcs: ->
      o = {}
      { border_width, label_height, gap_size, icon } = @style

      by_roll = (roll)->
        switch roll
          when  0, 180
            false
          when 90, 270
            true

      pos = ({ x, y, width, height }, roll)->
        curve = parseInt Math.min width, height, icon.height
        switch roll
          when 0
            dx = 0.5 * width 
            dy = 0
            vx =  0
            vy = -curve
          when 90
            dx = 1.0 * width
            dy = 0.5 * height
            vx =  curve
            vy =  0
          when 180
            dx = 0.5 * width
            dy = 1.0 * height
            vx =  0
            vy =  curve
          when 270
            dx = 0
            dy = 0.5 * height
            vx = -curve
            vy =  0

        x = parseInt x + dx
        y = parseInt y + dy
        c =
          x: x + vx
          y: y + vy

        { x, y, vx, vy, c }

      calc_size = (a, b, max)->
        size = parseInt 0.3 * ( b - a )
        return [  max, size ] if  max < size
        return [ -max, size ] if size < -max
        [ size, size ]

      slide = (a, b)->
        if a.vy
          [ size, curve ] = calc_size a.x, b.x, 0.5 * icon.width
          a.x   += size
          a.c.x += curve
        if a.vx
          [ size, curve ] = calc_size a.y, b.y, 0.5 * icon.height
          a.y   += size
          a.c.y += curve

      for { v, label, roll, x, y } in @value.icons
        { width, height } = icon
        is_horizontal = by_roll roll

        if is_horizontal
          [width, height] = [height, width]

        if label
          height += label_height
        width  += 2 * border_width
        height += 2 * border_width
        o[v] = { class: 'box', width, height, x, y, label }

      for { vs, label } in @value.clusters
        { x, y, width, height } = @cover vs.map (v)=> o[v]
        o[vs] = { class: "cluster", width, height, x, y, label }

      for oo in @value.lines
        vw = line_id oo
        { v, w, line, vpos, wpos, label } = oo
        vo = o[v]
        wo = o[w]
        unless vo
          vo = wo
        unless wo
          wo = vo
        vp = pos vo, vpos
        wp = pos wo, wpos

        slide vp, wp
        slide wp, vp

        cvp = vp.c
        cwp = wp.c
        x    = parseInt Math.min vp.x, cvp.x, cwp.x, wp.x
        y    = parseInt Math.min vp.y, cvp.y, cwp.y, wp.y
        xmax = parseInt Math.max vp.x, cvp.x, cwp.x, wp.x
        ymax = parseInt Math.max vp.y, cvp.y, cwp.y, wp.y
        width  = xmax - x
        height = ymax - y
        if width * width + height * height < 16 * gap_size * gap_size
          cvp = vp
          cwp = wp
        cp =
          x: parseInt 0.5 * (cvp.x + cwp.x)
          y: parseInt 0.5 * (cvp.y + cwp.y)

        o[vw] = { class: "hide", width, height, x, y, vp, cvp, cwp, wp, cp, label }

      o

    rects: ->
      o = {}
      { rx, ry } = @style
      for key, calc of @calcs
        { x, y, width, height } = calc
        o[key] = { class: calc.class, key: "rect=#{key}", width, height, x, y }
      o

    paths: ->
      o = {}

      marker = (key)->
        switch key
          when '<'
            'url(#svg-marker-arrow-start)'
          when '>'
            'url(#svg-marker-arrow-end)'
          when 'o'
            'url(#svg-marker-circle)'
          when 'x'
            'url(#svg-marker-cross)'
          else
            null

      border = (key)->
        switch key
          when '='
            'wide'
          when '-'
            'solid'
          when '.'
            'dotted'
          else
            'hide'

      line_style = ([st,c,ed])->
        class: border c
        "marker-start": marker st
        "marker-end":   marker ed

      for oo in @value.lines
        vw = line_id oo
        { v, w, line, vpos, wpos, label } = oo
        style = line_style line
        { vp, cvp, cwp, wp, cp } = @calcs[vw]
        d = "M#{ vp.x },#{ vp.y }Q#{ cvp.x },#{ cvp.y },#{ cp.x },#{ cp.y }Q#{ cwp.x },#{ cwp.y },#{ wp.x },#{ wp.y }"
        o[vw] = { ...style, key: "path=#{vw}", d }
        # d = "M#{ cvp.x },#{ cvp.y }L#{ cwp.x },#{ cwp.y }"
        # o[vw + 'sub'] = { class: 'dotted', key: "path=#{vw}sub", d }
      o

    texts: ->
      o = {}
      { label_height, border_width, icon } = @style
      for { vs, label } in @value.clusters
        { width } = icon
        { x, y, width } = @calcs[vs]
        # x, y は右上
        x = parseInt x + 1.0 * width
        y = parseInt y + 0.3 * label_height
        o[vs] = { class: "pen", key: "label-#{vs}", "text-anchor": "end", label, x, y }

      for { v, label, roll, x, y } in @value.icons when label
        { width, height, x, y } = @calcs[v]

        # x, y はボトム
        x = parseInt x + 0.5 * width
        y = parseInt y + 1.0 * height - 3 * border_width
        o[v] = { class: "pen", key: "label-#{v}", "text-anchor": "middle", label, x, y }

      for oo in @value.lines when oo.label
        vw = line_id oo
        { v, w, line, vpos, wpos, label } = oo
        { x, y }= @calcs[vw].cp
        y = parseInt y + 0.3 * label_height
        o[vw] = { class: "pen", key: "label-#{vw}", "text-anchor": "middle", label, x, y }
      o

    labels: ->
      o = {}
      { rx, ry, label_height } = @style
      @$nextTick ->
        for key, val of o
          @label_draw key

      for { vs, label } in @value.clusters when label
        o[vs] = { class: "pen", key: "rect-label-#{vs}", rx , ry }

      for { v, label, roll, x, y } in @value.icons when label
        o[v] = { class: "pen", key: "rect-label-#{v}", rx , ry }

      for oo in @value.lines when oo.label
        vw = line_id oo
        o[vw] = { class: "pen", key: "rect-label-#{vw}", rx , ry }
      o

    images: ->
      o = {}
      { border_width, icon, rx, ry } = @style

      by_roll = (roll)->
        switch roll
          when 0, 180
            [ 0, 0 ]
          when 270
            [ 0, -0.5 ]
          when 90
            [ 0.5,  0 ]

      for { v, label, roll, x, y } in @value.icons
        { width, height } = icon
        [ extrax, extray ] = by_roll roll

        face = Query.faces.find v
        if face 
          href = "#{url.assets}/images/portrate/#{ face.id }.#{face.format ? 'jpg'}"
        else
          href = "#{url.assets}/images/portrate/undef.jpg"


        x += border_width
        y += border_width
        extrax *= height - width
        extray *= height - width
        transform = "rotate(#{roll}, #{x + extrax + 0.5 * width}, #{y + extray + 0.5 * height})"
        o[v] = { class: "icon", key: "image=#{v}", href, transform, width, height, rx, ry, x, y }
      o


</script>
