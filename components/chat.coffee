{ Query } = require 'memory-orm'
{ horizon } = require '~/plugins/observer'

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

  directives:
    horizon: horizon 'pos'

  data: ->
    pos: 'focus'
    shows: [] # pin, toc, potof, current, search

  computed:
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
      if @id && "focus" == @pos
        @$emit "focus", @id
      [@handle, @pos]

    for_body: ->
      o = {
        @edit, class: @classname,
        @id, @label, @anker, @log, @data, @show, @head, @deco, @to, @phase_id
      }
      o.target = @target ? o
      o

