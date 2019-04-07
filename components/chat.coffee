{ Query } = require 'memory-orm'
{ localStorage } = require "vue-petit-store"
el = require "~/plugins/dom"

module.exports = ->
  props:
    id:      String

    face_id: String
    img_src: String

    handle:  String

    log:  String
    show: String
    head: String
    deco: String
    to:   String


    phase_id: String

    current: Object
    data:    Object
    edit:    Object


  mixins: [
    localStorage "shows"
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
      if @id && "focus" == @el_adjust
        @$emit "focus", @id
      [@handle, @el_adjust]

    for_body: ->
      { @id, @label, @anker, @log, @show, @head, @deco, @to, @phase_id, @data, @edit, class: @classname }

