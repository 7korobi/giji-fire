{ Set, Model, Query, Rule } = require 'memory-orm'

new Rule("work_country").schema ->
  @has_many "work_names"
  @deploy ->
    @q =
      search_words: @country.join(" ")
  class @model extends @model
    @order: (o, emit)->
      emit "list",
        sort: ["country.length", "desc"]

idx = 0
new Rule("work_name").schema ->
  @belongs_to "work_country"
  @deploy ->
    ascii = @spell.normalize('NFKD').replace /[\u0300-\u036F]/g, ''
    @_id = "#{@key}-#{++idx}"
    @work_country_id = @key
    @q =
      search_words: ["<#{@name}>", "<#{ascii}>"].join(" ")

  @scope (all)->
    by_page: (spot_id, search)->
      q =
        if spot_id != "all"
          all.partition "spot.#{@spot_id}.set"
        else
          all
      q.search search

  class @model extends @model
    @map_partition: (o, emit)->
      emit "spot", o.key,
        set: o.id
        list: true
      emit "spot_size", o.key,
        count: 1

    @order: (o, emit)->
      emit "spot", o.key, "list",
        sort: ["name", "asc"]
      emit "spot_size",
        sort: ["count", "desc"]
