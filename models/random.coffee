_ = require 'lodash'
{ Set, Model, Query, Rule } = require "~/plugins/memory-record"

new Rule("random").schema ->
  @scope (all)->
    deck: (type)->
      all.where({ type })

  @deploy ->
    t0 = @toString 0
    t1 = @toString 1
    @texts =
      if t0 != t1
        [t0, t1]
      else
        [t0]

  class @model extends @model
    @order: (o, emit)->
      emit "list",
        sort: ['ratio', 'desc']
      emit "type",
        sort: ['count', 'asc']

    @map_reduce: (o, emit)->
      emit "type", o.type,
        count: 1
      emit "ratio",
        count: 1
        all: o.ratio

    toString: (side = 1)->
      switch @type
        when 'chess'
          "#{@symbols[side]} #{["白","黒"][side]}#{@label}"

        when 'tarot'
          "#{["正","逆"][side]} #{@roman}.#{@label}"

        when 'zodiac'
          "#{@symbol} #{@roman}.#{@label}"

        when 'planet', 'weather'
          "#{@symbol} #{@label}"

        else
          "#{@label}"

Query.randoms.choice = (type)->
  { list, reduce } = @deck(type)
  at = _.random 0, reduce.ratio.all - 1
  o = undefined
  for o in list
    at -= o.ratio
    break if at < 0
  o.toString _.random 0, 1

type = "trump"
ratio = 1
for suite, idx1 in ["♢","♡","♣","♠"]
  for rank, idx2 in "A 2 3 4 5 6 7 8 9 10 J Q K".split(" ")
    label = "#{suite}#{rank}"
    suite_code = idx1 + 1
    number = idx2 + 1
    _id = 100 * suite_code + number
    Set.random.add { _id, type, ratio, number, suite, rank, label }

Set.random.add
  _id: 501
  type: "trump"
  ratio: 1
  number: 0
  suite: ""
  rank: ""
  label: "JOKER"

Set.random.add
  _id: 502
  type: "trump"
  ratio: 1
  number: 0
  suite: ""
  rank: ""
  label: "joker"

for type, o of require '../yaml/random.yml'
  for key, oo of o
    oo._id = "#{type}_#{key}"
    oo.type = type
    oo.ratio ?= 1
    Set.random.add oo
