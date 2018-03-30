{ Set, Model, Query, Rule } = require "~/plugins/memory-record"

new Rule("card").schema ->
  @order "write_at"
  @path "folder", "book", "part", "potof"
  @belongs_to "role"

  Object.assign @model_property,
    stat:
      get: ->
        Query.stats.find("#{@potof_id}-#{@idx}")

  @scope (all)->
    for_part:  (part_id)->  all.where {  part_id }
    for_phase: (phase_id)-> all.where { phase_id }

new Rule("stat").schema ->
  @path "folder", "book", "part", "potof"
  @belongs_to "able"

  @deploy ->
    @able_id = @idx
  Object.assign @model_property,
    card:
      get: ->
        Query.stats.find("#{@potof_id}-#{@idx}")



new Rule("role").schema ->
  @habtm "ables"

  class @model extends @model
    @map_reduce: (o, emit)->
      emit "group", o.group,
        list: o


new Rule("trap").schema ->
  @order "write_at"
  @belongs_to "book"
  @belongs_to "potof"

new Rule("able").schema ->
  @habtm "roles", reverse: true

  class @model extends @model
    @map_reduce: (o, emit)->
      emit "group", o.group,
        list: o

Set.role.set require '../yaml/set_roles.yml'
Set.trap.set require '../yaml/set_traps.yml'
Set.able.set require '../yaml/set_ables.yml'
