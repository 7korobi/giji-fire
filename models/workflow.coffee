{ Set, Model, Query, Rule } = require 'memory-orm'

new Rule("work_location").schema ->
  @property 'model',
    prefecture:
      get: ->
        @id.split("-")[0]

new Rule("work_country").schema ->
  @has_many "work_names"
  @deploy ->
    @q =
      search_words: @country.join(" ")
  @order "list", sort: ["country.length", "desc"]

idx = 0
new Rule("work_name").schema ->
  @belongs_to "work_country"
  @deploy ->
    ascii =
      if @spell
        @spell.normalize('NFKD').replace /[\u0300-\u036F]/g, ''
      else
        ""
    @_id = "#{@key}-#{++idx}"
    @spot = @mark || @key
    @work_country_id = @key
    @q =
      search_words: ["<#{@name}>", "<#{ascii}>"].join(" ")

  @scope (all)->
    by_page: (spot_id, search)->
      q =
        if spot_id != "all"
          all.partition "code.#{spot_id}.set"
        else
          all
      q.search search

  @order "spot_size", sort: ["count", "desc"]
  class @model extends @model
    @map_partition: (o, emit)->
      emit "code", o.key,
        set: o.id
      emit "spot", o.spot,
        set: o.id
        list: true
      emit "spot_size", o.spot,
        count: 1

    @order: (o, emit)->
      emit "spot", o.spot, "list",
        sort: [["side","name"], ["asc","asc"]]
