{ Query } = require 'memory-orm'
{ on_horizon } = require "vue-petit-store"

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
    book: Object

    show: String
    head: String
    deco: String
    to:   String

    phase_id: String

  directives:
    horizon: on_horizon 'pos'

  data: ->
    pos: 'focus'

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

    # directives data reset after mounted.
    classname: ->
      if @id && @$el && "focus" == @pos
        @$emit "focus", @id
      [@handle, @pos]

    for_body: ->
      o = {
        @book,
        @edit, class: @classname,
        @id, @label, @anker, @log, @data, @show, @head, @deco, @to, @phase_id
      }
      o.target = @target ? o
      o

