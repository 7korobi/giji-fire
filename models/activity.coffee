{ Set, Model, Query, Rule } = require 'memory-orm'

new Rule("marker").schema ->
  @scope (all)->
    own: ( uid )-> all.where { uid }

  class @model extends @model
    @map_reduce: (o, emit)->
      emit "mark_at", o.book_id,
        max: o.mark_at

    @order: (o, emit)->
      emit "mark_at",
        sort: ["max", "desc"]

      emit "list",
        sort: ["write_at", "desc"]
  
  @property 'model',
    anker:
      get: ->
        "-" + @id.split("-")[2..4].join("-")

new Rule("icon").schema ->
  @belongs_to "book"
  @belongs_to "potof"

  @scope (all)->
    own: ( _id )-> all.where { _id }
