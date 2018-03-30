_ = require "lodash"
{ Query } = require "./index.coffee"

matrix =
  map: (cb)->
    list = []
    for a in @ when a
      for item in a
        list.push cb item
    list

module.exports = class Map
  @bless: (o)->
    o.__proto__ = @::
    o

  @$deploy: (model, format, all, item, parent)->
    o = { item, $group: [] }

    model.$deploy item, parent

    emit # for uglifyjs dummy.
    emit = (keys..., cmd)=>
      path = ["_reduce", keys...].join('.')
      o.$group.push [path, cmd]
      map = format[path] ?= {}
      @init map, cmd
    emit
      list: item
      set:  item.id
    model.map_reduce item, emit

    emit = (keys..., cmd)->
      path = ["_reduce", keys...].join('.')
      all.$sort[path] = cmd
    emit "list", {}
    model.order item, emit
    o

  @init: (o, map)->
    if map.id
      o.id = map.id
    if map.list
      o.list = []
    if map.count
      o.count = 0
    if map.all
      o.all = 0
    if map.set
      o.hash = {}

  @order: (from, map, set)->
    o = from
    if Object == from.constructor
      if map.belongs_to
        for id, val of from
          val.__proto__ = Query[map.belongs_to].find id
      else
        for id, val of from
          val.id = id

    else
      if map.belongs_to
        o = from.map (val)->
          Query[map.belongs_to].find val.id

    if map.sort
      o = _.orderBy o, map.sort...
    
    if map.pluck
      o = o.map (val)->
        _.get val, map.pluck

    if per = map.page_by
      idx = 0
      from = o
      groups = Object.values _.groupBy o, (o)->
        Math.floor(idx++ / per)
      groups.all = idx
      o = groups
      o.page_idx = (item)->
        for a, page_idx in @ when item in a
          return page_idx
        null
      Object.assign o, matrix
      o.__proto__ = set::
      for a in o when a
        a.__proto__ = set::

    if map.index
      counts = []
      for key, oo of o
        idx = _.get oo, map.index
        counts[idx] ?= []
        counts[idx].push oo
      o = counts
      Object.assign o, matrix
      o.__proto__ = set::
      for a in o when a
        a.__proto__ = set::

    o.from = from
    o.__proto__ = set::
    o

  @finish: (o, query, set)->
    if o.hash
      o.set = Object.keys o.hash
    if o.count && o.pow?
      o.avg = o.all ** (1 / o.count)
    if o.count && o.all?
      o.avg = o.all * (1 / o.count)
    if o.min? && o.max?
      o.range = o.max - o.min
      if o.all
        o.density = o.all / o.range

  @reduce: (item, o, map)->
    if map.count
      o.count += map.count
    if map.all
      o.all += map.all
    if map.pow
      o.pow *= map.pow

    if map.list
      o.list.push map.list

    if map.set
      o.hash[map.set] = item

    if map.max
      unless map.max <= o.max
        o.max_is = item
        o.max = map.max
    if map.min
      unless o.min <= map.min
        o.min_is = item
        o.min = map.min
