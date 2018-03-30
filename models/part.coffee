{ Model, Query, Rule } = require "~/plugins/memory-record"

new Rule("part").schema ->
  @order "chats.list.0.write_at"
  @path "folder", "book"
  @has_many "sections"
  @has_many "phases"
  @has_many "cards"
  @has_many "stats"
  @has_many "chats"

  @scope (all)->
    {}
