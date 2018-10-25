_ = require "lodash"
# { State } = require "./index.coffee"

OBJ = ->
  new Object null

set_for = (list)->
  set = OBJ()
  for key in list
    set[key] = true
  set

query_parser = (base, req, cb)->
  return base unless req

  new Query base, ->
    @_filters = base._filters.concat()
    switch req && req.constructor
      when Object
        for key, val of req
          cb @, key, val, _.property key

      when Function, Array, String
        cb @, null, req, (o)-> o
      else
        console.log { req }
        #throw Error 'unimplemented'


module.exports = class Query
  @build: ->
    _all_ids = _group = null
    _filters = []
    $sort = {}
    $partition = ["set"]
    new Query { _all_ids, _group, _filters, $sort, $partition }, ->
      @all = @
      @_memory = OBJ()

  constructor: (base, tap)->
    @_step = 0
    @_copy base
    tap.call @

  _copy: ({ @all, @_all_ids, @_group, @_filters, @$sort, @$partition, @$page_by })->

  in: (req)->
    query_parser @, req, (q, target, req, path)->
      add = (f)-> q._filters.push f
      switch req && req.constructor
        when Array
          set = set_for req
          add (o)->
            for key in path o
              return true if set[key]
            false
        when RegExp
          add (o)->
            for val in path o
              return true if req.test val
            false
        when null, 0, "", Boolean, String, Number
          add (o)->
            -1 < path(o)?.indexOf req
        else
          console.log { target, req, path }
          throw Error 'unimplemented'

  partition: (...ary)->
    new Query @, ->
      @$partition = ary

  where: (req)->
    query_parser @, req, (q, target, req, path)->
      add = (f)-> q._filters.push f
      switch req && req.constructor
        when Function
          add req
        when Array
          if "_id" == target
            q._all_ids = req
          else
            set = set_for req
            add (o)-> set[ path o ]
        when RegExp
          add (o)-> req.test path o
        when null, 0, Boolean, String, Number
          if "_id" == target
            q._all_ids = [req]
          else
            add (o)-> req == path o
        else
          console.log { target, req, path }
          throw Error 'unimplemented'

  search: (text)->
    return @ unless text
    list =
      for item in text.split(/\s+/)
        item = item.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
        continue unless item.length
        "(#{item})"
    return @ unless list.length
    regexp = (new RegExp list.join("|"), "ig")
    @where (o)->
      s = o.q.search_words
      (!s) || regexp.test s

  shuffle: ->
    @sort Math.random

  order: (order)->
    return @ if _.isEqual order, @$sort['_reduce.list']
    new Query @, ->
      @$sort = _.cloneDeep @$sort
      @$sort['_reduce.list'] = order

  sort: (sort...)->
    @order { sort }
  
  page: (page_by)->
    new Query @, ->
      @$page_by = page_by

  form: (ids...)->
    oo = @find ...ids
    if oo
      o = @all._memory[oo.id].form ?= {}
      o.__proto__ = oo
      o
    else
      oo

  find: (ids...)->
    for id in ids when o = @hash[id]
      return o if o
    null

  finds: (ids)->
    for id in ids when o = @hash[id]
      o

  pluck: -> @list.pluck arguments...

  Object.defineProperties @::,
    reduce:
      get: ->
        @all._finder.calculate @, @all._memory
        @_reduce

    list:
      get: ->
        @reduce.list

    hash:
      get: ->
        @reduce.hash

    memory:
      get: ->
        @all._memory

    ids:
      get: ->
        Object.keys @hash
