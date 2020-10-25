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
  @order 'summary', sort: ['count', 'desc'], belongs_to: 'roles'

  class @model extends @model
    @map_reduce: (o, emit)->
      emit "summary", o.id,
        count: 1
      emit "group", o.group,
        count: 1
        list: true
      clan = 
        switch o.group
          when undefined, null, '', 'SPECIAL', 'TURN'
            null
          when 'EVENT', 'GIFT', 'LIVE'
            o.group
          else
            "MAIN"
      if clan
        emit "clan", clan,
          count: 1
        if o.win
          emit "clan", clan, o.win,
            count: 1
      if o.win
        emit "win", o.win,
          count: 1

new Rule("able").schema ->
  @habtm "roles", reverse: true

  class @model extends @model
    @map_reduce: (o, emit)->
      emit "group", o.group,
        list: true

Set.role.set require '../../../giji/app/yaml/set_roles.yml'
Set.able.set require '../../../giji/app/yaml/set_ables.yml'
