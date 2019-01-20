_ = require "lodash"
{ Query } = require "memory-orm"

state_readonly = (getter)->
  get: ->
    _.get @$store.state, getter

state_value = (getter, setter, mutation)->
  get: ->
    _.get @$store.state, getter
  set: (val)->
    o = _.set {}, setter, val
    @$store.commit mutation, o

module.exports = m = {
  ...require './to'

  vuex_readonly: (path, keys)->
    dir = path.split('.')
    o = {}
    for key in keys
      getter = [...dir[0..-1], key].join('.')
      o[key] = state_readonly getter
    o

  vuex_value: (path, keys)->
    dir = path.split('.')
    o = {}
    for key in keys
      mutation = "#{dir[0]}/update"
      getter = [...dir[0..-1], key].join('.')
      setter = [...dir[1..-1], key].join('.')
      o[key] = state_value getter, setter, mutation
    o

  idx_id: (at, name)->
    o = {}
    key = "#{name}_id"
    _.set o, "#{key}.get", ->
      if at < @idx_a.length
        @idx_a[0..at].join("-")
      else
        null
    _.set o, "idx_a.get", ->
      @idx.split("-")
    o

  item: (at, name)->
    o = {}
    key = "#{name}_id"
    list = "#{name}s"
    _.set o, "#{name}.get", ->
      Query[list].find @[key]
    o

  path: (keys...)->
    o = {}
    for name, idx in keys
      _.merge o, m.idx_id idx, name
      _.merge o, m.item idx, name
    o
}