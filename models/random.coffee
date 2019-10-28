_ = require 'lodash'
{ Set, Model, Query, Rule, State } = require 'memory-orm'

new Rule("random").schema ->
  @scope (all)->
    deck: (type)->
      all
      .partition "type.from.#{type}.set"

  @deploy ->
    t0 = @toString 0
    t1 = @toString 1
    @texts =
      if t0 != t1
        [t0, t1]
      else
        [t0]


  @order "list", sort: ['ratio', 'desc']
  @order "type", sort: ['count', 'asc']
  @order "label", sort: ['list.length', 'desc']
  class @model extends @model
    @update: (newVal, oldVal)->
      console.warn { newVal, oldVal }

    @map_reduce: (o, emit)->
      emit
        set: o.id
      for type in o.types
        emit "type", type,
          set: o.id
          count: 1

      emit "label", ( o.name || o.label ),
        list: true

      emit "ratio",
        count: 1
        all: o.ratio

    toString: (side = _.random 0, 1)->
      switch @types[0]
        when 'tarot'
          "#{["正","逆"][side]} #{@roman}.#{@label}"

        when 'zodiac'
          "#{@symbol} #{@roman}.#{@label}"

        when 'planet', 'weather', 'chess'
          "#{@symbol} #{@label}"

        else
          "#{@label}"

# scope without cache
Query.randoms.choice = (type)->
  { list, reduce } = @deck(type)
  at = Math.random() * reduce.ratio.all
  o = undefined
  for o in list
    at -= o.ratio
    if at < 0
      return o

romans = "I II III IV V VI VII VIII IX X XI XII XIII XIV XV XVI XVII XVIII XIX XX XXI".split(" ")

State.transaction ->
  for type, o of require '../yaml/random.yml'
    order = 0
    for key, oo of o
      order++
      oo.types ||= []
      oo.types.push type
      oo.ratio ?= 1
      oo.label ?= key
      oo.name  ?= key
      oo._id = (oo.name || oo.label || key).replace(/ /g, "")
      oo.order = order
      if ['zodiac', 'tarot'].includes type
        oo.roman = romans[order]
      Set.random.add oo

  ratio = 1
  types = ["eto"]
  now_year = new Date().getFullYear()
  for idx in [0...60]
    eto10 = "甲乙丙丁戊己庚辛壬癸"[idx % 10]
    eto12 = "子丑寅卯辰巳午未申酉戌亥"[idx % 12]
    a = Query.randoms.where(label: eto10).list[0]
    b = Query.randoms.where(label: eto12).list[0]
    name = "#{a.name.replace /と$/,"との" }#{b.name}"
    year = idx + 1984
    order = idx + 1

    _id = label = "#{eto10}#{eto12}"
    Set.random.add { _id, order, types, ratio, label, name, year }

  types = ["trump"]
  for suite, idx1 in ["♢","♡","♣","♠"]
    for rank, idx2 in "A 2 3 4 5 6 7 8 9 10 J Q K".split(" ")
      label = "#{suite}#{rank}"
      suite_code = idx1 + 1
      number = idx2 + 1
      _id = order = 100 * suite_code + number
      Set.random.add { _id, order, types, ratio, number, suite, rank, label }

  Set.random.add
    _id: 501
    order: 501
    types: ["trump"]
    ratio: 1
    number: 0
    suite: ""
    rank: ""
    label: "JOKER"

  Set.random.add
    _id: 502
    order: 502
    types: ["trump"]
    ratio: 1
    number: 0
    suite: ""
    rank: ""
    label: "joker"

, Query.static.meta
