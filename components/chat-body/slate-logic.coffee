{ Text } = require "slate"
escapeHtml = require 'escape-html'

Deco = (text, cb)->
  offset = 0
  for part, i in text.split ///((?:ftp|https?):\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})///u
    cb part, i & 1, offset, offset + part.length
    offset += part.length

MARK_TAGS = [ 'ABBR', 'LABEL', 'SUP', 'SUB', 'SAMP', 'CODE', 'KBD', 'VAR', 'MARK', 'STRONG', 'DEL', 'INS', 'EM', 'I', 'B', 'S', 'U' ]
LEAF_TAGS = [
  ...MARK_TAGS
  'A'
  'RUBY', 'RTC', 'RT', 'RP'
]
LIST_TAGS = [
  'UL', 'OL', 'LI'
]

NODE_TAGS = [
  ...LIST_TAGS
  'BLOCKQUOTE', 'ASIDE', 'P'
  'H1', 'H2', 'H3', 'H4', 'H5', 'H6'
  'HR', 'BR'
  'TABLE', 'TBODY','TR', 'TH', 'TD'
  'DL', 'DT', 'DD'
  'IMG'
  'AUDIO'
]
ELEMENT_TAGS = [
  ...NODE_TAGS
]

Render = (h, type, attrs, children)->
  switch type
    when null, undefined
      children
    when 'P'
      <p {...attrs}>{children}</p>
    when 'TABLE'
      <div class="c">
        <hr class="stripe" />
        <table class="r"><tbody {...attrs}>{children}</tbody></table>
      </div>
    else
      h type.toLowerCase(), attrs, children
      # throw new Error "#{type}#{children}"

RenderText = (type, children)->
  switch type
    when 'LI'
      "・#{children}\n"
    when 'RT','RP'
      ""
    when 'P','TR','BLOCKQUOTE','H4', 'TABLE'
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

module.exports = { Deco, Render, HTML, TEXT, LEAF_TAGS, LIST_TAGS }
