<script lang="coffee">
dagre = require "dagre"

regexp_join = (regex, ...names) ->
  { flags, source } = regex

  for name in names
    key = new RegExp name, 'g'
    val = syntax['_' + name]
    val = val.source or val
    source = source.replace key, val
  new RegExp source, flags

syntax =
  newline: /^ *\n|^ +$/
  node:  /^( *)(\w+) *(comment)?(?:eol)?/
  child_edge: /^( *)(-+|=+|\.+)([>Xx]?) *(\w+) *(comment)?(?:eol)?/
  edge:  /^( *)(\w+) *(-+|=+|\.+)([>Xx]?) *(\w+) *(comment)?(?:eol)?/

  _comment: /: *(.*) */
  _eol: / *(?:\n|$)/

syntax.node = regexp_join syntax.node, 'comment', 'eol'
syntax.edge = regexp_join syntax.edge, 'comment', 'eol'
syntax.child_edge = regexp_join syntax.child_edge, 'comment', 'eol'

class Render
  constructor: (@graph)->
  newline: ->
  edge: (v, w, line, arrow, label)->
    console.log arguments
    arrow =
      switch arrow
        when '>'
          'arrow'
        when 'X', 'x'
          'cross'
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

    if label
      @graph.setEdge v, w,
        minlen: 1
        weight: 1
        arrow: arrow
        class: line
        label: label
        labelpos: 'c'
        labeloffset: 10
        width:       20 * label.length 
        height:      20
    else
      @graph.setEdge v, w,
        minlen: 1
        weight: 1
        arrow: arrow
        class: line

  icon: (v, label)->
    @graph.setNode v,
      label: label
      class: 'portrate'
      href: "https://api-project-54633717694.firebaseapp.com/images/portrate/#{v}.jpg"
      width:  100
      height: 140
  
  group: (v, w, label)->
    @graph.setNode w,
      label: label
      class: 'group'
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

    if cap = syntax.child_edge.exec src
      [ all, depth, line, arrow, w, $, label ] = cap
      # console.log "child_edge", cap
      if v = find_parent "", depth
        src = src[all.length ..]
        render.edge v, w, line, arrow, label
        continue

    if cap = syntax.edge.exec src
      [ all, depth, v, line, arrow, w, $, label ] = cap
      src = src[all.length ..]
      # console.log "edge", cap
      find_parent "", depth
      render.edge v, w, line, arrow, label
      continue

    if cap = syntax.node.exec src
      [ all, depth, v, $, label ] = cap
      src = src[all.length ..]
      # console.log "node", cap
      render.icon v, label

      if parent = find_parent v, depth
        { label } = render.graph.node parent
        render.group v, parent, label

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
    rankdir: 'BT' # TB / BT / LR / RL
    nodesep: 20
    ranksep: 90
    edgesep: 10
    marginx:  0
    marginy:  0

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
    nodes: -> @graph.nodes().map (key)=> @graph.node key
    edges: -> @graph.edges().map (key)=> @graph.edge key
    view_box: -> "0 0 #{@root.width} #{@root.height}"

    graph: ->
      g = init()
      try
        r = new Render g
        parse r, @value
        dagre.layout r.graph
      catch e
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

</script>
<style lang="stylus" scoped>
g.portrate > rect
  fill:   black
  stroke: black
g.group
  fill: none
g.group > rect
  stroke-width: 3px
g > text
  fill: white


.edgePath > path.path.wide
  fill: none
  stroke-width: 6px
  stroke-dasharray: 1px, 0

.edgePath > path.path.solid
  fill: none
  stroke-width: 3px
  stroke-dasharray: 1px, 0

.edgePath > path.path.dotted
  fill: none
  stroke-width: 3px
  stroke-dasharray: 3px

#svg-marker-arrow > path
  stroke-width: 1px
  stroke-dasharray: 1px, 0
#svg-marker-cross > path
  stroke-width: 2px
  stroke-dasharray: 1px, 0

</style>
<template lang="pug">
svg(:style="`max-width: 100%; width: ${root.width}px;`" :viewBox="view_box")
  marker.edgePath#svg-marker-arrow(viewBox="0 0 10 10" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="3" refY="5" orient="auto")
    path.path(d="M0,0 L10,5 L0,10 z")
  marker.edgePath#svg-marker-cross(viewBox="0 0 10 10" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="5" refY="5" orient="0")
    path.path(d="M0,0 L10,10 M0,10 L10,0 z")
  g(v-for="o in nodes" v-if="o" :class="o.class")
    rect(:x="o.x - o.width / 2" :y="o.y - o.height / 2" :width="o.width" :height="o.height" rx="10" ry="10")
    image(v-if="o.href" :x="o.x - o.width / 2 + 5" :y="o.y - o.height / 2 + 5" :width="o.width - 10" :height="o.height - 10" :xlink:href="o.href")
  g.edgePath
    path.path(v-for="o in edges" v-if="o.points" :class="o.class" :d="path_d(o.points)" :marker-end="`url(#svg-marker-${o.arrow})`")
  g
    text.messageText(v-for="o in nodes" v-if="o && o.label" :x="o.x - o.width / 2" :y="20 + o.y + o.height / 2" )
      | {{ o.label }}
    text.messageText(v-for="o in edges" v-if="o && o.label" :x="o.x - o.width / 2" :y="o.y + o.height / 2" )
      | {{ o.label }}
</template>
