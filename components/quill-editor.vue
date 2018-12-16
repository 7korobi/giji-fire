<script lang="coffee">

mention      = require "quill-mention"
{ ImageDrop } = require "quill-image-drop-module"
magic_url    = require("quill-magic-url").default
autoformat   = require("quill-autoformat").default
image_resize = require("quill-image-resize-module").default

Quill.register
  'modules/mention':    mention
  'modules/magicUrl':  magic_url
  'modules/autoformat': autoformat
  'modules/imageDrop': ImageDrop
  'modules/imageResize': image_resize

console.log { mention, magic_url, autoformat, ImageDrop, image_resize }
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
      modules:
        imageDrop: true
        imageResize: {}
        history: true
        clipboard: true
        autoformat: true
        toolbar: [
          ['bold', 'italic', 'underline', 'strike']
          ['blockquote', 'code-block']
          [{ list: 'ordered' }, { list: 'bullet' }]
          [{ script: 'sub' },   { script: 'super' }]
          [{ indent: '-1' },    { indent: '+1' }]
          [{ size: ['small', false, 'large', 'huge'] }]
          [{ header: [1, 2, 3, 4, 5, 6, false] }]
          [{ align: [] }]
          ['clean']
          ['link', 'image', 'video']
#          ['kana']
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
        @text = @quill?.getText()
        @html = @$refs.editor.children[0].innerHTML
        console.log { delta, oldDelta, @html, @text }
        @$emit 'input', @html
        @$emit 'change', { @html, @text, @quill }

      @$emit 'ready', @quill

    submit: _.debounce ->
      return if @ban
      @$emit 'submit', @value
    , 3000,
      leading: true
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

<style lang="sass">
body
  .ql-container
    font-family: inherit
    font-size: inherit
    overflow-y: visible
    margin:  0
    padding: 0

  .ql-editor
    line-height: inherit
    overflow-y: visible
    margin:  0
    padding: 0
</style>

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

