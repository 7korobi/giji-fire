{ Query } = require "memory-orm"
{ vuex } = require "~/plugins/vue-struct"
el = require "~/plugins/dom"

targets =
  diagram: 'marksvg'

  sow:  'sow'
  head: 'sow'
  mono: 'sow'

  dagre:   'sow'
  mermaid: 'sow'

  quill:  'quill'
  giji:   'quill'
  center: 'quill'



module.exports = ->
  props:
    current: Object

    id: String
    write_at: [Date, Number]

    sign: String
    head: String
    to: String

    face_id: String
    img_src: String

    handle: String
    deco:
      type: String
      default: "giji"
    log:
      type: String
      default: ""

    phases: Array
    edit:
      type: Boolean
      default: false

  mixins: [
    vuex 'menu.side', ['shows']
    require('~/plugins/markup-event')
  ]

  computed:
    el_adjust: el.adjust

    part_id: ->
      @current?.part_id

    anker: ->
      @chat?.anker @part_id

    chat: ->
      if @id
        Query.chats.find @id

    classname: ->
      { id } = @
      if id && "focus" == @el_adjust
        @$emit "focus", id
      [@handle, @el_adjust]

    edit_target: ->
      targets[@deco] + "-input"
    deco_target: ->
      targets[@deco] + "-view"
