{ Query } = require 'memory-orm'
{ localStorage } = require "vue-petit-store"
el = require "~/plugins/dom"

targets =
  diagram: 'diagram'

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
    edit: Object

    id: String
    write_at: [Date, Number]

    phase_id: String
    show: String
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
    
    label: ->
      ""

    classname: ->
      { id } = @
      if id && "focus" == @el_adjust
        @$emit "focus", id
      [@handle, @el_adjust]

    for_body: ->
      target = targets[@deco]
      value = @log
      if @edit
        { value, @log, @show, @head, @deco, @phase_id, @edit, class: @deco, is: "#{target}-input" }
      else
        { value, class: @deco, is: "#{target}-view" }
