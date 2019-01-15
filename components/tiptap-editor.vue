<script lang="coffee">
_ = require 'lodash'
{
  Editor
  EditorContent
  EditorMenuBar
  EditorMenuBubble
  EditorFloatingMenu
  Node
  Mark
} = require 'tiptap'
{
  markInputRule
  wrappingInputRule
  setBlockType
  toggleWrap
  toggleMark
} = require 'tiptap-commands'
{
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Strike,
  Underline,
  History,
} = require 'tiptap-extensions'
{ default: TodoItemVue } = require '~/components/todo-item.vue'

class KBD extends Mark
  commands: ({ type })->
    console.log { type }
    toggleMark type
Object.defineProperties KBD::,
  name:
    get: -> 'kbd'
  schema:
    get: ->
      parseDOM: [
        tag: 'kbd'
      ]
      toDOM: ->
        ['kbd', 0]

Object.defineProperties TodoItem::,
  view:
    get: -> TodoItemVue

console.log TodoItem::view

voice_chrs   = "がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゔゞガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴヷヸヹヺヾ"
devoice_chrs = "かきくけこさしすせそたちつてとはひふへほはひふへほうゝカキクケコサシスセソタチツテトハヒフヘホハヒフヘホウワヰヱヲヽ"
devoice = {}
for voice_chr, idx in voice_chrs
  devoice_chr = devoice_chrs[idx]
  devoice[voice_chr] = devoice_chr


if false
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

  class RUBY
    @tagName:  'RUBY'
    @blotName: 'ruby-container'

  class RT extends Quill.import 'blots/inline'
    @tagName:  'RT'
    @blotName: 'ruby'
    @register: ->
      Quill.register RUBY

  RT.requiredContainer = RUBY
  RUBY.allowedChildren = [
    RT
    Quill.import 'blots/text'
    Quill.import 'blots/break'
  ]

  class Ruby extends Quill.import 'blots/inline'
    @tagName:  'RUBY'
    @blotName: 'ruby'
    @className: 'ql-ruby'
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
      console.log @

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
    'formats/ruby': RT
    'formats/kbd':  KBD
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
        html: "<p></p>"
  ]
  components: {
    EditorContent
    EditorMenuBar
    EditorMenuBubble
    EditorFloatingMenu
    Icon:
      functional: true
      props: ["name"]
      render: (m, { props })->
        { name } = props
        if name
          svg = require "~/assets/icons/#{name}.svg"
          m "p",
            domProps:
              innerHTML: svg
        else
          ''


  }
  data: ->
    text: "\n"
    json: []
    index:  0
    length: 0
    editor: null

    _options: {}
    defaultOptions:
      modules:
        history: true
        clipboard: true
        uploader:
          handler: ( range, files )=>
            images = await Promise.all files.map (file)->
              new Promise (ok)=>
                reader = new FileReader()
                reader.onload = (e)=>
                  code = hashcode e.target.result
                  [ ext ] = file.name.match /\.[^.]+$/
                  id = "#{code.toString(36)}#{ext}"
                  console.log { code, ext, id }
                  ok e.target.result
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
            ['codeblock','blockquote']
            [{ list: 'ordered' }, { list: 'bullet' }]
            [{ indent: '-1' },    { indent: '+1' }]

            [{ size: ['small', false, 'large', 'huge'] }]
            [{ header: [1, 2, 3, 4, 5, 6, false] }]
            [{ background: [false, 'Y0','Y1','Y2','Y4','Y6','Y8'] }
             { color:      [false, 'Y0','Y1','Y2','Y4','Y6','Y8'] }
            ]
            [{ align: [false, 'center', 'right'] }]
            ['clean']
#            ['formula']
#            ['link', 'image', 'video']
            ['bold', 'underline', 'strike', 'code']
            [{ script: 'sub' },   { script: 'super' }]
            ['kbd']
            ['ruby']
            ['italic']
            [{ kana: 'invert' }, { kana: 'none' }, { kana: 'half' }, { kana: 'full' }]
#            [{ palet: ["꧁꧂","†","𓆏","(｡ŏ﹏ŏ)","🀀🀁🀂🀃🀆🀅🀄🀇🀈🀉🀊🀋🀌🀍🀎🀏🀐🀑🀒🀓🀔🀕🀖🀗🀘🀙🀚🀛🀜🀝🀞🀟🀠🀡🀢🀣🀤🀥🀦🀧🀨🀩🀪🀫"] }]
          ]
          handlers:
            kbd: ->
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
    html = @value || @content || @html

    @editor = new Editor
      content: html
      editable: ! @disabled
      autoFocus: false
      useBuiltInExtensions: true
      dropCursor: {}
      extensions: [
        new History()

        new Blockquote()
        new CodeBlock()
        new HardBreak()
        new Heading( levels: [1, 2, 3, 4, 5, 6] )
        new BulletList()
        new OrderedList()
        new ListItem()
        new TodoItem()
        new TodoList()

        new KBD()
        new Code()
        new Bold()
        new Italic()
        new Link()
        new Strike()
        new Underline()

        new Table()
        new TableHeader()
        new TableCell()
        new TableRow()
      ]
      onInit: ({ state, view })=>
        console.log 'onInit', { state, view }
        @$emit 'ready', {}
      onFocus: ({ event, state, view })=>
        console.log 'onFocus', { event, state, view }
        @$emit 'focus', {}
      onBlur: ({ event, state, view })=>
        console.log 'onBlur', { event, state, view }
        @$emit 'blur', {}
      onUpdate: (o)=>
        @change(o)

  beforeDestroy: ->
    @editor.destroy()

  methods:
    insert_file: ( dataUrl )->
      index = @quill.getSelection()?.index || @quill.getLength()
      @quill.insertEmbed index, 'image', dataUrl, 'user'

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

    change: _.debounce ({ getHTML, getJSON, state, transaction })->
      @html = getHTML()
      @json = getJSON()

      @$emit 'input', @html
      @$emit 'change', { @html, @json, @text, state }
      console.log { @html, @json, @text, state }
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
<style lang="sass" scoped>
.form
  position: relative

  .menubar,
  .bubble,
  .float
    transition: opacity 0.2s, visibility 0.2s
    cursor: pointer
    opacity: 0
    visibility: hidden

  .menubar.active,
  .bubble.active,
  .float.active
    opacity: 1
    visibility: visible

  .bubble,
  .float
    position: absolute
    display: flex
    z-index: 20

  .bubble
    padding: .3rem
    margin: 0 0 0.5rem 0
    transform: translateX(-50%)

  .float
    margin: -0.25rem 0 0 0.5rem

span
  margin: 0 .5ex

button
  i.mdi
    font-size: 1.5em
    vertical-align: middle
</style>
<style lang="sass">
.ProseMirror
  td
    border: 1px dotted
button
  p, svg
    width: 1rem
</style>
<template lang="pug">
div.form
  editor-menu-bubble(:editor="editor")
    label.bubble(slot-scope="{ commands, isActive, menu }" :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`" :class="{ active: menu.isActive }")
      span
        button(:class="{ 'active': isActive.bold() }" @click="commands.bold")
          icon(name="bold")
        button(:class="{ 'active': isActive.italic() }" @click="commands.italic")
          em 字
        button(:class="{ 'active': isActive.strike() }" @click="commands.strike")
          s 字
        button(:class="{ 'active': isActive.underline() }" @click="commands.underline")
          u 字
        button(:class="{ 'active': isActive.code() }" @click="commands.code")
          code 字

  editor-floating-menu(:editor="editor")
    label.float(slot-scope="{ commands, isActive, menu }" :style="`top: ${menu.top}px;`" :class="{ active: menu.isActive }")
      span
        button(:class="{ 'active': isActive.paragraph() }" @click="commands.paragraph")
          icon(name="paragraph")
        button(:class="{ 'active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1 })")
          | H1
        button(:class="{ 'active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 2 })")
          | H2
        button(:class="{ 'active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 3 })")
          | H3
        button(:class="{ 'active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 4 })")
          | H4
        button(:class="{ 'active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 5 })")
          | H5
        button(:class="{ 'active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 6 })")
          | H6
        button(:class="{ 'active': isActive.bullet_list() }" @click="commands.bullet_list")
          icon(name="ul")
        button(:class="{ 'active': isActive.ordered_list() }" @click="commands.ordered_list")
          icon(name="ol")
        button(:class="{ 'active': isActive.blockquote() }" @click="commands.blockquote")
          icon(name="quote")
        button(:class="{ 'active': isActive.code_block() }" @click="commands.code_block")
          code 字

  editor-content(:editor="editor")
  hr.footnote
  editor-menu-bar(:editor="editor")
    div.menubar(slot-scope="{ commands, isActive, focused }" :class="{ active: true || focused }")
      button(@click="submit" :class="{ ban, warn }")
        i.mdi(:class="mark" v-if="$listeners.submit")
        span
          | {{chars}}/
          sub {{maxSize}}字
          | {{words}}/
          sub {{maxWord}}文
          | {{lines}}/
          sub {{maxRow}}行

      span
        button(@click="commands.undo")
          icon(name="undo")
        button(@click="commands.redo")
          icon(name="redo")
      span
        button(:class="{ 'active': isActive.bold() }" @click="commands.bold")
          icon(name="bold")
        button(:class="{ 'active': isActive.italic() }" @click="commands.italic" style="margin: -1rem 0")
          em 字
        button(:class="{ 'active': isActive.strike() }" @click="commands.strike")
          s 字
        button(:class="{ 'active': isActive.underline() }" @click="commands.underline")
          u 字
        button(:class="{ 'active': isActive.code() }" @click="commands.code")
          code 字
        button(:class="{ 'active': isActive.kbd() }" @click="commands.kbd")
          kbd 🎲
      span
        button(:class="{ 'active': isActive.paragraph() }" @click="commands.paragraph")
          icon(name="paragraph")
        button(:class="{ 'active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1 })")
          | H1
        button(:class="{ 'active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 2 })")
          | H2
        button(:class="{ 'active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 3 })")
          | H3
        button(:class="{ 'active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 4 })")
          | H4
        button(:class="{ 'active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 5 })")
          | H5
        button(:class="{ 'active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 6 })")
          | H6
        button(:class="{ 'active': isActive.bullet_list() }" @click="commands.bullet_list")
          icon(name="ul")
        button(:class="{ 'active': isActive.ordered_list() }" @click="commands.ordered_list")
          icon(name="ol")
        button(:class="{ 'active': isActive.todo_list() }" @click="commands.todo_list")
          icon(name="checklist")
        button(:class="{ 'active': isActive.blockquote() }" @click="commands.blockquote")
          icon(name="quote")
        button(:class="{ 'active': isActive.code_block() }" @click="commands.code_block")
          icon(name="code")
      span
        button(@click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })")
          icon(name="table")

      span(v-if="isActive.table()")
        button(@click="commands.deleteTable")
          icon(name="delete_table")
        button(@click="commands.addColumnBefore")
          icon(name="add_col_before")
        button(@click="commands.addColumnAfter")
          icon(name="add_col_after")
        button(@click="commands.deleteColumn")
          icon(name="delete_col")
        button(@click="commands.addRowBefore")
          icon(name="add_row_before")
        button(@click="commands.addRowAfter")
          icon(name="add_row_after")
        button(@click="commands.deleteRow")
          icon(name="delete_row")
        button(@click="commands.toggleCellMerge")
          icon(name="combine_cells")

</template>

