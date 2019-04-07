<template lang="pug">
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
      path.path(v-for="(o, key) in paths" fill="none" v-if="o" v-bind="o")
      rect(v-for="(o, key) in labels"  v-if="o" v-bind="o" :ref="o.key")
      text(v-for="(o, key) in texts" v-if="o" v-bind="o" :ref="o.key")
        | {{ o.label }}
    g(v-if="move.id")
      rect.move(v-bind="moved")
</template>

<script lang="coffee">
# inspired by https://github.com/wakufactory/MarkDownDiagram

marker: (key)->
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
    for key, { x } of @data.rects
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
    log:  String
    show: String
    head: String
    deco: String

    phase_id: String

    data: Object
    edit: Object

  data: ->
    zoom: 1.0
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
    move_xy: ->
      { x, y, dx, dy } = @move
      x = parseInt Math.max 0, x + dx
      y = parseInt Math.max 0, y + dy
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
            @do_roll @move.id
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
      return unless @edit
      Object.assign @moved, @move_xy()

    do_move: (id)->
      return unless @edit
      o = @data.icons.find (icon)-> icon.v == id
      Object.assign o, @move_xy()
      @$emit 'input', id, o
    
    do_roll: (id)->
      return unless @edit
      o = @data.icons.find (icon)-> icon.v == id
      o.roll = o.roll + 90 % 360
      @$emit 'input', id, o

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
        x = y = label_height
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

  computed:
    view_box: ->
      "#{@root.x} #{@root.y} #{@root.width} #{@root.height}"

    root: ->
      @cover Object.values @rects

    images: ->
      o = {}
      for { v, label, roll, x, y } in @data.icons
        { border_width, icon, rx, ry } = @style
        { width, height } = icon
        [ extrax, extray, ... ] = @by_roll roll

        href = v
        x += border_width
        y += border_width
        extrax *= height - width
        extray *= height - width
        transform = "rotate(#{roll}, #{x + extrax + 0.5 * width}, #{y + extray + 0.5 * height})"
        o[v] = { class: "icon", key: "image=#{v}", href, transform, width, height, rx, ry, x, y }
      o

    rects: ->
      o = {}
      for { v, label, roll, x, y } in @data.icons
        { border_width, label_height, icon, rx, ry } = @style
        { width, height } = icon
        is_horizontal = @by_roll(roll)[3]

        if is_horizontal
          [width, height] = [height, width]

        width  += 2 * border_width
        height += 2 * border_width + label_height
        o[v] = { class: 'box', key: "rect=#{v}", width, height, x, y, rx, ry }

      for { vs, label } in @data.clusters
        { rx, ry } = @style
        { x, y, width, height } = @cover vs.map (v)=> o[v]
        o[label] = { class: "cluster", key: "rect=#{label}", fill: 'none', width, height, x, y, rx, ry }
      o

    calcs: ->
      o = {}
      for { v, w, line, start, end, headpos, tailpos, label } in @data.lines
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
      for { v, w, line, start, end, headpos, tailpos, label } in @data.lines
        vw  = [v,w].join("+")
        { vp, cvp, cwp, wp, cp } = @calcs[vw]
        d  = "M#{ vp.x },#{ vp.y }C#{ cvp.x },#{ cvp.y },#{ cwp.x },#{ cwp.y },#{ wp.x },#{ wp.y }"

        o[vw] = { class: line, key: "path=#{vw}", "marker-start": start, "marker-end": end, d }
      o

    texts: ->
      o = {}
      for { vs, label } in @data.clusters
        { label_height, icon, rx, ry } = @style
        { width, height } = icon
        { x, y, width } = @calcs[label]
        # x, y は右上
        x += 1.0 * width
        y += 0.5 * label_height 
        o[label] = { class: "pen", key: "label-#{label}", "text-anchor": "end", label, x, y }

      for { v, label, roll, x, y } in @data.icons
        { border_width, rx, ry } = @style
        # x, y はボトム
        x += 0.5 * width
        y += 1.0 * height - 2 * border_width
        o[v] = { class: "pen", key: "label-#{v}", "text-anchor": "middle", label, x, y }

      for { v, w, line, start, end, headpos, tailpos, label } in @data.lines
        vw  = [v,w].join("+")
        { x, y }= @calcs[vw].cp
        o[vw] = { class: "pen", key: "label-#{vw}", "text-anchor": "middle", label, x, y }
      o

    labels: ->
      root_width = @root.width
      @$nextTick =>
        return unless width = @$refs.root?.getClientRects?()?[0]?.width
        @zoom = root_width / width
        for key of @texts
          tk =      'label-' + key
          lk = 'rect-label-' + key
          continue unless box = @$refs[tk]?[0]?.getBBox?()

          { width, height, x, y } = box
          { border_width } = @style
          width  += 4 * border_width
          height += 2 * border_width
          x -= 2 * border_width
          y -= 1 * border_width
          @style.label_height = height
          for key, val of { x, y, width, height }
            @$refs[lk][0].setAttribute key, val

      o = {}
      for { vs, label } in @data.clusters
        { rx, ry } = @style
        o[label] = { class: "pen", key: "rect-label-#{label}", rx , ry }

      for { v, label, roll, x, y } in @data.icons
        { rx, ry } = @style
        o[v] = { class: "pen", key: "rect-label-#{v}", rx , ry }

      for { v, w, line, start, end, headpos, tailpos, label } in @data.lines
        { rx, ry } = @style
        vw  = [v,w].join("+")
        o[vw] = { class: "pen", key: "rect-label-#{vw}", rx , ry }
      o


</script>
