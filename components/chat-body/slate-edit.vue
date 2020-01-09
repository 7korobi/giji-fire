<template lang="pug">
slate-editor(
  :id="id"
  :editor="editor"
  :placeholder="placeholder"
  @change="change"
)
  div.form.toolbar
    hr.footnote
    button(@click="submit" :class="{ ban, warn }")
      i.mdi(:class="mark")
      span
        | {{chars}}/
        sub {{maxSize}}字
        | {{words}}/
        sub {{maxWord}}文
        | {{lines}}/
        sub {{maxRow}}行
    slot
    a.btn(@click="" :class="") aaa
    p
      label(:class="type" v-for="[type, label, call] in fixes" @click="call") {{ label }}
</template>
<script lang="coffee">
{ Editor, Node, Text, Transforms, createEditor } = require "slate"
{ Slate, Editable, withReact } = require "slate-react"
{ withHistory } = require 'slate-history'

{ ReactInVue } = require "vuera"

{ localStorage } = require "vue-petit-store"

isHotkey = require 'is-hotkey'
React = require 'react'
escapeHtml = require 'escape-html'
_ = require 'lodash'

random = require "~/app/plugins/random"

if window?
  isHotkey = isHotkey.default

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

HOTKEYS =
  'mod+b': 'STRONG'
  'mod+i': 'EM'
  'mod+u': 'U'
  'mod+`': 'CODE'
MARK_TAGS = [ 'ABBR', 'LABEL', 'SUP', 'SUB', 'SAMP', 'CODE', 'KBD', 'VAR', 'MARK', 'STRONG', 'DEL', 'INS', 'EM', 'I', 'B', 'S', 'U' ]
LEAF_TAGS = [
  ...MARK_TAGS
  'A'
  'RUBY', 'RTC', 'RT', 'RP'
]
NODE_TAGS = [
  'BLOCKQUOTE', 'ASIDE', 'P'
  'UL', 'OL', 'LI'
  'H1', 'H2', 'H3', 'H4', 'H5', 'H6'
  'HR', 'BR'
  'TABLE', 'TBODY','TR', 'TH', 'TD'
  'DL', 'DT', 'DD'
  'IMG'
  'AUDIO'
]
ELEMENT_TAGS = NODE_TAGS

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
      Deco node.text, ///(rich)///u, (text, is_match, last, next)->
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

toReact = (tag, o, children)->
  if o.className = o.class
    delete o.class
  React.createElement tag, o, children

Deco = (text, search, cb)->
  offset = 0
  for part, i in text.split search
    cb part, i & 1, offset, offset + part.length
    offset += part.length

withHtml = (editor)->
  { insertData, isInline, isVoid } = editor
  editor.isInline = (el)-> ['RUBY','RTC','RT','RP','A'].includes el.type
  # editor.isVoid = (el)-> ['HR','IMG'].includes el.type
  editor.insertData = (data)->
    if html = data.getData 'text/html'
      Transforms.insertFragment editor, HTML.parse html
      return
    insertData data
  editor

class SlateEditor extends React.Component
  constructor: (props)->
    super props
    console.info props
    { id } = props
    json = window.localStorage[id]
    value =
      if json
        JSON.parse json
        window.localStorage[id] = JSON.stringify initialValue
        initialValue
      else
        initialValue

    @state = { value }
    @ref = React.createRef()
    @change()

    @onChange = @onChange.bind @
    @onKeyDown = @onKeyDown.bind @

    @decorate = @decorate.bind @
    @renderLeaf = @renderLeaf.bind @
    @renderElement = @renderElement.bind @

  componentDidMount: ->
    console.info "did Mount"
  componentDidUpdate: (props)->
    console.info "did Update"
  componentWillUnmount: ->
    console.info "will Unmount"

  onChange: (value)->
    @setState { value }
    @change()

  change: _.debounce ->
    @props.change @state.value, @cursor(), @size()
  , 300

  rect: ->
    o = window.getSelection()
    unless o.focusNode
      return {}
    rects = o.getRangeAt(0)?.getClientRects()

    top = Math.min ...( o.top for o in rects )
    left = Math.min ...( o.left for o in rects )
    right = Math.max ...( o.right for o in rects )
    bottom = Math.max ...( o.bottom for o in rects )

    ###
    top -= base.top
    left -= base.left
    right -= base.left
    bottom -= base.top
    ###

    width = right - left
    height = bottom - top
    { top, left, bottom, right, width, height }


  size: ->
    text = TEXT.stringify
      children: @state.value
    [ text.split(/\n/).length
      text.split(/[\!\?.,\[\]\{\}！？、。．「」『』【】［］〔〕｛｝]+\s*|\s+/).length - 1
      text.length - 1
    ]

  cursor: ->
    rect = @rect()
    nodes = {}
    [m] = Editor.nodes @props.editor,
      match: (n)=>
        if n.type
          nodes[n.type] = true
        false
    marks = Editor.marks @props.editor
    { nodes, marks, rect }

  decorate: ([node, path])->
    ranges = []
    if Text.isText node
      Deco node.text, ///(rich)///u, (text, is_match, last, next)=>
        if is_match
          ranges.push
            anchor: { path, offset: last }
            focus: { path, offset: next }
            MARK: true
    ranges

  onKeyDown: (e)->
    for hotkey, format of HOTKEYS
      if isHotkey hotkey, e
        e.preventDefault()
        marks = Editor.marks @editor
        if marks?[format] == true
          Editor.removeMark @editor, format
        else
          Editor.addMark @editor, format, true

  renderElement: ({ element, attributes, children })->
    { type, attrs } = element
    # console.info "elem", { type, className, attrs, attributes }
    Object.assign attributes, attrs
    Render toReact, type, attributes, children

  renderLeaf: ({ leaf, attributes, children })->
    { parent: { type } } = children.props
    # console.info "leaf", { attributes, children, leaf, type }
    # leaf.text
    tags =
      for key in LEAF_TAGS when leaf[key]
        key
    last = tags.pop() || 'SPAN'
    for key in tags
      children = Render toReact, key, {}, children
    Render toReact, last, attributes, children

  render: ->
    { id
      editor
      placeholder
      children
    } = @props
    { value
    } = @state
    key = id
    readOnly = false

    h = React.createElement
    h Slate, {
      editor
      value
      placeholder
      @onChange
    }, [
      h Editable, {
        key
        readOnly
        @decorate
        @renderLeaf
        @renderElement
        @onKeyDown
      }
      children
    ]

initialValue = [{ type: 'P', children: [{ text: ''}]}]
initialValue = [
  {
    type: 'P',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', STRONG: true },
      { text: ' text, ' },
      { text: 'much', EM: true },
      { text: ' better than a ' },
      { text: '<textarea>', CODE: true },
      { text: '!' },
    ],
  },
  {
    type: 'UL',
    children: [
      {
        type: 'LI'
        children: [
          {
            type: 'P'
            children: [
              { text: "りすとびゅー"}
            ]
          }
          {
            type: 'OL'
            children: [
              {
                type: 'LI'
                children: [
                  { text: "りすとびゅー"}
                ]
              }
            ]
          }
        ]
      }
      {
        type: 'LI',
        children: [
          type: 'RUBY',
          attrs:
            ruby: 'richふりがな'
          children: [
            { text: "ここを"}
            {
              type: 'RT',
              children: [
                { text: "richふりがな"}
              ]
            }
          ]
        ]
      }
    ]
  }
  {
    type: 'P',
    children: [
      { text: "Since it's rich text, you can do things like turn a selection of text "}
      { text: 'bold', STRONG: true }
      { text: ', or add a semantically rendered block quote in the middle of the page, like this:'}
    ],
  },
  {
    type: 'BLOCKQUOTE',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'H4',
    children: [{ text: 'Try it out for yourself!' }],
  },
  {
    type: 'TABLE',
    children: [
          {
            type: 'TR',
            children: [
              {
                type: 'TH',
                children: [{ text: '' }],
              },
              {
                type: 'TH',
                children: [{ text: 'Human', STRONG: true }],
              },
              {
                type: 'TH',
                children: [{ text: 'Dog', STRONG: true }],
              },
              {
                type: 'TH',
                children: [{ text: 'Cat', STRONG: true }],
              },
            ],
          },
          {
            type: 'TR',
            children: [
              {
                type: 'TH',
                children: [{ text: '# of Feet', STRONG: true }],
              },
              {
                type: 'TD',
                children: [{ text: '2' }],
              },
              {
                type: 'TD',
                children: [{ text: '4' }],
              },
              {
                type: 'TD',
                children: [{ text: '4' }],
              },
            ],
          },
          {
            type: 'TR',
            children: [
              {
                type: 'TH',
                children: [{ text: '# of Lives', STRONG: true }],
              },
              {
                type: 'TD',
                children: [{ text: '1' }],
              },
              {
                type: 'TD',
                children: [{ text: '1' }],
              },
              {
                type: 'TD',
                children: [
                  {
                    type: 'P',
                    children: [
                      { text: "rich text, "}
                      { text: 'bold', STRONG: true }
                    ],
                  },
                  {
                    type: 'P',
                    children: [
                      { text: "rich text, "}
                      { text: 'em', EM: true }
                    ],
                  },
                ],
              },
            ],
          },
    ],
  },
]

serialize = (node)->
  if Text.isText node
    return escapeHtml node.text

  children = node.children
    .map (n)=> serialize n
    .join('')
  { type, data } = node
  "<#{type} #{data}>#{children}</#{type}>"

editor = require './editor'

module.exports = editor
  components:
    'slate-editor': ReactInVue SlateEditor
  mixins: []

  data: ->
    cursor_style: {}
    cursor: {}
    attrs:
      random: []
    fixes: []
    size: [0,0,0]
    log:
      html: ""

  props:
    value: String
    content: String
    handle: String
    id: String

    placeholder:
      type: String
      default: '入力はこちらに。'

  computed:
    editor: ->
      withHtml withHistory withReact createEditor()

    is_ban_internal: ->
      for [type] in @fixes
        return true if "ban" == type
      false

    is_warn_internal: ->
      for [type] in @fixes
        return true if "warn" == type
      false

    meta: ->
      { @attrs, @size }

  beforeDestroy: ->

  methods:
    action_invoke: (e)->
      { actionName } = e
      [..., type, mode] = actionName.split("-")

      range = @editor.getSelectedRange()
      str = @editor.getDocument().getStringAtRange range
      invoke[type] @editor, mode, range, str

    change: (value, @cursor, @size)->
      { top, left, width, height } = @cursor.rect
      top = top + "px"
      left = left + "px"
      @cursor_style = { position: 'absolute', borderWidth: '2px', borderColor: 'red', top, left, width: "100px", height: "100px" }

      console.info value, @cursor, @cursor_style
      return
      { fragment, selection, object, document, decorations, blocks } = @data

      @fixes = []

      hash = {}
      @attrs.random = hash.kbd ? []

      for str in @attrs.random
        console.log str.match random.match
        type =
          if str.match random.match
            "ok"
          else
            "warn"
        @fixes.push [type, str, (->)]

      "".replace /(ftp|https?):\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/ig, (url, protocol, head, src)=>
        console.log "uri: ", head, tail, protocol, url
        return src unless protocol

        tail  = head +     url.length
        tail2 = head + 1 + protocol.length
        result_range = [head + 1, tail2]
        console.log head, tail, tail2, " #{protocol} ", { href: url }
        @fixes.push ["ban", url, ->
          editor.recordUndoEntry "Auto Link"
          editor.setSelectedRange [head, tail]
          editor.insertString " #{protocol} "
          editor.setSelectedRange result_range
          editor.activateAttribute 'href', url
        ]
        return ""

      if @id
        window.localStorage[@id] = JSON.stringify @data
      # @log.html = serialize @data
      # @$emit 'input', @log.html

    focus: (e)->
      range = @editor.getSelectedRange()
      @$emit 'selection', range

    blur: (e)->
      @$emit 'selection', null

  watch:
    'cursor.marks.STRONG': (n,o)->
      console.info 'cursor-marks.STRONG', JSON.stringify n
    'cursor.nodes.P': (n,o)->
      console.info 'cursor.nodes.P', JSON.stringify n
    value: _.debounce (newValue, oldValue)->
      return
      return if @log.html == newValue
      console.log "force change.", { newValue, oldValue }
      @data = deserialize @value
    , 500
</script>
<style lang="sass"></style>
