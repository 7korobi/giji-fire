{ Text } = require "slate"
escapeHtml = require 'escape-html'

SEARCH = /\[\[([0-9]{1,2}d[0-9]{1,6}|fortune|who|omikuji|role|gift|event|vil who|vil role|vil gift|vil event)\]\]|(([a-z]+):\/\/[^\s<]+[^<.,:;"')\]\s])|((?:\/\*)(?:[\s\S]*?)(?:\*\/|$))|(>>[\+\-\*\#\%\=\!\@]?(?:\d{1,2}:)?[\+\-\*\#\%\=\!\@]?\d{1,6})/g
LEAF_TAGS = ['A', 'IMG', 'KBD', 'DEL']

Deco = (text, cb)->
  offset = 0
  text.replace SEARCH, (part, KBD, A, protocol, DEL, anker, idx)=>
    IMG = A?.match(/\.(jpg|jpeg|png|gif|bmp)$/)?[1]
    if anker?
      A = anker
    o = { KBD, A, DEL }
    cb text[ offset .. idx ], null, offset, idx
    offset = idx + part.length
    cb text[ idx .. offset ], o, idx, offset

Render = (h, type, attrs, children)->
  switch type
    when null, undefined
      children
    when 'P'
      <p {...attrs}>{children}</p>
    when 'A'
      <a {...attrs} href={ TEXT.stringify { children } }>{children}</a>
    when 'KBD'
      <kbd {...attrs} title={ TEXT.stringify { children } }>{children}</kbd>
    else
      h type.toLowerCase(), attrs, children
      # throw new Error "#{type}#{children}"

RenderText = (type, children)->
  switch type
    when 'P'
      children + "\n"
    else
      children


TEXT =
  parse: (text)->
    text
    .split "\n"
    .map (text)->
      { text }

  stringify: (node)->
    if Text.isText node
      return node.text
    
    text = node.children.map (n)=>
      TEXT.stringify n
    .join("")

    RenderText node.type, text

HTML =
  parse: (html)->
    parsed = new DOMParser().parseFromString html, 'text/html'
    parsed.body

  stringify: (node)->
    if Text.isText node
      tags =
        for key in LEAF_TAGS when node[key]
          key

      children = []
      Deco node.text, (text, is_match, last, next)->
        text = escapeHtml text
        if is_match
          text = Render toTAG, 'MARK', {}, text
        for key in tags
          text = Render toTAG, key, {}, text
        children.push text
      return children.join("")
    
    text = node.children.map (n)=>
      HTML.stringify n
    .join("")

    Render toTAG, node.type, {}, text

toTAG = (tag, o, children)->
  attrs = []
  if o?.class
    attrs.push """ class="#{o.class}"
    """
  if o?.attrs
    for k,v of o.attrs when k and v
      attrs.push """ #{escapeHtml k}="#{escapeHtml v}"
      """

  attrs = attrs.join ""
  if children
    "<#{tag}#{attrs}>#{children}</#{tag}#{attrs}>"
  else
    "<#{tag}#{attrs}/>"

module.exports = { Deco, Render, HTML, TEXT, LEAF_TAGS }
