{ Model, Query, Rule } = require "~/plugins/memory-record"

format =
  head: new Intl.DateTimeFormat 'ja-JP',
    weekday: "short"
    hour:    "2-digit"
  tail: new Intl.DateTimeFormat 'ja-JP',
    hour:    "2-digit"

new Rule("section").schema ->
  @order "write_at"
  @path "folder", "book", "part"
  @has_many "chats"

  @scope (all)->
    {}

  @deploy ->
    @label ?= @idx

  Object.assign @model_property,
    label:
      get: ->
        begin = format.head.format @begin_at
        write = format.head.format @write_at
        if begin == write
          begin
          
        else
          write = format.tail.format @write_at
          begin
          .replace "時", "-" + write
