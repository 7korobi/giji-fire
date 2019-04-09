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
        path.path(v-for="(o, key) in paths" fill="none" v-if="o" v-bind="o" @click="pin_id = key")
        rect(v-for="(o, key) in labels"  v-if="o" v-bind="o" :ref="o.key" @click="pin_id = key")
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
      a.btn(@click="del_icon") DEL
      input(v-model="pin_icon.v" key="v" style="width: 3em")
      select(v-model="pin_icon.roll" key="roll")
        option(:value="  0") ↑
        option(:value=" 90") →
        option(:value="180") ↓
        option(:value="270") ←
      input(v-model="pin_icon.label" key="label")
    div(v-else)
      a.btn(@click="add_icon") ADD
    div(v-if="pin_line")
      a.btn(@click="del_line") DEL
      input(v-model="pin_line.v" key="v" style="width: 3em")
      select(v-model="pin_line.start" key="start")
        option(value="o") ●
        option(value="<") ◀︎
        option(value="x") ❌
        option(value="")
      select(v-model="pin_line.vpos" key="vpos")
        option(:value="  0") ↑
        option(:value=" 90") →
        option(:value="180") ↓
        option(:value="270") ←
      select(v-model="pin_line.line" key="line")
        option(value="wide"  ) ━
        option(value="solid" ) ─
        option(value="dotted") …
        option(value="hide"  )
      select(v-model="pin_line.wpos" key="wpos")
        option(:value="  0") ↑
        option(:value=" 90") →
        option(:value="180") ↓
        option(:value="270") ←
      select(v-model="pin_line.end" key="end")
        option(value="o") ●
        option(value=">") ▶︎
        option(value="x") ❌
        option(value="")
      input(v-model="pin_line.w" key="w" style="width: 3em")
      input(v-model="pin_line.label" key="label")
    div(v-else)
      a.btn(@click="add_line") ADD
    div(v-if="pin_cluster")
      a.btn(@click="del_cluster") DEL
      input(
        v-for="(v, index) in pin_cluster.vs"
        v-model="pin_cluster.vs[index]"
        :key="`vs.${index}`"
        style="width: 3em"
      )
      input(v-model="pin_cluster.vs[pin_cluster.vs.length]" key="label" style="width: 3em")
      input(v-model="pin_cluster.label" key="label")
    div(v-else)
      a.btn(@click="add_cluster") ADD
</template>

<script lang="coffee">
# inspired by https://github.com/wakufactory/MarkDownDiagram

_ = require 'lodash'

{ Query, State } = require "memory-orm"
{ url } = require "~/config/live.yml"

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

auto_xy: (x, y)->
  return [parseInt(x), parseInt(y)] if x? && y?

  { icon_width, gap_size } = @style
  xs =
    for key, { x } of @value.rects
      x
  xs.push -( icon_width + gap_size )
  x  = Math.max ...xs
  x += icon_width + gap_size
  y  = gap_size
  [x, y]


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
      line_slide:   15
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

    add_icon: ->
    add_line: ->
    add_cluster: ->
    
    del_icon: ->
    del_line: ->
    del_cluster: ->

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

    pos: ({ x, y, width, height }, roll)->
      { gap_size } = @style
      curve = 2 * gap_size
      switch roll
        when 0
          x += 0.5 * width 
          # y origin
          vx =  0
          vy = -curve
        when 90
          x += 1.0 * width
          y += 0.5 * height
          vx =  curve
          vy =  0
        when 180
          x += 0.5 * width
          y += 1.0 * height
          vx =  0
          vy =  curve
        when 270
          # x origin
          y += 0.5 * height
          vx = -curve
          vy =  0
      c =
        x: x + vx
        y: y + vy

      { x, y, vx, vy, c }

    by_roll: (roll)->
      switch roll
        when 0
          is_v = true
          x =  0
          y =  0
        when 180
          is_v = true
          x =  0
          y =  0
        when 270
          is_h = true
          x =  0
          y = -0.5
        when 90
          is_h = true
          x =  0.5
          y =  0
      [ x, y, is_h, is_v ]

    cover: (vos)->
      { label_height, icon } = @style
      vos = vos.filter (o)-> o
      unless vos.length
        x = y = @label_height
        vos.push { ...icon, x, y }

      xmin = Math.min ...vos.map (o)-> o.x
      xmax = Math.max ...vos.map (o)-> o.x + o.width
      ymin = Math.min ...vos.map (o)-> o.y
      ymax = Math.max ...vos.map (o)-> o.y + o.height
      width  = xmax - xmin + label_height
      height = ymax - ymin + label_height
      x = xmin - 0.5 * label_height
      y = ymin - 0.5 * label_height

      { x, y, width, height }

    label_height_update: _.debounce (height, key)->
      @style.label_height = parseInt height
    , 500,
      leading:  false
      trailing: true

    label_draw: (key)->
      return unless tgt = @$refs['rect-label-' + key]?[0]
      return unless box = @$refs[     'label-' + key]?[0]?.getBBox?()
      { width, height, x, y } = box
      return unless height
      return unless width

      { border_width } = @style
      width  += 4 * border_width
      height += 2 * border_width
      x -= 2 * border_width
      y -= 1 * border_width
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

    pin_idx: ->
      for o, idx in @value.icons when o.v == @pin_id
        return ['icons', idx]
      for o, idx in @value.lines when "#{o.v}+#{o.w}" == @pin_id
        return ['lines', idx]
      for o, idx in @value.clusters when o.label == @pin_id
        return ['clusters', idx]

    pin_icon:    -> @value.icons.find (o)=> o.v == @pin_id
    pin_line:    -> @value.lines.find (o)=> "#{o.v}+#{o.w}" == @pin_id
    pin_cluster: -> @value.clusters.find (o)=> o.label == @pin_id

    zoom: ->
      return 1.0 unless width = @$refs.root?.getClientRects?()?[0]?.width
      @root.width / width

    view_box: ->
      "#{@root.x} #{@root.y} #{@root.width} #{@root.height}"

    root: ->
      boxs = Object.values @rects
      @cover boxs

    images: ->
      o = {}
      { border_width, icon, rx, ry } = @style
      for { v, label, roll, x, y } in @value.icons
        { width, height } = icon
        [ extrax, extray, ... ] = @by_roll roll

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

    rects: ->
      o = {}
      { border_width, label_height, icon, rx, ry } = @style
      for { v, label, roll, x, y } in @value.icons
        { width, height } = icon
        is_horizontal = @by_roll(roll)[2]

        if is_horizontal
          [width, height] = [height, width]

        if label
          height += label_height
        width  += 2 * border_width
        height += 2 * border_width
        o[v] = { class: 'box', key: "rect=#{v}", width, height, x, y, rx, ry }

      for { vs, label } in @value.clusters
        { x, y, width, height } = @cover vs.map (v)=> o[v]
        o[label] = { class: "cluster", key: "rect=#{label}", fill: 'none', width, height, x, y, rx, ry }
      o

    calcs: ->
      { line_slide, gap_size, icon, rx, ry } = @style
      slide = (a, b)->
        if a.vy && a.x < b.x + line_slide * 5
          a.x   += line_slide
          a.c.x += line_slide * 3
        if a.vy && b.x < a.x + line_slide * 5
          a.x   -= line_slide
          a.c.x -= line_slide * 3
        if a.vx && a.y < b.y + line_slide * 5
          a.y   += line_slide
          a.c.y += line_slide * 3
        if a.vx && b.y < a.y + line_slide * 5
          a.y   -= line_slide
          a.c.y -= line_slide * 3
      o = {}
      for { v, w, line, start, end, vpos, wpos, label } in @value.lines
        vw  = "#{v}+#{w}"
        vo = @rects[v]
        wo = @rects[w]
        unless vo
          vo = wo
        unless wo
          wo = vo
        vp = @pos vo, vpos
        wp = @pos wo, wpos

        slide vp, wp.c
        slide wp, vp.c

        dx = vp.x - wp.x
        dy = vp.y - wp.y
        if dx * dx + dy * dy < 16 * gap_size * gap_size
          cvp = vp
          cwp = wp
        else
          cvp = vp.c
          cwp = wp.c

        cp =
          x: parseInt 0.5 * (cvp.x + cwp.x)
          y: parseInt 0.5 * (cvp.y + cwp.y)

        o[vw] = { vp, cvp, cwp, wp, cp }
      o

    paths: ->
      o = {}
      for { v, w, line, start, end, vpos, wpos, label } in @value.lines
        vw  = "#{v}+#{w}"
        start = marker start
        end   = marker end
        { vp, cvp, cwp, wp, cp } = @calcs[vw]
        d  = "M#{ vp.x },#{ vp.y }Q#{ cvp.x },#{ cvp.y },#{ cp.x },#{ cp.y }Q#{cwp.x},#{cwp.y},#{ wp.x },#{ wp.y }"
        o[vw] = { class: line, key: "path=#{vw}", "marker-start": start, "marker-end": end, d }
      o

    texts: ->
      o = {}
      { label_height, border_width, icon, rx, ry } = @style
      for { vs, label } in @value.clusters
        { width, height } = icon
        { x, y, width } = @rects[label]
        # x, y は右上
        x += 1.0 * width
        y += 0.3 * label_height
        o[label] = { class: "pen", key: "label-#{label}", "text-anchor": "end", label, x, y }

      for { v, label, roll, x, y } in @value.icons when label
        { width, height, x, y } = @rects[v]

        # x, y はボトム
        x += 0.5 * width
        y += 1.0 * height - 3 * border_width
        o[v] = { class: "pen", key: "label-#{v}", "text-anchor": "middle", label, x, y }

      for { v, w, line, start, end, vpos, wpos, label } in @value.lines when label
        vw  = "#{v}+#{w}"
        { x, y }= @calcs[vw].cp
        y += 0.3 * label_height
        o[vw] = { class: "pen", key: "label-#{vw}", "text-anchor": "middle", label, x, y }
      o

    labels: ->
      o = {}
      { label_height, rx, ry } = @style
      @$nextTick ->
        for key, val of o
          @label_draw key

      for { vs, label } in @value.clusters
        o[label] = { class: "pen", key: "rect-label-#{label}", rx , ry }

      for { v, label, roll, x, y } in @value.icons when label
        o[v] = { class: "pen", key: "rect-label-#{v}", rx , ry }

      for { v, w, line, start, end, vpos, wpos, label } in @value.lines when label
        vw  = "#{v}+#{w}"
        o[vw] = { class: "pen", key: "rect-label-#{vw}", rx , ry }
      o


</script>
