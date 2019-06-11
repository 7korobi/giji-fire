{ Model, Query, Rule } = require 'memory-orm'

new Rule("part").schema ->
  @path "folder", "book"
  @has_many "sections"
  @has_many "phases"
  @has_many "cards"
  @has_many "stats"
  @has_many "chats"

  @scope (all)->
    {}

  @order "list", sort: ["chats.list.0.0.write_at", "asc"]
