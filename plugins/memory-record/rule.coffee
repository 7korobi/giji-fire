_ = require "lodash"
Mem = require "./index.coffee"

Finder = require "./finder.coffee"
Query  = require "./query.coffee"
Model  = require "./model.coffee"
Set    = require "./set.coffee"
Map    = require "./map.coffee"

rename = (base)->
  base = base.replace /s$/, ""
  name = Mem.Name[base]
  return name if name

  id =   "#{base}_id"
  ids =  "#{base}_ids"
  list = "#{base}s"
  deploys = []
  depends = []
  Mem.Name[list] = Mem.Name[base] = { id, ids, list, base, deploys, depends }

module.exports = class Rule
  constructor: (base, cb)->
    @$name = rename base
    @model = Model
    @set   = Set
    @map   = Map

    @all = Query.build()
    @all.cache = {}
    @all._finder = new Finder @$name

    @depend_on base

    @map_property = {}

    @model_property =
      $form:
        enumerable: false
        get: ->
          # TODO
          Mem.Set[@$name.base].form(@id)
      id:
        enumerable: true
        get: -> @_id
      "#{@$name.id}":
        enumerable: true
        get: -> @_id

    @form_property =
      $model:
        enumerable: false
        get: ->
          # TODO
          Mem.Set[@$name.base].find(@id)
      changes:
        enumerable: true
        value: (key)->
          if _.isEqual @[key], @find[key]
            null
          else
            @$model[key]
      isChanged:
        enumerable: true
        get: ->
          keys = Object.keys @
          for key in keys
            return true unless _.isEqual @[key], @$model[key]
          return false

    @set_property =
      first:
        enumerable: false
        get: -> @[0]
      head:
        enumerable: false
        get: -> @[0]
      tail:
        enumerable: false
        get: -> @[@length - 1]
      last:
        enumerable: false
        get: -> @[@length - 1]

      uniq:
        enumerable: false
        get: ->
          @constructor.bless _.uniq @

      pluck:
        enumerable: false
        value: (keys...)->
          cb =
            switch keys.length
              when 0
                -> null
              when 1
                _.property keys[0]
              else
                (o)-> _.at(o, keys...)
          @constructor.bless @map cb

    @schema cb if cb
    return

  schema: (cb)->
    cb.call @
    if @model == Model
      class @model extends @model
    Object.defineProperties @model::, @model_property

    class @form extends @model
    Object.defineProperties @form::, @form_property

    if @set == Set
      class @set extends @set
    Object.defineProperties @set::, @set_property

    if @map == Map
      class @map extends @map
    Object.defineProperties @map::, @map_property

    @model.$name = @form.$name = @set.$name = @map.$name = @$name

    Mem.Query[@$name.list] = @all

    Mem.Set[@$name.base] = list = @set.bless []
    list.all = @all
    list.$name = @$name

    Mem.Finder[@$name.base] = finder = @all._finder
    finder.set = @set
    finder.map = @map
    finder.form = @form
    finder.model = @model
    finder.format = {}
    @

  key_by: (keys)->
    cb =
      switch keys?.constructor
        when undefined
          (o)-> o
        when Function
          keys
        when String, Array
          _.property keys
        else
          throw Error "unimplemented #{keys}"

    @model_property.id =
      enumerable: true
      get: cb

  deploy: (cb)->
    Mem.set_deploy @$name.base, cb

  depend_on: (parent)->
    { all } = @
    Mem.set_depend parent, ->
      all._finder.clear_cache all

  scope: (cb)->
    for key, val of cb @all
      @use_cache key, val

  default_scope: (scope)->
    @all._copy scope @all

  shuffle: ->
    @default_scope (all)-> all.shuffle()
  order: (sort...)->
    @default_scope (all)-> all.sort sort...

  relation_to_one: (key, target, ik, else_id)->
    @model_property[key] =
      enumerable: true
      get: ->
        id = _.get @, ik
        Mem.Query[target].find id, else_id

  relation_to_many: (key, target, cmd, ik, qk)->
    all = @all
    @use_cache key, (id)->
      Mem.Query[target][cmd] "#{qk}": id

    @model_property[key] =
      enumerable: true
      get: ->
        all[key](@[ik])

  relation_tree: (key, ik)->
    all = @all
    @use_cache key, (_id, n)->
      if n
        q = all.where "#{ik}": _id
        all[key] q.ids, n - 1
      else
        all.where _id: _id

    @model_property[key] =
      enumerable: true
      value: (n)->
        all[key] [@_id], n

  relation_graph: (key, ik)->
    all = @all
    @use_cache key, (_id, n)->
      q = all.where _id: _id
      if n
        _ids = []
        for a in q.pluck(ik) when a?
          for k in a when k?
            _ids.push k

        all[key] _.uniq(_ids), n - 1
      else
        q

    @model_property[key] =
      enumerable: true
      value: (n)->
        all[key] [@_id], n

  use_cache: (key, val)->
    switch val?.constructor
      when Function
        @all[key] = (args...)=>
          @all.cache["#{key}:#{JSON.stringify args}"] ?= val args...
      else
        @all[key] = val

  path: (keys...)->
    for key in keys
      @belongs_to key
    @deploy ->
      subids = @_id.split("-")
      @idx = subids[keys.length]
      for key, idx in keys
        @["#{key}_id"] = subids[0..idx].join '-'

    { all } = @
    pk = keys[-1..][0] + "_id"
    @model_property.siblings =
      get: ->
        q = {}
        q[pk] = @[pk]
        all.where q

  belongs_to: (to, option = {})->
    name = rename to
    { key = name.id, target = name.list, miss } = option
    @relation_to_one name.base, target, key, miss

  habtm: (to, option = {})->
    name = rename to
    if option.reverse
      { key = @$name.ids, target = to } = option
      @relation_to_many name.list, target, "in", "_id", key
    else
      { key = name.ids, target = name.list } = option
      @relation_to_many name.list, target, "where", key, "_id"

  has_many: (to, option = {})->
    name = rename to
    { key = @$name.id, target = name.list } = option
    @relation_to_many name.list, target, "where", "_id", key

  tree: (option = {})->
    fk = @$name.id
    @relation_tree "nodes", fk
    @belongs_to @$name.base, option

    Object.defineProperties @all,
      leaf:
        get: ->
          not_leaf = _.uniq @pluck fk
          @where (o)-> o._id not in not_leaf

  graph: (option = {})->
    { directed, cost } = option
    ik = @$name.ids
    @relation_to_many @$name.list, @$name.list, "where", ik, "_id"
    @relation_graph "path", ik
    unless directed
      true # todo
