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

    { rx, ry } = @options.style

    # text
    key = "label-#{v}"
    label ?= "   "
    className = "pen"
    @data.texts[v] = { class: className, "text-anchor": pos, key, label, x, y }

    # label
    # x, y, width, height は後で。
    { rx, ry } = @options.style
    key = "rect-label-#{v}"
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

options =
  style:
    gap_size:     50
    icon_width:   90
    icon_height: 130
    label_height: 28
    border_width:  5
    rx:            3
    ry:            3

parse_touch = (e)->
  { pageX, pageY } = e.changedTouches[0]
  { target } = e
  { pageX, pageY, target }

module.exports =
  name: 'DiagramView'
  props: ["value", "edit"]
  data: ->
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
    zoom: 1.0
    clusters: []
    lines: []
    icons: []

  methods:
    do_graph: ->
      @$nextTick =>
        return unless width = @$refs.root?.getClientRects?()?[0]?.width
        @zoom = @root.width / width
        for key of @texts
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
      Object.assign @rects[id], @move_xy()
      @$emit 'input', id, @rects[id]
    
    do_roll: (id)->
      return unless @edit
      { key } = @rects[id]
      sides = ' >v<^>'
      side = key[0]
      idx = 1 + sides.indexOf side
      key = sides[idx] + key[1..]
      @rects[id].key = key
      @$emit 'input', id, @rects[id]

    nop: -> false

    pos: ({ x, y, width, height }, mark)->
      { gap_size } = options.style
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

  computed:
    root: ->
      @cover @rects

    view_box: ->
      "#{@root.x} #{@root.y} #{@root.width} #{@root.height}"
    
    rects: ->
      o = {}
      for { vs, label } in @clusters
        { x, y, width, height } = @cover vs
        { label_height, rx, ry } = options.style
        o[label] = { class: "cluster", key: "rect=#{label}", fill: 'none', width, height, x, y, rx, ry }

      for { v, label, roll, x, y } in @icons
        { border_width, label_height, icon_width, icon_height, rx, ry } = options.style
        is_horizontal = @by_roll(roll)[3]
        width  = icon_width
        height = icon_height
        if is_horizontal
          [width, height] = [height, width]

        width  += 2 * border_width
        height += 2 * border_width + label_height
        o[v] = { class: 'box', key: "rect=#{v}", width, height, x, y, rx, ry }
      o

    images: ->
      o = {}
      for { v, label, roll, x, y } in @icons
        { border_width, icon_width, icon_height, rx, ry } = options.style
        [ extrax, extray, ... ] = @by_roll roll

        href = v
        x += border_width
        y += border_height
        width  = icon_width
        height = icon_height
        extrax *= height - width
        extray *= height - width
        transform = "rotate(#{roll}, #{x + extrax + 0.5 * width}, #{y + extray + 0.5 * height})"
        o[v] = { class: "icon", key: "image=#{v}", href, transform, width, height, rx, ry, x, y }
      o

    paths: ->
      o = {}
      for { v, w, line, start, end, headpos, tailpos, label } in @lines
        vw  = [v,w].join("+")
        
        vo = @rects[v]
        wo = @rects[w]
        vp = @pos vo, headpos
        wp = @pos wo, tailpos

        cvpx = vp.x + vp.vx
        cvpy = vp.y + vp.vy
        cwpx = wp.x + wp.vx
        cwpy = wp.y + wp.vy
        d  = "M#{ vp.x },#{ vp.y }C#{ cvpx },#{ cvpy },#{ cwpx },#{ cwpy },#{ wp.x },#{ wp.y }"

        o[vw] = { class: line, key: "path=#{vw}", d, "marker-start": start, "marker-end": end }
      o
    texts: ->
      o = {}
      for { vs, label } in @clusters
        { x, y, width, height } = @cover vs
        { label_height, rx, ry } = options.style
        # x, y は右上
        x += 1.0 * width
        y += 0.5 * label_height 
        o[label] = { class: "pen", key: "label-#{label}", "text-anchor": "end", label, x, y }

      for { v, label, roll, x, y } in @icons
        { label_height, rx, ry } = options.style
        # x, y はボトム
        x += 0.5 * width
        y += 1.0 * height - 2 * border_width
        o[v] = { class: "pen", key: "label-#{label}", "text-anchor": "middle", label, x, y }

      for { v, w, line, start, end, headpos, tailpos, label } in @lines
        vw  = [v,w].join("+")

        # x, y は中点
        lx = parseInt 0.5 * (cvpx + cwpx)
        ly = parseInt 0.5 * (cvpy + cwpy)
        o[vw] = { class: "pen", key: "label-#{label}", "text-anchor": "middle", label, x, y }
      a

    labels: ->
      a = []
      for key, { vs, label } of @clusters
        { rx, ry } = options.style
        a.push { class: "pen", key: "rect-label-#{label}", rx , ry }

      for v, { v, label, roll, x, y } of @icons
        { rx, ry } = options.style
        a.push { class: "pen", key: "rect-label-#{label}", rx , ry }

      for key, { label } of @lines
        { rx, ry } = options.style
        a.push { class: "pen", key: "rect-label-#{label}", rx , ry }
      a

</script>
    # cluster { vs, label }
    @rects[label] = { class: className, key, fill, width, height, x, y, rx, ry }

    # line { v, w, className, start, end, headpos, tailpos, label }
    @paths[vw] = { class: className, key, d, "marker-start": start, "marker-end": end }

    # box　{ v, label, x, y }
    @rects[v] = { class: className, key, width, height, x, y, rx, ry }

    # icon { v, label, x, y, roll }
    @images[v] = { class: className, key, href, transform, width, height, rx, ry, x: x + border_width , y: y + border_width }
    @rects[v] = { class: className, key, width, height, x, y, rx, ry }

    # すべて { v, label, x, y }
    @texts[v] = { class: className, "text-anchor": "middle", key, label, x, y }
    @labels[v] = { class: className, key, rx, ry } 

