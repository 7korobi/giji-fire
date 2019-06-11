
{ Set, Model, Query, Rule } = require 'memory-orm'

new Rule("sheet").schema ->
  @scope (all)->
  @deploy ->
  @property 'model',

  @order "list", sort: ["write_at", "desc"]
  class @model extends @model
    @map_reduce: (o, emit)->
