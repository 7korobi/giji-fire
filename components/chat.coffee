{ Query } = require 'memory-orm'
{ localStorage } = require "vue-petit-store"
el = require "~/plugins/dom"
edit = require '~/models/editor'

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

  cast: 'cast'


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
    localStorage "shows"
    require('~/plugins/markup-event')
  ]

  data: ->
    shows: [] # pin, toc, potof, current, search

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

    for_body: ->
      target = targets[@deco]
      if @edit
        value = @log
        { value, @part_id, @phases, class: @deco, edit, is: "#{target}-input" }
      else
        value = @log
        { value, class: @deco, is: "#{target}-view" }
