<template lang="pug">
article.fine(v-root-size)
  svg(v-bind="svg_attrs" v-on="movespace")
    marker.edgePath#svg-marker-circle(viewBox="0 0 10 10" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="5" refY="5" orient="auto")
      circle(cx="5" cy="5" r="4")
    marker.edgePath#svg-marker-arrow-start(viewBox="0 0 10 10" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="3" refY="5" orient="auto")
      path.fill(d="M10,0 L0,5 L10,10 z")
    marker.edgePath#svg-marker-arrow-end(viewBox="0 0 10 10" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="7" refY="5" orient="auto")
      path.fill(d="M0,0 L10,5 L0,10 z")
    marker.edgePath#svg-marker-cross(viewBox="0 0 10 10" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="5" refY="5" orient="0")
      path.path(d="M0,0 L10,10 M0,10 L10,0 z")
    g
      slot
    g
      rect( v-for="(o, key) in rects"  v-if="o" v-bind="o" v-on="draggable(key, o)")
      image(v-for="(o, key) in images" v-if="o" v-bind="o" v-on="draggable(key, o)")
    g.edgePath
      path.path(v-for="(o, key) in paths" fill="none" v-if="o" v-bind="o")
      rect(v-for="(o, key) in labels" v-if="o" v-bind="o" :ref="o.key")
      text(v-for="(o, key) in texts" v-if="o" v-bind="o" :ref="o.key" @click="set_pin(key)" v-label-size)
        | {{ o.label }}
    g(v-if="move.id")
      rect.move(v-bind="moved")
</template>

<script lang="coffee">
# inspired by https://github.com/wakufactory/MarkDownDiagram

_ = require 'lodash'
{ resize } = require "vue-petit-store"
{ Query } = require "memory-orm"
{ url } = require "~/../giji/config/yaml/live.yml"

id_line = ({ v, w, vpos, wpos })->
  "#{[v,w]}=#{[vpos,wpos]}"
id_cluster = ({ vs })->
  "#{vs}"

parse_touch = (e)->
  { pageX, pageY } = e.changedTouches[0]
  { target } = e
  { pageX, pageY, target }

module.exports =
  props:
    value:  Object
    pin_id: String

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
    style:
      icon:
        width:      90
        height:    130
      gap_size:     50
      root_size:
        width:  0
      label_size:
        height:  0
      label_heights: []
      line_slide:   25
      border_width:  5
      rx:           10
      ry:           10

  directives:
    rootSize:  resize 'style.root_size'
    labelSize: resize 'style.label_size'
  methods:
    set_pin: (key)->
      @$emit 'update:pin_id', key

    recalc: (dx, dy)->
      @move_xy @moved, dx, dy

    do_move: (id, dx, dy)->
      for o, idx in @value.icons when o.v == id
        @move_xy o, dx, dy
        @$emit 'input', @value
        return

    move_xy: (o, dx, dy)->
      { x, y } = @move
      o.x = parseInt x + dx
      o.y = parseInt y + dy

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
    
    cover: (vos)->
      { gap_size, icon } = @style
      vos = vos.filter (o)-> o
      unless vos.length
        x = y = gap_size
        vos.push { ...icon, x, y }

      xmin = Math.min ...vos.map (o)-> o.x
      xmax = Math.max ...vos.map (o)-> o.x + ( o.width  || 0 )
      ymin = Math.min ...vos.map (o)-> o.y
      ymax = Math.max ...vos.map (o)-> o.y + ( o.height || 0 )
      width  = xmax - xmin + gap_size
      height = ymax - ymin + gap_size
      x = xmin - 0.5 * gap_size
      y = ymin - 0.5 * gap_size

      { x, y, width, height }

    label_height_update: (height)->
      @style.label_heights.push height
      height = Math.max @style.label_heights
      d = height - @style.label_size.height
      if 4 < d * d
        @style.label_size.height = parseInt height
        # console.log height, d * d, @style.label_heights.length

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
    movespace: ->
      move = ({ pageX, pageY, target })=>
        { px, py } = @move
        dx = @zoom * (pageX - px)
        dy = @zoom * (pageY - py)
        if @move.id
          @recalc dx, dy

      finish = ({ pageX, pageY, target })=>
        { px, py } = @move
        dx = @zoom * (pageX - px)
        dy = @zoom * (pageY - py)

        if @move.id
          if dx == dy == 0
            @set_pin @move.id
          else
            @do_move @move.id, dx, dy
          @move.id = null

      up = (o)=>
        unless @move.id
          @set_pin null
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

    svg_attrs: ->
      style:
        maxWidth: '100%'
        fontSize: "#{ @zoom * 3 / 4 }rem"
      viewBox:
        "#{@root.x} #{@root.y} #{@root.width} #{@root.height}"

    zoom: ->
      { width } = @style.root_size
      return 1.0 unless width
      @root.width / width

    root: ->
      @cover Object.values @rects

    calcs: ->
      o = {}
      { border_width, label_size, gap_size, icon } = @style

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
          height += label_size.height
        width  += 2 * border_width
        height += 2 * border_width
        o[v] = { class: 'box', width, height, x, y, label }

      for { vs, label } in @value.clusters
        { x, y, width, height } = @cover vs.map (v)=> o[v]
        o[vs] = { class: "cluster", width, height, x, y, label }

      for oo in @value.lines
        vw = id_line oo
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
        o[key] = { class: calc.class, key: "rect=#{key}", rx, ry, width, height, x, y }
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
        vw = id_line oo
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
      { label_size, border_width, icon } = @style
      for { vs, label } in @value.clusters
        { width } = icon
        { x, y, width } = @calcs[vs]
        # x, y は右上
        x = parseInt x + 1.0 * width
        y = parseInt y + 0.3 * label_size.height
        o[vs] = { class: "pen", key: "label-#{vs}", "text-anchor": "end", label, x, y }

      for { v, label, roll, x, y } in @value.icons when label
        { width, height, x, y } = @calcs[v]

        # x, y はボトム
        x = parseInt x + 0.5 * width
        y = parseInt y + 1.0 * height - 3 * border_width
        o[v] = { class: "chr", key: "label-#{v}", "text-anchor": "middle", label, x, y }

      for oo in @value.lines when oo.label
        vw = id_line oo
        { v, w, line, vpos, wpos, label } = oo
        { x, y }= @calcs[vw].cp
        y = parseInt y + 0.3 * label_size.height
        o[vw] = { class: "path", key: "label-#{vw}", "text-anchor": "middle", label, x, y }
      o

    labels: ->
      o = {}
      { rx, ry } = @style
      @style.label_size.height
      @style.label_heights = []
      @$nextTick ->
        for key, val of o
          @label_draw key

      for { vs, label } in @value.clusters when label
        o[vs] = { class: "pen", key: "rect-label-#{vs}", rx , ry }

      for { v, label, roll, x, y } in @value.icons when label
        o[v] = { class: "chr", key: "rect-label-#{v}", rx , ry }

      for oo in @value.lines when oo.label
        vw = id_line oo
        o[vw] = { class: "path", key: "rect-label-#{vw}", rx , ry }
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
