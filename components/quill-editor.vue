<script lang="coffee">

###
// https://github.com/quilljs/parchment/#blots
import Quill from 'quill'
let Inline = Quill.import('blots/inline')

class SpellingBlot extends Inline {
  static create(value) {
    let node = super.create(value)
    node.setAttribute('data-invalid-spelling', '')
    node.setAttribute('data-alternative-spellings', [])
    return node
  }

  static formats(domNode) {
    return {
      isInvalidSpelling: domNode.hasAttribute('data-invalid-spelling'),
      alternativeSpellings: domNode.getAttribute('data-alternative-spellings'),
    }
  }
}

SpellingBlot.blotName = 'spelling'
SpellingBlot.className = 'spelling'
SpellingBlot.tagName = 'SPAN'

export default SpellingBlot


Markup = Quill.import 'blots/'
###

if document?
  window.Quill = Quill = require 'quill'
  Color = Quill.import 'attributors/class/color'
  Color.whitelist = ['Y0','Y1','Y2','Y4','Y6','Y8']

  Background = Quill.import 'attributors/class/background'
  Background.whitelist = ['Y0','Y1','Y2','Y4','Y6','Y8']

  Font = Quill.import 'attributors/class/font'
  Font.whitelist = ["monospace"]

  Size = Quill.import 'attributors/class/size'
  Size.whitelist = ["small", "large", "huge"]

  { ImageDrop } = require "quill-image-drop-module"

  Keyboard = Quill.import 'modules/keyboard'
  Keyboard.DEFAULTS.bindings.tab.handler

  class History extends Quill.import 'modules/history'
    change: ->
      super ...arguments
      console.log "change", @stack
    clear: ->
      super ...arguments
      console.log "clear",  @stack
    record: ->
      super ...arguments
      console.log "record", @stack
    transform: ->
      super ...arguments
      console.log "transform", @stack

  class CodeBlock extends Quill.import 'formats/code-block'
    @tagName: 'code'

  class Link extends Quill.import 'formats/link'
    @create: (value)->
      node = super.create value
      node.setAttribute 'chk', 'confirm'
      node

  Delta = require "quill-delta"
  require "quill-magic-url"
  class magic_url extends Quill.import 'modules/magicUrl'
    textToUrl: (index, url)->
      ops = new Delta()
      .retain index + 1
      .delete url.length
      .insert "LINK",
        link: @normalize url
      @quill.updateContents ops

  require "quill-mention/dist/quill.mention.min"
  class mention extends Quill.import 'blots/embed'
    @className: 'cite-bottom'
    @tagName: 'q'
    @blotName: 'mention'

    @value: (node)-> node.dataset
    @setDataValues: (elem, data)->
      for key, val of data
        elem.dataset[key] = val
      elem
    @create: (data)->
      node = super.create()
      node.setAttribute "cite", data.id
      node.innerText = "#{data.mark}#{data.id}"
      mention.setDataValues node, data

  Quill.register
    'formats/background': Background
    'formats/color': Color
    'formats/font': Font
    'formats/size': Size
    'formats/link': Link
    'formats/code-block': CodeBlock
    'formats/mention': mention
    'modules/keyboard': Keyboard
    'modules/history': History
    'modules/magicUrl':  magic_url
    'modules/imageDrop': ImageDrop
  , true

quill_paste = (newVal, oldVal)->
  return unless @quill
  if newVal
    if newVal != @html
      @quill.pasteHTML @html = newVal
  else
    @quill.setText ''

module.exports =
  data: ->
    _options: {}
    html: ''
    text: "\n"

    defaultOptions:
      handlers:
        kana: (value)->
          console.log value
      modules:
        imageDrop: true
        history: true
        clipboard: true
        magicUrl:
          urlRegularExpression: /(https?:\/\/[\S]+)|(www.[\S]+)|(mailto:[\S]+)|(tel:[\S]+)/
          globalRegularExpression: /(https?:\/\/|www\.|mailto:|tel:)[\S]+/g
        mention:
          dataAttributes: ['id', 'id', 'mark']
          isolateCharacter:   true
          fixMentionsToQuill: true
          allowedChars: /^\S+$/
          mentionDenotationChars: ["@","#","%"]
          renderItem: (o, search)->
            "#{o.id}"
          source: (search, renderList, mark)->
            values = [
              { id: "aaa", mark }
              { id: "abb", mark }
              { id: "acc", mark }
            ]
            if search.length
              matches =
                for o in values when o.id.toLowerCase().includes search.toLowerCase()
                  o
              renderList matches, search
            else
              renderList values, search

        toolbar: [
          ['bold', 'underline', 'strike', 'code']
          [{ script: 'sub' },   { script: 'super' }]

          ['blockquote', 'code-block']
          [{ list: 'ordered' }, { list: 'bullet' }]
          [{ indent: '-1' },    { indent: '+1' }]

          [{ size: ['small', false, 'large', 'huge'] }]
          [{ header: [1, 2, 3, 4, 5, 6, false] }]
          [{ background: [false, 'Y0','Y1','Y2','Y4','Y6','Y8'] }
           { color:      [false, 'Y0','Y1','Y2','Y4','Y6','Y8'] }
          ]
          [{ align: [false, 'center', 'right'] }]
          ['kana']
          ['clean']
          ['link', 'image', 'video']
        ]
      placeholder: 'Insert text here ...'
      readOnly: false
      theme: 'bubble'

  props:
    is_ban:
      type: Boolean
      default: false
    is_warn:
      type: Boolean
      default: false

    maxSize:
      type: Number
      default: 100
    maxWord:
      type: Number
      default: 10
    maxRow:
      type: Number
      default: 1
    minRow:
      type: Number
      default: 1

    content: String
    value: String
    disabled:
      type: Boolean
      default: false

    options:
      type: Object
      required: false
      default: => {}

    globalOptions:
      type: Object
      required: false
      default: => {}

  mounted: ->
    @initialize()

  beforeDestroy: ->
    @quill = null
    delete @quill

  methods:
    initialize: ->
      return unless @$el && Quill
      @_options = { ...{}, ...@defaultOptions, ...@globalOptions, ...@options }
      @quill = new Quill @$refs.editor, @_options
      @quill.enable false

      if @value || @content
        @quill.pasteHTML @value || @content

      @quill.enable ! @disabled
      
      @quill.on 'selection-change', (range)=>
        if range
          @$emit 'focus', @quill
        else
          @$emit 'blur',  @quill

      @quill.on 'text-change', (delta, oldDelta, source)=>
        @change()

      @$emit 'ready', @quill

    change: _.debounce ->
      { @redo, @undo } = @quill.history.stack
      ops  = @quill.getContents()
      @text = @quill.getText()
      @html = @$refs.editor.children[0].innerHTML
      console.log { @redo, @undo, ops, @html, @text }
      @$emit 'input', @html
      @$emit 'change', { @html, @text, @quill }
    , 500,
      leading:  false
      trailing: true

    submit: _.debounce ->
      return if @ban
      @$emit 'submit', @value
    , 3000,
      leading:  true
      trailing: false

  computed:
    lines: ->
      @text.split("\n").length - 1
    words: ->
      @text.split(/[、。．.]\s*|\s+/).length - 1
    chars: ->
      @text.length - 1
    ban: ->
      ban = false
      ban ||= !(       2 <= @chars <= @maxSize )
      ban ||= !(       1 <= @words <= @maxWord )
      ban ||= !( @minRow <= @lines <= @maxRow )
      ban ||= @is_ban
      ban
    warn: ->
      warn = false
      warn ||= @value.match /-/
      warn ||= @is_warn
      warn

    mark: ->
      m = "mdi-check-circle-outline"
      m = "mdi-alert-circle-outline" if @warn
      m = "mdi-cancel"               if @ban
      [m]

  watch:
    content: quill_paste
    value:   quill_paste
    disabled: (newVal, oldVal)->
      return unless @quill
      @quill.enable ! newVal

</script>
<template lang="pug">
div
  div(ref="editor")
  div.form
    button(@click="submit" :class="{ ban, warn }")
      i.mdi(:class="mark" v-if="$listeners.submit")
      span
        | {{chars}}/
        sub {{maxSize}}字
        | {{words}}/
        sub {{maxWord}}文
        | {{lines}}/
        sub {{maxRow}}行
    slot
</template>

