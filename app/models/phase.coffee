{ Model, Query, Rule } = require 'memory-orm'


new Rule("phase").schema ->
  @path "folder", "book", "part"
  @has_many "chats"

  @scope (all)->
    {}

  @deploy ->

  @order "list", sort: ["write_at"]
  @order "group", sort: ["count", "desc"]
  @order "handle", sort: ["count", "desc"]
  class @model extends @model
    @map_reduce: (o, emit)->
      emit "group", o.group,
        count: 1
      emit "handle", o.handle,
        count: 1
