{ Set, Model, Query, Rule } = require 'memory-orm'

new Rule("card").schema ->
  @path "folder", "book", "potof"
  @belongs_to "role"

  @property 'model',
    stat:
      get: ->
        Query.stats.find("#{@potof_id}-#{@idx}")

  @scope (all)->
    for_part:  (part_id)->  all.where {  part_id }
    for_phase: (phase_id)-> all.where { phase_id }

  @order "list", sort: ['write_at', 'desc']


new Rule("stat").schema ->
  @path "folder", "book", "potof"
  @belongs_to "able", key: "idx"

  @deploy ->
  @property 'model',
    card:
      get: ->
        Query.cards.find("#{@potof_id}-#{@idx}")



new Rule("role").schema ->
  @habtm "ables"

  class @model extends @model
    @map_reduce: (o, emit)->
      emit "group", o.group,
        list: true

new Rule("able").schema ->
  @habtm "roles", reverse: true

  class @model extends @model
    @map_reduce: (o, emit)->
      emit "group", o.group,
        list: true

Set.role.set require '../yaml/set_roles.yml'
Set.able.set require '../yaml/set_ables.yml'
