{ Query } = require 'memory-orm'
{ localStorage } = require "vue-petit-store"
el = require "~/plugins/dom"

module.exports = ->
  props:
    current: Object
    target:  Object
    edit:    Object

    id:      String

    face_id: String
    img_src: String

    handle:  String

    log:  String
    data: Object

    show: String
    head: String
    deco: String
    to:   String

    phase_id: String


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
      o = {
        @edit, class: @classname,
        @id, @label, @anker, @log, @data, @show, @head, @deco, @to, @phase_id
      }
      o.target = @target ? o
      o

