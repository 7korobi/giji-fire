{ Set, Model, Query, Rule } = require "memory-orm"

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
