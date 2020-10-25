<template lang="pug">
slate-editor(
  :id="id"
  :editor="editor"
  :placeholder="placeholder"
  @change="change"
)
  .form
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
    span(v-if="cursor.is_range" :title="cursor.text")
      a.btn(@click="unicode('full')") あ゙
      a.btn(@click="unicode('half')") い゚
      a.btn(@click="unicode('none')") あ
      a.btn(@click="unicode('invert')") あア

  p
    label(:class="type" v-for="[type, label, call] in fixes" @click="call") {{ label }}
</template>
<script lang="coffee">
{ Editor, Node, Text, Range, Transforms, createEditor } = require "slate"
{ Slate, Editable, withReact, ReactEditor } = require "slate-react"
{ withHistory } = require 'slate-history'

{ ReactInVue } = require "vuera"

{ localStorage } = require "vue-petit-store"

isHotkey = require 'is-hotkey'
React = require 'react'
_ = require 'lodash'

{ Deco, Render, RenderText, TEXT, HTML, LEAF_TAGS } = require './sow-logic'
unicode = require '~/app/plugins/unicode'

if window?
  isHotkey = isHotkey.default

HOTKEYS =
  'mod+b': 'STRONG'
  'mod+i': 'EM'
  'mod+u': 'U'
  'mod+`': 'CODE'

toReact = (tag, o, children)->
  if o.className = o.class
    delete o.class
  React.createElement tag, o.attrs || o, children

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

  size: ->
    text = TEXT.stringify
      children: @state.value
    [ text.split(/\n/).length
      text.split(/[\!\?.,\[\]\{\}！？、。．「」『』【】［］〔〕｛｝]+\s*|\s+/).length - 1
      text.length - 1
    ]

  cursor: ->
    nodes = {}
    [m] = Editor.nodes @props.editor,
      match: (n)=>
        if n.type
          nodes[n.type] = true
        false
    marks = Editor.marks @props.editor

    { selection } = @props.editor
    if selection
      is_collapse = Range.isCollapsed selection
      is_range = ! is_collapse
      text = Editor.string @props.editor, selection

    { nodes, marks, text, is_collapse, is_range }

  decorate: ([node, path])->
    ranges = []
    if Text.isText node
      Deco node.text, (text, o, last, next)=>
        for key, val of o when val
          console.warn key, val
          ranges.push
            anchor: { path, offset: last }
            focus: { path, offset: next }
            [key]: true
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
    h 'div', {}, [
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
      ]
      children
    ]

initialValue = [{ type: 'P', children: [{ text: ''}]}]

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
      editor = withHistory withReact createEditor()
      { insertText, insertData, deleteBackward, isInline, isVoid, normalizeNode } = editor

      editor.isInline = (el)-> ['RUBY','RTC','RT','RP','A'].includes el.type
      editor.isVoid = (el)-> ['HR','IMG'].includes el.type

      editor.normalizeNode = ([node, path])->
        console.warn "normalize", node, path
        normalizeNode [node, path]

      editor.insertData = (data)->
        if html = data.getData 'text/html'
          Transforms.insertFragment editor, HTML.parse html
          return
        insertData data

      editor.insertText = (text)->
        console.warn "insert", text
        insertText text

      editor.deleteBackward = (...args)->
        console.warn "delete", args
        deleteBackward ...args
      editor

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
    node: (type)->
      is_list = LIST_TAGS.includes type

      Transforms.unwrapNodes @editor,
        match: (n)=> LIST_TAGS.includes n.type
        split: true

      Transforms.setNodes @editor,
        type:
          if is_list
            'LI'
          else
            type

      if is_list
        Transforms.wrapNodes @editor, { type, children: [] }

    mark: (type)->
      if @cursor.marks[type]
        Editor.removeMark @editor, type
      else
        Editor.addMark @editor, type, true

    unicode: (mode)->
      { text } = @cursor
      target = unicode.replace mode, text

      { anchor, focus } = @editor.selection
      focus =
        path: focus.path
        offset: focus.offset - text.length + target.length

      Transforms.delete @editor
      Transforms.insertText @editor, target
      Transforms.select @editor, { anchor, focus }

    change: (value, @cursor, @size)->
      console.info value, @cursor
      console.warn HTML.parse HTML.stringify @editor
      return

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
