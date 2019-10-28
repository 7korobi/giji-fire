{ Query } = require 'memory-orm'
{ on_horizon, path_by } = require "vue-petit-store"

module.exports = ->
  mixins: [
    path_by "id", [null, null, null, 'phase']
  ]
  props:
    current: Object

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

    bans:  Array
    warns: Array

  directives:
    horizon: on_horizon 'pos'

  data: ->
    pos: 'focus'

  computed:
    classname: ->
      if @id && @$el && "focus" == @pos
        @$emit "focus", @id
      handle = @handle || @phase?.handle
      [handle, @pos]

    for_body: ->
      handle = @classname[0]
      {
        class: @classname,
        handle,
        @current,
        @id, @face_id,
        @log, @data, @book, 
        @show, @head, @deco,
        @to,
        @bans, @warns,
      }

