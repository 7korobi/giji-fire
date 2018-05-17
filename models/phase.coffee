{ Model, Query, Rule } = require "~/plugins/memory-record"


new Rule("phase").schema ->
  @path "folder", "book", "part"
  @has_many "chats"

  @scope (all)->
    {}

  @deploy ->

  class @model extends @model
    @map_reduce: (o, emit)->
      emit "group", o.group,
        count: 1
      emit "handle", o.handle,
        count: 1

    @order: (o, emit)->
      emit "list",
        sort: ["write_at"]
      emit "group",
        sort: ["count", "desc"]
      emit "handle",
        sort: ["count", "desc"]
