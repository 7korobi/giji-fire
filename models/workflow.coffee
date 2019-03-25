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
    @_id = "#{@key}-#{++idx}"
    @work_country_id = @key
    @ascii = @spell.normalize('NFKD').replace /[\u0300-\u036F]/g, ''
    @head = "<" + @name[..0]
    @tail = @name[-1..] +  ">"
    @q =
      search_words: ["<#{@name}>", "<#{@ascii}>"].join(" ")
  
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
