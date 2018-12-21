<script lang="coffee">
_ = require 'lodash'
voice_chrs   = "がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゔゞガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴヷヸヹヺヾ"
devoice_chrs = "かきくけこさしすせそたちつてとはひふへほはひふへほうゝカキクケコサシスセソタチツテトハヒフヘホハヒフヘホウワヰヱヲヽ"
devoice = {}
for voice_chr, idx in voice_chrs
  devoice_chr = devoice_chrs[idx]
  devoice[voice_chr] = devoice_chr


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
      link = @normalize url
      protocol = link.split(":")[0]

      ops = new Delta()
      .retain index + 1
      .delete url.length
      .insert "#{protocol}:🔗", { link }
      @quill.updateContents ops

  require "quill-mention/dist/quill.mention.min"
  class Mention extends Quill.import "modules/mention"
  class mention extends Quill.import 'blots/embed'
    @className: 'cite-bottom'
    @tagName: 'q'
    @blotName: 'mention'

    @value: (node)-> node.dataset
    @setDataValues: null
    @create: (data)->
      node = super.create("#{data.mark}#{data.id}")
      node.setAttribute "cite", data.id
      node.innerText = "#{data.mark}#{data.id}"
      for key, val of data
        node.dataset[key] = val
      node

  Quill.register
    'formats/background': Background
    'formats/color': Color
    'formats/font': Font
    'formats/size': Size
    'formats/link': Link
    'formats/code-block': CodeBlock
    'formats/mention': mention
    'modules/mention': Mention
    'modules/keyboard': Keyboard
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

selected_change = (quill, cb)->
  { index, length } = quill.getSelection()

  delta = new Delta()
  .retain index

  text_list =
    for { insert, attributes } in quill.getContents(index, length).ops when insert.length
      delta.delete insert.length

      insert = cb insert
      delta.insert insert, attributes
      insert

  quill.updateContents delta
  quill.setSelection index, text_list.join("").length

module.exports =
  data: ->
    _options: {}
    html: ''
    text: "\n"

    defaultOptions:
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

        toolbar:
          container: [
            ['blockquote', 'code-block']
            [{ list: 'ordered' }, { list: 'bullet' }]
            [{ indent: '-1' },    { indent: '+1' }]

            [{ size: ['small', false, 'large', 'huge'] }]
            [{ header: [1, 2, 3, 4, 5, 6, false] }]
            [{ background: [false, 'Y0','Y1','Y2','Y4','Y6','Y8'] }
             { color:      [false, 'Y0','Y1','Y2','Y4','Y6','Y8'] }
            ]
            [{ align: [false, 'center', 'right'] }]
            ['clean']
            ['link', 'image', 'video']
            ['bold', 'underline', 'strike', 'code']
            [{ script: 'sub' },   { script: 'super' }]
            [{ kana: 'invert' }, { kana: 'none' }, { kana: 'half' }, { kana: 'full' }]
            [{ palet: ["꧁꧂","†","𓆏","(｡ŏ﹏ŏ)","🀀🀁🀂🀃🀆🀅🀄🀇🀈🀉🀊🀋🀌🀍🀎🀏🀐🀑🀒🀓🀔🀕🀖🀗🀘🀙🀚🀛🀜🀝🀞🀟🀠🀡🀢🀣🀤🀥🀦🀧🀨🀩🀪🀫"] }]
          ]
          handlers:
            kana: (mode)->
              switch mode
                when 'invert'
                  # ひらがなをカタカナに、カタカナをひらがなに
                  selected_change @quill, (text)->
                    text.replace /([\u3041-\u3096])|([\u30a1-\u30f6])/g, (match, hira, kata)->
                      if hira
                        return String.fromCharCode hira.charCodeAt(0) + 0x60
                      if kata
                        return String.fromCharCode kata.charCodeAt(0) - 0x60
                when 'none'
                  selected_change @quill, (text)->
                    text = text.replace /([\u3099\u309a])/g, (match, cut)->
                      ""
                    text = text.replace /([\u3041-\u3096\u309d\309f\u30a1-\u30fa\u30fd\u30fe\u30ff])/g, (match, chr)->
                      devoice[chr] ? chr
                    text
                when 'half'
                  selected_change @quill, (text)->
                    text = text.replace /([\u3099\u309a])/g, (match, cut)->
                      ""
                    text = text.replace /([\u3041-\u3096\u309d\309f\u30a1-\u30fa\u30fd\u30fe\u30ff])/g, (match, chr)->
                      chr = devoice[chr] ? chr
                      chr + "\u309a"
                    text = text.replace /([はひふへほハヒフヘホ])[\u309a]/g, (match, chr)->
                      String.fromCharCode chr.charCodeAt(0) + 2
                    text
                when 'full'
                  selected_change @quill, (text)->
                    text = text.replace /([\u3099\u309a])/g, (match, cut)->
                      ""
                    text = text.replace /([\u3041-\u3096\u309d\309f\u30a1-\u30fa\u30fd\u30fe\u30ff])/g, (match, chr)->
                      chr = devoice[chr] ? chr
                      chr + "\u3099"
                    text = text.replace /([かきくけこさしすせそたちつてとはひふへほカキクケコサシスセソタチツテトハヒフヘホ])[\u3099]/g, (match, chr)->
                      String.fromCharCode chr.charCodeAt(0) + 1
                    text
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
      @_options = _.merge {}, @defaultOptions, @globalOptions, @options
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
        console.log range

      @quill.on 'text-change', (delta, oldDelta, source)=>
        @change()

      @$emit 'ready', @quill

    change: _.debounce ->
      { @redo, @undo } = @quill.history.stack
      delta  = @quill.getContents()
      textlist =
        for op in delta.ops
          switch
            when 'string' == typeof op.insert 
              op.insert
            when o = op.insert.mention
              "#{o.mark}#{o.id}"
      @text = textlist.join("")
      @html = @$refs.editor.children[0].innerHTML
      console.log { @redo, @undo, delta, @html, @text }
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
  hr.footnote
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

