{ Model, Query, Rule } = require "~/plugins/memory-record"

new Rule("part").schema ->
  @path "folder", "book"
  @has_many "sections"
  @has_many "phases"
  @has_many "cards"
  @has_many "stats"
  @has_many "chats"

  @scope (all)->
    {}

  class @model extends @model
    @order: (o, emit)->
      emit "list",
        sort: ["chats.list.0.0.write_at", "asc"]
