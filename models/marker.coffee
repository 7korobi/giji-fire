{ Set, Model, Query, Rule } = require "memory-orm"

new Rule("marker").schema ->
  @scope (all)->
    own: ( uid )-> all.where { uid }

  class @model extends @model
    @order: (o, emit)->
      emit "list",
        sort: ["write_at", "desc"]
