{ syntax } = require './marksvg-regexp'

parse = (render, src)->
  do_parse([], render, src)

do_parse = (tokens, render, src)->
  while src
    # console.log src
    if cap = syntax.newline.exec src
      [ all ] = cap
      src = src[all.length ..]
      # console.log "newline", cap
      render.newline()
      type = "newline"
      tokens.push { type, all }
      continue

    if cap = syntax.edges.exec src
      [ all, edges, v, $, $, $, $, $, label ] = cap
      src = src[all.length ..]
      # console.log "edges", cap
      edges = edges
      .split syntax._arrow_
      .map (s)-> s?.trim()

      for v, idx in edges by 6
        [ v, start, line, side, line2, end, w ] = edges[idx .. idx + 6]
        if line != line2
          render.error " #{edges[idx .. idx + 6].join("")} 線の前後が異なります。"
          break
        continue unless w
        [vm, v, vl] = render.dic v
        [wm, w, wl] = render.dic w
        { rects } = render.data
        if rects[v] && rects[w]
          headpos = side?[0] ? '>'
          tailpos = side?[1] ? '<'
          render.edge v, w, line, start, end, headpos, tailpos, label
        else
          render.error " #{edges[idx .. idx + 6].join("")} 要素が未定義です。"
      type = "edges"
      tokens.push { type, all }
      continue

    if cap = syntax.nodes.exec src
      [ all, label, nodes ] = cap
      src = src[all.length ..]
      # console.log "nodes", cap
      nodes = nodes
      .trim()
      .split syntax.pick_node
      vs =
        for $, idx in nodes by 5
          [$, x, side, y, v] = nodes[idx .. idx + 4]
          continue unless v
          [vm, vid, vl] = render.dic v
          unless render.is_cluster vid
            render[vm] vid, vl, side, x, y
            render.node v, vid
          vid
      if label
        render.cluster vs, label
      type = "nodes"
      tokens.push { type, all }
      continue

    if cap = syntax.error.exec src
      [ all ] = cap
      src = src[all.length ..]
      render.error "#{all} 解釈できない文字列です。"
      type = "error"
      tokens.push { type, all }
      continue
  tokens

stringify = (tokens, data)->
  dest = ""
  for { type, all } in tokens
    switch type
      when 'nodes'
        dest += all.replace syntax.pick_node, ( $, x, side, y, v )->
          if o = data.nodes[v]
            { x, y, key } = o
            "<#{x}#{key[0]}#{y}>#{v}"
          else
            v
      when 'newline'
        dest += all
      when 'edges'
        dest += all
      when 'error'
        dest += all
      else
        throw new Error "tokens unimplement."
  dest


module.exports = { parse, stringify }
