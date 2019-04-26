<style lang="sass">
button
  i.mdi
    font-size: 1.5em
    vertical-align: middle
</style>
<template lang="pug">
div
  article(ref="editor")
  hr.footnote
  div.form
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
</template>
<script lang="coffee">
_ = require 'lodash'
Delta = require "quill-delta"

if document?
  require '~/plugins/quill'

editor = require './editor'

quill_paste = (newVal, oldVal)->
  return unless @quill
  if newVal
    if newVal != @html
      @quill.clipboard.dangerouslyPasteHTML 0, @html = newVal
  else
    @quill.setText ''

module.exports = editor
  data: ->
    html: ""
    text: "\n"
    attrs: {}
    index:  0
    length: 0

    _options: {}
    defaultOptions:
      modules:
        history: true
        clipboard: true
        uploader: 
          handler: require("~/plugins/quill-uploader").bind @
        mention:
          dataAttributes: ['id', 'id', 'mark']
          isolateCharacter:   true
          fixMentionsToQuill: true
          allowedChars: /^\S+$/
          mentionDenotationChars: ["@","#","="]
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

        toolbar:
          container: [
            [{ list: 'ordered' }, { list: 'bullet' }]
            [{ indent: '-1' },    { indent: '+1' }]
            [{ header: [1, 2, 3, 4, 5, 6, false] }]
            ['blockquote']
            [{ align: '' }, { align: 'center' }, { align: 'right' }]

            ['clean']
            [{ size: ['small', false, 'large', 'huge'] }]
            [{ script: 'sub' }, { script: 'super' }]
            ['bold', 'underline', 'strike', 'abbr', 'code', 'random']
            ['ruby']
            ['image'] # ['formula', 'link', 'video']
            [{ kana: 'invert' }, { kana: 'none' }, { kana: 'half' }, { kana: 'full' }]
          ]
          handlers:
            kana: require '~/plugins/quill-kana'
            random: ->
              { index, length } = @quill.getSelection()
              random = @quill.getText(index, length)

              ops = new Delta()
              .retain index
              .delete length
              .insert "🎲", { random }
              @quill.updateContents ops
              
            ruby: ->
              return unless ruby = prompt("ふりがな")
              { index, length } = @quill.getSelection()
              text = @quill.getText(index, length)

              ops = new Delta()
              .retain index
              .delete length
              .insert text, { ruby }
              @quill.updateContents ops

      placeholder: @placeholder
      readOnly: false
      theme: 'bubble'

  props:
    content: String
    value: String

    placeholder:
      type: String
      default: '入力はこちらに。'

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
      @_options = _.merge {}, @defaultOptions, @globalOptions, @options
      @quill = new Quill @$refs.editor, @_options
      @quill.enable false

      if html = @value || @content || @html
        if html
          @change()
        @quill.clipboard.dangerouslyPasteHTML 0, html

      @quill.enable ! @disabled

      @quill.on 'selection-change', (range)=>
        @$emit 'selection', range, @quill

      @quill.on 'text-change', ({ ops }, oldDelta, source)=>
        @change()
        return unless 1 <= ops?.length <= 2
        [{ retain }, ..., { insert }] = ops
        return unless insert
        return if insert.image

        if insert.match /^\s$/ && sel = @quill.getSelection()
          # space input.
          [leaf] = @quill.getLeaf sel.index
          return unless leaf.text && leaf.parent.domNode.localName != 'a'
          insert = leaf.text
          index = sel.index - insert.length
        else
          # clipboard paste.
          index = retain ? 0

        return unless urlMatch = insert.match /([a-z]+ps?:\/\/[\S]+)|(www.[\S]+)|(mailto:[\S]+)|(tel:[\S]+)/
        index += urlMatch.index

        url = urlMatch[0]
        ops = new Delta()
        .retain index
        .delete url.length

        @insert_url ops, url

        @quill.updateContents ops

      @$emit 'ready', @quill

    insert_url: (ops, url)->
      link =
        if /([a-z]+ps?:\/\/[\S]+)|(www.[\S]+)/.test url
          normalizeUrl url,
            stripHash: false
            stripWWW:  false
        else
          url
      [__, protocol, ext] = link.match(/([^:]+):\/\/.+\.([^.]+)$/)

      switch ext
        when 'png', 'jpg', 'jpeg', 'gif'
          ops.insert { image: link }
        else
          ops.insert "#{protocol}:🔗", { link }

    change: _.debounce ->
      return unless @$refs
      return unless @quill
      { @redo, @undo } = @quill.history.stack
      delta  = @quill.getContents()
      @attrs = {}
      textlist =
        for op in delta.ops
          for attr, value of op.attributes when value?.length
            @attrs[attr] ?= []
            @attrs[attr].push value
          switch
            when 'string' == typeof op.insert
              op.insert
            when o = op.insert.mention
              "#{o.mark}#{o.id}"
      @text = textlist.join("")
      @html = @$refs.editor.children[0].innerHTML
      console.log { @redo, @undo, delta, @html, @text, @attrs }
      @$emit 'input', @html
    , 200,
      leading:  false
      trailing: true

  computed:
    meta: ->
      size = [
        @text.split("\n").length - 1
        @text.split(/[\!\?！？「」『』、。．.]+\s*|\s+/).length - 1
        @text.length - 1
      ]
      { @attrs, size }

  watch:
    content: quill_paste
    value:   quill_paste
    disabled: (newVal, oldVal)->
      return unless @quill
      @quill.enable ! newVal

</script>

