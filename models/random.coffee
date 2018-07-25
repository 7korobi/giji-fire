{ Set, Model, Query, Rule } = require "~/plugins/memory-record"

new Rule("card").schema ->
  @order "write_at"
  @path "folder", "book", "potof"
  @belongs_to "role"

  @property 'model',
    stat:
      get: ->
        Query.stats.find("#{@potof_id}-#{@idx}")

  @scope (all)->
    for_part:  (part_id)->  all.where {  part_id }
    for_phase: (phase_id)-> all.where { phase_id }

new Rule("tarot").schema ->
new Rule("trump").schema ->

for suite, idx1 in ["♣","♦","♥","♠"]
  for rank, idx2 in "A 2 3 4 5 6 7 8 9 10 J Q K".split(" ")
    label = "#{suite}#{rank}"
    suite_code = idx1 + 1
    number = idx2 + 1
    _id = 100 * suite_code + number
    Set.trump.add { _id, number, suite, rank, label }

Set.trump.add
  _id: 501
  number: 0
  suite: ""
  rank: ""
  label: "JOKER"

Set.trump.add
  _id: 502
  number: 0
  suite: ""
  rank: ""
  label: "joker"

Set.tarot.set require '../yaml/rand_tarot.yml'
