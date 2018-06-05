<script lang="coffee">
dagre = require "dagre"
{ Query } = require "~/plugins/memory-record"
{ url } = require "~/config/live.yml"

regexp_join = (regex, ...names) ->
  { flags, source } = regex

  for name in names
    key = new RegExp name, 'g'
    val = syntax[name]
    val = val.source or val
    source = source.replace key, val
  new RegExp source, flags

syntax =
  edges: /^( *)((\w+)?(?: *_arrow_ *\w+)+) *(?:_comment_)?(?:_eol_)/
  nodes: /^( *)((?:\w| )+)(?:_comment_)?(?:_eol_)/
  newline: /^ *\n|^ +$/

  _arrow_: /(-+|=+|\.+)(>|X|x|O|o)?/
  _comment_: /: *(.*) */
  _eol_: / *(?:\n|$)/

syntax.nodes = regexp_join syntax.nodes, '_arrow_', '_comment_', '_eol_'
syntax.edges = regexp_join syntax.edges, '_arrow_', '_comment_', '_eol_'

class Render
  constructor: (@graph)->
  newline: ->
  edge: (v, w, line, arrow, label)->
    weight = line.length
    arrow =
      switch arrow
        when '>', ')'
          'url(#svg-marker-arrow)'
        when 'O', 'o'
          'url(#svg-marker-circle)'
        when 'X', 'x'
          'url(#svg-marker-cross)'
        else
          null
    line =
      switch line[0]
        when '='
          'wide'
        when '-'
          'solid'
        when '.'
          'dotted'
        else
          'hide'

    label ?= "   "
    @graph.setEdge v, w,
      key: [v,w].join(",")
      minlen: 1
      weight: weight
      arrow: arrow
      class: line
      label: label
      labelpos: 'c'
      width:  25 * label.length 
      height: 30
      rx:      5
      ry:      5

  icon: (v, label)->
    @graph.setNode v,
      label: label
      class: 'icon'
      width:  100
      height: 140
      rx:      10
      ry:      10
  
  cluster: (v, w, label)->
    @graph.setNode w,
      key: w
      label: label
      class: 'cluster'
    @graph.setParent v, w

parse = (render, src)->
  parents = {}
  tokens = []

  last =
    v: ""
    depth: 0
  find_parent = (v, depth)->
    depth = depth.length
    if last.depth < depth
      parents[depth] = last
    last = { depth, v }
    parents[depth]?.v

  while src
    # console.log src
    if cap = syntax.newline.exec src
      [ all ] = cap
      src = src[all.length ..]
      # console.log "newline", cap
      render.newline()
      continue

    if cap = syntax.edges.exec src
      [ all, depth, edges, v, $, $, label ] = cap
      src = src[all.length ..]
      # console.log "edges", cap
      edges = edges
      .split syntax._arrow_
      .map (s)-> s?.trim()

      if v
        if find_parent "", depth
          throw new Error "解釈できない文字列です。"
      else
        unless v = find_parent "", depth
          throw new Error "解釈できない文字列です。"

      edges[0] = v
      for v, idx in edges by 3
        [ v, line, arrow, w ] = edges[idx .. idx + 3]
        if w
          render.edge v, w, line, arrow, label
      continue

    if cap = syntax.nodes.exec src
      [ all, depth, nodes, label ] = cap
      src = src[all.length ..]
      # console.log "nodes", cap
      nodes = nodes
      .trim()
      .split(/ +/)
      for v, idx in nodes
        render.icon v, label
        if label
          render.edge v, v, "", "", label

        if parent = find_parent v, depth
          { label } = render.graph.node parent
          render.cluster v, parent, label

      continue

    if src
      throw new Error "解釈できない文字列です。"

init = ->
  g = new dagre.graphlib.Graph
    directed:    true
    compound:    true
    multigraph: false
  g.setGraph
    # acyclicer: 'greedy'
    # ranker: 'network-simplex'
    # ranker: 'tight-tree'
    ranker: 'longest-path'
    rankdir: 'RL' # TB / BT / LR / RL
    nodesep: 10
    ranksep: 10
    edgesep: 10
    marginx:  3
    marginy:  3

module.exports =
  props: ["value"]
  methods:
    path_d: (list)->
      'M' + list
      .map ({x,y})-> "#{x},#{y}"
      # .join('T') # CurveTo Cx1,y1 x2,y2 x,y Sx2y2 x,y Qx1,y1, x,y Tx,y
      .join('L') # LineTo Lx,y Hx Vy

  computed:
    root:  -> @graph.graph()
    
    edge_paths: ->
      @graph.edges().map (key)=>
        o = @graph.edge key
        o?.points and Object.assign {}, o,
          key: "path-" + key
          "marker-end": o.arrow
          d: @path_d o.points

    edge_rects: ->
      @graph.edges().map (key)=>
        o = @graph.edge key
        o?.label?.trim() and Object.assign {}, o,
          key: "labelrect-" + key
          x: o.x - o.width  * 0.5
          y: o.y - o.height * 0.7

    edge_labels: ->
      @graph.edges().map (key)=>
        o = @graph.edge key
        o?.label and Object.assign {}, o,
          key: "text-" + key

    node_images: ->
      @graph.nodes()
      .map (key)=>
        o = @graph.node key
        if Query.faces.find(key)
          href = "#{url.assets}/images/portrate/#{ key }.jpg"
        o and href and
          key: "image-" + key
          x: o.x - o.width  / 2 + 5
          y: o.y - o.height / 2 + 5
          width:  o.width  - 10
          height: o.height - 10
          href: href

    node_rects: ->
      @graph.nodes()
      .map (key)=>
        o = @graph.node key
        o and
          key: "rect-" + key
          rx: o.rx
          ry: o.ry
          x: o.x - o.width  / 2
          y: o.y - o.height / 2
          width:  o.width
          height: o.height

    view_box: -> "0 0 #{@root.width} #{@root.height}"

    graph: ->
      g = init()
      try
        r = new Render g
        parse r, @value
        dagre.layout r.graph
      catch e
        console.warn(e)
        g = init()
        g.setNode 'error',
        label: e.message
        x: 0
        y: 0
        width:  400
        height: 100
        dagre.layout g
      g

    todo: ->
      ###
c40
c30
c20
c10
  ..> c20
  --> c30
  ==> c40
      ###
      # api cheat sheet
      'wolf' == graph.parent 'c01'
      'wolf' == graph.parent 'c02'
      graph.children 'wolf'    # [c01, c02]
      graph.neighbors 'c01'    # [c02] for edge source/target list
      graph.predecessors 'c02' # [c01] for edge source list
      graph.predecessors 'c01' # [c02] for edge target list
      graph.inEdges 'c02'      # [{v, w: 'c02'}]
      graph.outEdges 'c01'     # [{v: 'c01', w}]
      graph.nodeEdges 'c01'    # [...[{v: 'c01', w}],...[{v, w: 'c01'}]]
      graph.sources() # without edge target
      graph.sinks()   # without edge source

###
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // タグ名
      this.$slots.default // 子の配列
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})

.chat.report(@click="click" @input="input" :id="id" :key="id" :class="classname")
  .text(v-html="log_html" :class="deco")

  ||

n "div",
  key: @id
  staticClass: "chat report"
  class: @classname
  attrs:
    id: @id
  on:
    click: @click
    input: @input
, [
  n "div",
    staticClass: "text"
    class: @deco
    domProps:
      innerHTML: @_s @log_html
]
###

</script>
<style lang="stylus" scoped>

.nodes-move:not(.nodes-leave-active)
  > rect
  > image
    transition: x .5s, y .5s
.edges-move:not(.edges-leave-active)
  transition: d .5s

</style>
<template lang="pug">
svg(:style="`max-width: 100%; width: ${root.width}px;`" :viewBox="view_box")
  marker.edgePath#svg-marker-circle(viewBox="0 0 10 10" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="2" refY="5" orient="auto")
    circle(cx="5" cy="5" r="4")
  marker.edgePath#svg-marker-arrow(viewBox="0 0 10 10" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="3" refY="5" orient="auto")
    path.path(d="M0,0 L10,5 L0,10 z")
  marker.edgePath#svg-marker-cross(viewBox="0 0 10 10" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="5" refY="5" orient="0")
    path.path(d="M0,0 L10,10 M0,10 L10,0 z")
  transition-group(tag="g" name="nodes")
    rect( v-for="o in node_rects"  v-if="o" v-bind="o")
    image(v-for="o in node_images" v-if="o" v-bind="o")
  transition-group.edgePath(tag="g" name="edges")
    path.path(v-for="o in edge_paths" fill="none" v-if="o" v-bind="o")
    rect.path(v-for="o in edge_rects" v-if="o" v-bind="o")
    text.messageText(v-for="o in edge_labels" v-if="o" v-bind="o")
      | {{ o.label }}
</template>

