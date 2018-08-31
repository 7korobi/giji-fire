{ Query } = require "~/plugins/memory-record"
{ vuex_value } = require '~/plugins/struct'
el = require "~/plugins/dom"

targets =
  diagram: 'g-marksvg'
  giji:   'g-marked'
  center: 'g-marked'
  sow:  'g-sow'
  head: 'g-sow'
  mono: 'g-sow'

  dagre: 'g-sow'
  mermaid: 'g-sow'


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

    edit:
      type: Boolean
      default: false

  methods:
    input: ({ target })->
      { type, value } = target.attributes
      if type && type.value == 'checkbox'
        @$emit "check", target.checked

    click: ({ target })->
      { cite, href, chk, src, alt } = target.attributes
      if cite
        if chat = Query.chats.sow_cite cite.value
          @$emit "anker", ...chat.make_ankers @id

      if href
        url = href.value
        check = chk?.value
        if check == "confirm" && confirm "open?\n#{url}"
          open url, "_blank"

  computed: {
    ...vuex_value 'menu.side',['shows']
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

    deco_target: ->
      targets[@deco]
  }
