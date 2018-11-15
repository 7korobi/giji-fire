<script lang="coffee">

quill_paste = (newVal, oldVal)->
  return unless @quill
  if newVal
    if newVal != @_content
      @quill.pasteHTML @_content = newVal
  else
    @quill.setText ''

module.exports =
  data: ->
    _options: {}
    _content: ''
    defaultOptions:
      modules:
        imageDrop: true
        imageResize: {}
          
        toolbar: [
          ['bold', 'italic', 'underline', 'strike']
          ['blockquote', 'code-block']
          [{ 'list': 'ordered' }, { 'list': 'bullet' }]
          [{ 'script': 'sub' }, { 'script': 'super' }]
          [{ 'indent': '-1' }, { 'indent': '+1' }]
          [{ 'size': ['small', false, 'large', 'huge'] }]
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }]
          [{ 'align': [] }]
          ['clean']
          ['link', 'image', 'video']
          ['kana']
        ]
      placeholder: 'Insert text here ...'
      readOnly: false
      theme: 'bubble'

  props:
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
        html = @$refs.editor.children[0].innerHTML
        text = @quill.getText()

        if '<p><br></p>' == html
          html = ''
        
        @_content = html
        console.log { delta, oldDelta, @_content }
        @$emit 'input', @_content
        @$emit 'change', { html, text, @quill }

      @$emit 'ready', @quill

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
  slot(name="toolbar")
</template>

