<script lang="coffee">
marked = require 'marked-pre'
{ Query } = require "~/plugins/memory-record"
{ url } = require "~/config/live.yml"


marked.InlineLexer.rules.breaks.strong = /^\[\[(?:[^\]]|[^\]]\]|\][^\]])+\]\](?!\])|^\_\_(?:[^\_]|[^\_]\_|\_[^\_])+\_\_(?!\_)|^\~\~(?:[^\~]|[^\~]\~|\~[^\~])+\~\~(?!\~)|^\*\*(?:[^\*]|[^\*]\*|\*[^\*])+\*\*(?!\*)|^\=\=(?:[^\=]|[^\=]\=|\=[^\=])+\=\=(?!\=)|^\+\+(?:[^\+]|[^\+]\+|\+[^\+])+\+\+(?!\+)|^\:\:(?:[^\:]|[^\:]\:|\:[^\:])+\:\:(?!\:)|^\-\-(?:[^\-]|[^\-]\-|\-[^\-])+\-\-(?!\-)/

itself = (o)-> o

class Renderer
  constructor: (@options)->

  code: (code, lang)->
    { m } = @options
    if lang
      lang = @options.langPrefix + lang
      m 'pre', {}, [
        m 'code', { class: lang }, code
      ]
    else
      m 'pre', {}, [
        m 'code', {}, code
      ]

  blockquote: (quote)->
    { m } = @options
    m 'blockquote', {}, quote

  paragraph: itself
  text: itself
  html: itself

  heading: (text, level, raw)->
    { m, headerIds, headerPrefix } = @options
    if headerIds
      id = headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-')
      m "h#{level}", { attrs: { id }}, text
    else
      m "h#{level}", {}, text

  hr: ->
    { m } = @options
    m 'hr'

  list: (body, ordered, start, taskList)->
    { m } = @options
    type =
      if ordered
      then "ol"
      else "ul"
    start = undefined unless ordered && start != 1
    m type,
      attrs: { start }
    , body

  listitem: (text, checked)->
    { m } = @options
    if checked?
      m 'li',
        attrs:
          class: 'task-list-item'
      , [
        m "input",
          attrs:
            type: 'checkbox'
            checked: checked
            class: 'task-list-item-checkbox'
        ...text
      ]
    else
      m 'li', {}, text

  table: (header, body)->
    { m } = @options
    ret = m 'table', {}, [
      m 'thead', {}, [header]
      m 'tbody', {}, body
    ]
    ret

  tablerow: (content)->
    { m } = @options
    m 'tr', {}, content

  tablecell: (content, flags)->
    { m } = @options
    tag =
      if flags.header
        'th'
      else
        'td'
    m tag,
      style:
        'text-align': flags.align
    , content

  # span level renderer
  strong: (text)->
    { m } = @options
    m 'strong',
      style:
        'display': 'inline'
        'text-emphasis': "sesame"
    , text

  codespan: (text)->
    { m } = @options
    m 'code', {}, text

  br: ->
    '\n'

  del: (text)->
    { m } = @options
    m 'del', {}, text

  note: (num, text, title)->
    { m } = @options
    m 'sup',
      attrs: { title, class: 'note' }
    , num

  link: (href, title, text)->
    { m } = @options
    [protocol, hostname] = href.split /// \:// | / | \? | \# ///g
    text  ||= protocol
    title ||= [protocol, hostname].join("\n")
    switch href
      when null, undefined, "", "#"
        m "q",
          attrs: { title }
        , text
      else
        m "b",
          attrs: { title, href, chk: 'confirm' }
        , text

  image: (src, title, alt)->
    unless title
      title = undefined
    { m } = @options
    m 'img',
      attrs: { src, alt, title }

  url: (href)->
    switch
      when Query.faces.find(href)
        "#{url.assets}/images/portrate/#{ href }.jpg"
      else
        href

  # markdown-it
  container: (text, lang)->
    { m } = @options
    m 'p',
      attrs:
        class: lang
    , text

  strikeout: (text)->
    { m } = @options
    m 's', {}, text

  span: (text)->
    { m } = @options
    m 'span', {}, text

  ins: (text)->
    { m } = @options
    m 'ins', {}, text

  kbd: (text)->
    { m } = @options
    m 'kbd', {}, text

  mdi: (name)->
    { m } = @options
    m 'i',
      attrs:
        class: "mdi #{name}"

  abbr: (text, title)->
    { m } = @options
    m 'ruby', {}, [
      text
      m 'rp', {}, ["《"]
      m 'rt', {}, title
      m 'rp', {}, ["》"]
    ]

  mark: (text)->
    { m } = @options
    m 'abbr', {}, text

  sup: (text)->
    { m } = @options
    m 'sup', {}, text

  sub: (text)->
    { m } = @options
    m 'sub', {}, text



options =
  renderer: new Renderer
  tag: 'article'
  ruby: true
  gfm: true
  tables: true
  indentCode: false
  taskLists: true
  breaks: true
  pedantic: false
  sanitize: true
  smartLists: true
  smartypants: true
  em: false

###
attrs = { current, show, id, face_id, write_at, sign, handle, deco, head, log, to }
m "c-" + attrs.show, { attrs, key, on: ctx.data.on }, ctx.children

Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // タグ名
      this.$slots.default // 子の配列
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})

.chat.report(@click="click" @input="input" :id="id" :key="id" :class="classname")
  .text(v-html="log_html" :class="deco")

  ||

n "div",
  key: @id
  staticClass: "chat report"
  class: @classname
  attrs:
    id: @id
  on:
    click: @click
    input: @input
, [
  n "div",
    staticClass: "text"
    class: @deco
    domProps:
      innerHTML: @_s @log_html
]
###

module.exports =
  props: ["value"]

  render: (m)->
    { value } = @
    if value
      options.m = m
      marked value, options
    else
      ''
</script>

<style lang="stylus" scoped>
</style>
