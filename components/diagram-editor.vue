<template lang="pug">
div
  article
    svg(:style="`max-width: 100%; width: ${root.width}px;`" :viewBox="view_box" :ref="'root'" v-on="movespace()")
      marker.edgePath#svg-marker-circle(viewBox="0 0 10 10" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="5" refY="5" orient="auto")
        circle(cx="5" cy="5" r="4")
      marker.edgePath#svg-marker-arrow-start(viewBox="0 0 10 10" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="3" refY="5" orient="auto")
        path.fill(d="M10,0 L0,5 L10,10 z")
      marker.edgePath#svg-marker-arrow-end(viewBox="0 0 10 10" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="3" refY="5" orient="auto")
        path.fill(d="M0,0 L10,5 L0,10 z")
      marker.edgePath#svg-marker-cross(viewBox="0 0 10 10" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="5" refY="5" orient="0")
        path.path(d="M0,0 L10,10 M0,10 L10,0 z")
      g
        rect( v-for="(o, key) in rects"  v-if="o" v-bind="o" v-on="draggable(key, o)")
        image(v-for="(o, key) in images" v-if="o" v-bind="o" v-on="draggable(key, o)")
      g.edgePath
        path.path(v-for="(o, key) in paths" fill="none" v-if="o" v-bind="o" @click="do_tap(key)")
        rect(v-for="(o, key) in labels"  v-if="o" v-bind="o" :ref="o.key" @click="do_tap(key)")
        text(v-for="(o, key) in texts" v-if="o" v-bind="o" :ref="o.key" @click="do_tap(key)")
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
        sub {{maxRow}}行
    slot
    div {{ pin }}
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
      border_width:  5
      rx:            3
      ry:            3


  methods:
    submit: _.debounce ->
      return if @ban

      @$emit 'submit', @value
    , 3000,
      leading:  true
      trailing: false

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
            @do_tap  @move.id
          else
            @move.dx = @zoom * dx
            @move.dy = @zoom * dy
            @do_move @move.id
          @move.id = null

      cb =
        touchend: (e)=>
          finish parse_touch e
        touchleave: (e)=>
          finish parse_touch e
        touchmove: (e)=>
          move parse_touch e
        mouseup: finish
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

    do_move: (id)->
      o = @value.icons.find (icon)-> icon.v == id
      Object.assign o, @move_xy()
      @$emit 'input', id, o
    
    do_roll: (id)->
      o = @value.icons.find (icon)-> icon.v == id
      o.roll = ( o.roll + 90 ) % 360
      @$emit 'input', id, o

    do_tap: (@pin_id)->

    pos: ({ x, y, width, height }, mark)->
      { gap_size } = @style
      curve = 1 * gap_size
      switch mark
        when '^','u'
          x += 0.5 * width 
          # y origin
          vx =  0
          vy = -curve
        when 'v','d'
          x += 0.5 * width
          y += 1.0 * height
          vx =  0
          vy =  curve
        when '<','l'
          # x origin
          y += 0.5 * height
          vx = -curve
          vy =  0
        when '>','r'
          x += 1.0 * width
          y += 0.5 * height
          vx =  curve
          vy =  0
      { x, y, vx, vy }

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

    pin: ->
      return res if res = @value.icons.find (o)=> o.v == @pin_id
      return res if res = @value.lines.find (o)=> "#{o.v}+#{o.w}" == @pin_id
      return res if res = @value.clusters.find (o)=> o.label == @pin_id

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
      for { v, label, roll, x, y } in @value.icons
        { border_width, icon, rx, ry } = @style
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
      for { v, label, roll, x, y } in @value.icons
        { border_width, label_height, icon, rx, ry } = @style
        { width, height } = icon
        is_horizontal = @by_roll(roll)[2]

        if is_horizontal
          [width, height] = [height, width]

        width  += 2 * border_width
        height += 2 * border_width + label_height
        o[v] = { class: 'box', key: "rect=#{v}", width, height, x, y, rx, ry }

      for { vs, label } in @value.clusters
        { rx, ry } = @style
        { x, y, width, height } = @cover vs.map (v)=> o[v]
        o[label] = { class: "cluster", key: "rect=#{label}", fill: 'none', width, height, x, y, rx, ry }
      o

    calcs: ->
      o = {}
      for { v, w, line, start, end, headpos, tailpos, label } in @value.lines
        vw  = [v,w].join("+")

        vo = @rects[v]
        wo = @rects[w]
        vp = @pos vo, headpos
        wp = @pos wo, tailpos

        cvp =
          x: vp.x + vp.vx
          y: vp.y + vp.vy
        cwp =
          x: wp.x + wp.vx
          y: wp.y + wp.vy
        cp =
          x: parseInt 0.5 * (cvp.x + cwp.x)
          y: parseInt 0.5 * (cvp.y + cwp.y)

        o[vw] = { vp, cvp, cwp, wp, cp }
      o

    paths: ->
      o = {}
      for { v, w, line, start, end, headpos, tailpos, label } in @value.lines
        vw  = [v,w].join("+")
        start = marker start
        end   = marker end
        { vp, cvp, cwp, wp, cp } = @calcs[vw]
        d  = "M#{ vp.x },#{ vp.y }C#{ cvp.x },#{ cvp.y },#{ cwp.x },#{ cwp.y },#{ wp.x },#{ wp.y }"
        o[vw] = { class: line, key: "path=#{vw}", "marker-start": start, "marker-end": end, d }
      o

    texts: ->
      o = {}
      for { vs, label } in @value.clusters
        { label_height, icon, rx, ry } = @style
        { width, height } = icon
        { x, y, width } = @rects[label]
        # x, y は右上
        x += 1.0 * width
        y += 0.5 * label_height
        o[label] = { class: "pen", key: "label-#{label}", "text-anchor": "end", label, x, y }

      for { v, label, roll, x, y } in @value.icons
        { border_width } = @style
        { width, height, x, y } = @rects[v]

        # x, y はボトム
        x += 0.5 * width
        y += 1.0 * height - 3 * border_width
        o[v] = { class: "pen", key: "label-#{v}", "text-anchor": "middle", label, x, y }

      for { v, w, line, start, end, headpos, tailpos, label } in @value.lines
        vw  = [v,w].join("+")
        { x, y }= @calcs[vw].cp
        o[vw] = { class: "pen", key: "label-#{vw}", "text-anchor": "middle", label, x, y }
      o

    labels: ->
      o = {}
      { label_height } = @style
      @$nextTick ->
        for key, val of o
          @label_draw key

      for { vs, label } in @value.clusters
        { rx, ry } = @style
        o[label] = { class: "pen", key: "rect-label-#{label}", rx , ry }

      for { v, label, roll, x, y } in @value.icons
        { rx, ry } = @style
        o[v] = { class: "pen", key: "rect-label-#{v}", rx , ry }

      for { v, w, line, start, end, headpos, tailpos, label } in @value.lines
        { rx, ry } = @style
        vw  = [v,w].join("+")
        o[vw] = { class: "pen", key: "rect-label-#{vw}", rx , ry }
      o


</script>
