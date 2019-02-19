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
      rect( v-for="(o, key) in graph.rects"  v-if="o" v-bind="o" v-on="draggable(key, o)")
      image(v-for="(o, key) in graph.images" v-if="o" v-bind="o" v-on="draggable(key, o)")
    g.edgePath
      path.path(v-for="(o, key) in graph.paths" fill="none" v-if="o" v-bind="o")
      rect(v-for="(o, key) in graph.labels"  v-if="o" v-bind="o" :ref="o.key")
      text(v-for="(o, key) in graph.texts" v-if="o" v-bind="o" :ref="o.key")
        | {{ o.label }}
    g(v-if="move.id")
      rect.move(v-bind="moved")
  .errors(v-if="graph.errors.length")
    .error(v-for="err in graph.errors") {{ err }}
</template>

<script lang="coffee">
# inspired by https://github.com/wakufactory/MarkDownDiagram

SVG = require "./marksvg-parse"

marker = (key)->
  switch key
    when '<', '('
      'url(#svg-marker-arrow-start)'
    when '>', ')'
      'url(#svg-marker-arrow-end)'
    when 'O', 'o'
      'url(#svg-marker-circle)'
    when 'X', 'x'
      'url(#svg-marker-cross)'
    else
      null

class SvgRenderer
  plain: ->
    @data =
      nodes:  {}
      paths:  {}
      rects:  {}
      texts:  {}
      labels: {}
      images: {}
      errors: []

  pos: ({ x, y, width, height }, mark)->
    { gap_size } = @options.style
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

  newline: ->
  error: (line)->
    @data.errors.push line

  href: (key)-> key
  dic: (v)-> ['icon', v, v]

  node: (name, v)->
    @data.nodes[name] = @data.rects[v]

  is_cluster: (v)->
    @data.rects[v]?.class == 'cluster'

  label: (v, label, pos, x, y)->
    return unless label

    { radius } = @options.style

    # text
    key = "label-#{v}"
    label ?= "   "
    className = "pen"
    @data.texts[v] = { class: className, "text-anchor": pos, key, label, x, y }

    # label
    # x, y, width, height は後で。
    { radius } = @options.style
    key = "rect-label-#{v}"
    rx  = radius
    ry  = radius
    @data.labels[v] = { class: className, key, rx, ry } 

  edge: (v, w, line, start, end, headpos, tailpos, label)->
    weight = line.length
    start = marker start
    end   = marker end
    className =
      switch line[0]
        when '='
          'wide'
        when '-'
          'solid'
        when '.'
          'dotted'
        else
          'hide'

    vw  = [v,w].join("+")
    key = "path=#{vw}"

    vo = @data.rects[v]
    wo = @data.rects[w]
    vp = @pos vo, headpos
    wp = @pos wo, tailpos

    cvpx = vp.x + vp.vx
    cvpy = vp.y + vp.vy
    cwpx = wp.x + wp.vx
    cwpy = wp.y + wp.vy
    lx = parseInt 0.5 * (cvpx + cwpx)
    ly = parseInt 0.5 * (cvpy + cwpy)
    d  = "M#{ vp.x },#{ vp.y }C#{ cvpx },#{ cvpy },#{ cwpx },#{ cwpy },#{ wp.x },#{ wp.y }"

    # path
    @data.paths[vw] = { class: className, key, d, "marker-start": start, "marker-end": end }

    # x, y は中点
    @label vw, label, 'middle', lx, ly

  auto_xy: (x, y)->
    return [parseInt(x), parseInt(y)] if x? && y?

    { icon_width, gap_size } = @options.style
    xs =
      for key, { x } of @data.rects
        x
    xs.push -( icon_width + gap_size )
    x  = Math.max ...xs
    x += icon_width + gap_size
    y  = gap_size
    [x, y]

  box: (v, label, side = ' ', x, y)->
    { border_width, icon_width, radius } = @options.style

    [x, y] = @auto_xy x, y
    width  = icon_width + 2 * border_width
    height = icon_width + 2 * border_width
    rx     = radius
    ry     = radius

    className = 'box'
    key = "#{side}rect=#{v}"

    # rect
    @data.rects[v] = { class: className, key, width, height, x, y, rx, ry }

    # x, y はボトム
    x += 0.5 * width
    y += 1.0 * height - 2 * border_width
    @label v, label, 'middle', x, y

  icon: (v, label, side = ' ', x, y)->
    { border_width, label_height, icon_width, icon_height, radius } = @options.style
    switch side
      when '^','u', ' '
        roll = 0
        is_vertical = true
        extrax =  0
        extray =  0
      when 'v','d'
        roll = 180
        is_vertical = true
        extrax =  0
        extray =  0
      when '<','l'
        roll = 270
        is_horizontal = true
        extrax =  0
        extray = -0.5
      when '>','r'
        roll = 90
        is_horizontal = true
        extrax =  0.5
        extray =  0

    [x, y] = @auto_xy x, y
    width  = icon_width
    height = icon_height
    rx     = radius
    ry     = radius

    extrax *= height - width
    extray *= height - width
    transform =
      if roll
        "rotate(#{roll}, #{x + border_width + extrax + 0.5 * width}, #{y + border_width + extray + 0.5 * height})"
      else
        undefined

    href = @href v
    className = 'icon'
    key = "image=#{v}"

    # image
    @data.images[v] = { class: className, key, href, transform, width, height, rx, ry, x: x + border_width , y: y + border_width }

    if is_horizontal
      [width, height] = [height, width]

    width  = width  + 2 * border_width
    height = height + 2 * border_width + label_height

    className = 'box'
    key = "#{side}rect=#{v}"

    # rect
    @data.rects[v] = { class: className, key, width, height, x, y, rx, ry }

    # x, y はボトム
    x += 0.5 * width
    y += 1.0 * height - 2 * border_width
    @label v, label, 'middle', x, y

  cluster: (vs, label)->
    { label_height, radius } = @options.style

    vos = vs.map (v)=> @data.rects[v]
    className = 'cluster'
    fill = 'none'
    key = "rect=#{label}"

    { x, y, width, height } = @cover vos
    rx = radius
    ry = radius

    # rect
    @data.rects[label] = { class: className, key, fill, width, height, x, y, rx, ry }

    # x, y は右上
    x += 1.0 * width
    y += 0.5 * label_height 
    @label label, label, 'end', x, y

  cover: (vos)->
    { label_height, icon_width } = @options.style
    unless vos.length
      vos.push
        x: label_height
        y: label_height
        width:  icon_width
        height: icon_width

    xmin = Math.min ...vos.map (o)-> o.x
    xmax = Math.max ...vos.map (o)-> o.x + o.width
    ymin = Math.min ...vos.map (o)-> o.y
    ymax = Math.max ...vos.map (o)-> o.y + o.height
    width  = xmax - xmin + label_height
    height = ymax - ymin + label_height
    x = xmin - 0.5 * label_height
    y = ymin - 0.5 * label_height

    { x, y, width, height }

options =
  renderer: new SvgRenderer
  style:
    gap_size:     50
    icon_width:   90
    icon_height: 130
    label_height: 28
    border_width:  5
    radius:        3
options.renderer.options = options


parse_touch = (e)->
  { pageX, pageY } = e.changedTouches[0]
  { target } = e
  { pageX, pageY, target }

vm =
  name: 'MarkSVG'
  options: options

  props:
    edit:
      type: Boolean
      default: false

    value:
      type: String
      default: ""

    context: Object

  data: ->
    move =
      id: null
      x:  0
      y:  0
      px: 0
      py: 0
    moved =
      x:  0
      y:  0
      rx: 0
      ry: 0
      width:  0
      height: 0
    zoom = 1.0
    gdata = options.renderer.plain()
    tokens = []

    { zoom, move, moved, gdata, tokens }

  methods:
    do_graph: ->
      @gdata = options.renderer.plain()
      @tokens = SVG.parse options.renderer, @value
      @$nextTick =>
        return unless width = @$refs.root?.getClientRects?()?[0]?.width
        @zoom = @root.width / width
        for key of @gdata.texts
          tk =      'label-' + key
          lk = 'rect-label-' + key
          continue unless box = @$refs[tk]?[0]?.getBBox?()

          { width, height, x, y } = box
          { border_width } = options.style
          width  += 4 * border_width
          height += 2 * border_width
          x -= 2 * border_width
          y -= 1 * border_width
          options.style.label_height = height
          for key, val of { x, y, width, height }
            @$refs[lk][0].setAttribute key, val

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
        { x, y, rx, ry, width, height } = @gdata.rects[id]
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
      Object.assign @gdata.rects[id], @move_xy()
      @$emit 'input', SVG.stringify @tokens, @gdata
      @do_graph()
    
    do_roll: (id)->
      return unless @edit
      { key } = @gdata.rects[id]
      sides = ' >v<^>'
      side = key[0]
      idx = 1 + sides.indexOf side
      key = sides[idx] + key[1..]
      @gdata.rects[id].key = key
      @$emit 'input', SVG.stringify @tokens, @gdata
      @do_graph()

    nop: -> false

  computed:
    root: ->
      options.renderer.cover Object.values(@graph.rects)

    view_box: ->
      "#{@root.x} #{@root.y} #{@root.width} #{@root.height}"

    graph: ->
      @do_graph()
      @gdata

module.exports = vm
</script>
