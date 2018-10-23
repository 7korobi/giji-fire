_ = require "lodash"
{ State, Query, Format } = require "./index.coffee"

OBJ = ->
  new Object null

each = ({ depends }, from, process)->
  f() for f in depends
  switch from?.constructor
    when Array
      for item in from
        process(item)
    when Object
      for id, item of from
        item._id = id
        process(item)
  return

validate = (item, chklist)->
  return false unless item and chklist
  for chk in chklist when ! chk item
    return false
  true

$step = 0

module.exports = class Finder
  constructor: (@name)->
    State.step[@name.list] = ++$step

  calculate: (query, memory)->
    return unless query._step < State.step[@name.list]

    cache = _.cloneDeep @format
    @reduce @map, cache, query, memory
    return

  reduce: (map, cache, query, memory)->
    query._step = ++$step
    paths =
      _reduce:
        list: []
        hash: {}
    delete query._reduce
    for id in query._all_ids ? Object.keys memory
      continue unless o = memory[id]
      { item, $group } = o
      continue unless validate item, query._filters
      for [path, a] in $group
        o = paths[path] = cache[path]
        map.reduce query, path, item, o, a

    for path, o of paths
      map.finish query, path, o, @list
      _.set query, path, o

    for path, cmd of query.$sort when o = from = _.get(query, path)
      o = map.order query, path, o, cmd, @list, (target)=>
        @list.bless target, query
      o.from = from
      _.set query, path, o

  clear_cache: (all = null)->
    State.step[@name.list] = ++$step
    if all
      for id, { item } of all._memory
        @map.$deploy_sort @model, item, all
    return

  remove: (all, from)->
    { _memory } = all
    hit = false
    each @name, from, (item)=>
      @model.bless item
      old = _memory[item.id]
      if old?
        @model.delete old.item
        delete _memory[item.id]
        hit = true
    if hit?
      @clear_cache()

  reset: (all, from, parent)->
    { _memory } = all
    all._memory = news = OBJ()
    @merge all, from, parent

    for key, old of _memory
      item = news[key]
      unless item?
        @model.delete old

  merge: (all, from, parent)->
    { _memory } = all
    each @name, from, (item)=>
      o = @map.$deploy @model, @format, all, item, parent
      old = _memory[item.id]
      _memory[item.id] = o
      if old?
        @model.update item, old.item
      else
        @model.create item
        @model.rowid++
    @clear_cache()
