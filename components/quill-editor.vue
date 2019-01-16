<script lang="coffee">
_ = require 'lodash'

voice_chrs   = "がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゔゞガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴヷヸヹヺヾ"
devoice_chrs = "かきくけこさしすせそたちつてとはひふへほはひふへほうゝカキクケコサシスセソタチツテトハヒフヘホハヒフヘホウワヰヱヲヽ"
devoice = {}
for voice_chr, idx in voice_chrs
  devoice_chr = devoice_chrs[idx]
  devoice[voice_chr] = devoice_chr


if document?
  window.Quill = Quill = require('quill/quill').default
  Delta = require "quill-delta"
  normalizeUrl = require "normalize-url"

  Color = Quill.import 'attributors/class/color'
  Color.whitelist = ['Y0','Y1','Y2','Y4','Y6','Y8']

  Background = Quill.import 'attributors/class/background'
  Background.whitelist = ['Y0','Y1','Y2','Y4','Y6','Y8']

  Font = Quill.import 'attributors/class/font'
  Font.whitelist = ["monospace"]

  Size = Quill.import 'attributors/class/size'
  Size.whitelist = ["small", "large", "huge"]

  Keyboard = Quill.import 'modules/keyboard'
  Keyboard.DEFAULTS.bindings.tab.handler

  icons = Quill.import 'ui/icons'
  icons.italic = """<em>あ</em>"""
  icons.ruby = """<ruby data-ruby="るび">文字</ruby>"""
  icons.codeblock = icons.code = """<code>あ</code>"""
  icons.abbr = """<abbr>あ</abbr>"""
  icons.random = """🎲"""

  Inline = Quill.import 'blots/inline'
  Inline.order.push 'abbr'

  class ABBR extends Quill.import 'formats/code'
    @tagName: 'ABBR'
    @blotName: 'abbr'

  class RANDOM extends Quill.import 'blots/inline'
    @tagName: 'KBD'
    @blotName: 'random'
    @create: (value)->
      domNode = super.create value
      return domNode unless value?.length
      domNode.title = value
      domNode

    @value: (domNode)->
      domNode.title

    @formats: (domNode)->
      domNode.title

    constructor: (scroll, node)->
      super(scroll, node)

    format: (name, value)->
      if name == @statics.blotName && value?.length
        @domNode.title = value
      else
        super.format name, value


  class Ruby extends Quill.import 'blots/inline'
    @tagName:  'RUBY'
    @blotName: 'ruby'
    @create: (value)->
      domNode = super.create value
      return domNode unless value?.length
      domNode.dataset.ruby = value
      domNode

    @value: (domNode)->
      console.log "value"
      console.log domNode
      domNode.dataset.ruby

    @formats: (domNode)->
      console.log "formats"
      console.log domNode
      domNode.dataset.ruby

    constructor: (scroll, node)->
      super(scroll, node)

    format: (name, value)->
      if name == @statics.blotName && value?.length
        @domNode.dataset.ruby = value
      else
        super.format name, value

  require "quill-mention/dist/quill.mention.min"
  
  class mention extends Quill.import 'blots/embed'
    @tagName: 'q'
    @blotName: 'mention'
    @className: 'cite-bottom'

    @value: (node)-> node.dataset
    @setDataValues: null
    @create: (data)->
      node = super.create("#{data.mark}#{data.id}")
      node.setAttribute "cite", data.id
      node.innerText = "#{data.mark}#{data.id}"
      for key, val of data
        node.dataset[key] = val
      node

    constructor: (scroll, node)->
      super(scroll, node)
      console.log @

  Quill.register
    'formats/background': Background
    'formats/color': Color
    'formats/font': Font
    'formats/size': Size
    'formats/abbr': ABBR
    'formats/ruby': Ruby
    'formats/random':  RANDOM
    'formats/mention': mention
    'modules/keyboard': Keyboard

hashcode = (str)->
  hash = 5381
  at = str.length
  while at
    hash = (hash * 33) ^ str.charCodeAt --at
  hash >>> 0

quill_paste = (newVal, oldVal)->
  return unless @quill
  if newVal
    if newVal != @html
      @quill.clipboard.dangerouslyPasteHTML 0, @html = newVal
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

readFiles = (files, cb)->
  for file in files
    return unless file.type.match /^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i
  reader = new FileReader()
  reader.onload = (e)=>
    cb e.target.result
  blob =
    if file.getAsFile
      file.getAsFile()
    else
      file
  if blob instanceof Blob
    reader.readAsDataURL blob


module.exports =
  mixins: [
    require("~/plugins/browser-store")
      local:
        html: ""
  ]
  data: ->
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
          handler: ( range, files )=>
            images = await Promise.all files.map (file)=>
              new Promise (ok)=>
                reader = new FileReader()
                reader.onload = (e)=>
                  code = hashcode e.target.result
                  [ ext ] = file.name.match /\.[^.]+$/
                  id = "#{code.toString(36)}#{ext}"
                  @$emit "drop_image", { id, file }, (url)=>
                    console.log { id, url }
                    ok url
                reader.readAsDataURL file

            ops = new Delta()
            .retain range.index
            .delete range.length
            for image in images
              ops.insert { image }
            @quill.updateContents ops
            @quill.setSelection range.index + images.length
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

      if html = @value || @content || @html
        if @html
          @change()
        @quill.clipboard.dangerouslyPasteHTML 0, html

      @quill.enable ! @disabled

      @quill.on 'selection-change', (range)=>
        if range
          @$emit 'focus', @quill
        else
          @$emit 'blur',  @quill
        console.log range

      @quill.on 'text-change', ({ ops }, oldDelta, source)=>
        @change()
        return unless 1 <= ops?.length <= 2
        [{ retain }, ..., { insert }] = ops
        return unless insert
        return if insert.image

        if insert.match /^\s$/
          sel = @quill.getSelection()
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

    insert_file: ( dataUrl )->
      index = @quill.getSelection()?.index || @quill.getLength()
      @quill.insertEmbed index, 'image', dataUrl, 'user'
      @$emit "drop_image", file, (url)=>
        @image url, type


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
      @$emit 'change', { @html, @text, @quill }
    , 500,
      leading:  false
      trailing: true

    submit: _.debounce ->
      return if @ban
      delta  = @quill.getContents()

      @$emit 'submit', @value, { @attrs, @html, @text }
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
      ban ||= !( @value == @html )
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

