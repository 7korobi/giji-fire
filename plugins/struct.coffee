_ = require "lodash"
{ Query } = require "memory-orm"

to_x = (type, sp, nil)-> (u)->
  switch u?.constructor
    when null, undefined, sp
      nil
    when type
      u
    else
      type u

state_value = (mutation, getter, setter)->
  get: ->
    _.get @$store.state, getter
  set: (val)->
    o = _.set {}, setter, val
    @$store.commit mutation, o


module.exports = m =
  vuex_value: (path, keys)->
    dir = path.split('.')
    o = {}
    for key in keys
      mutation = "#{dir[0]}/update"
      getter = [...dir[0..-1], key].join('.')
      setter = [...dir[1..-1], key].join('.')
      o[key] = state_value mutation, getter, setter
    o

  relative_to: ({ name, params, query, hash }, o, is_replace)->
    unless is_replace
      params = _.cloneDeep params
      query  = _.cloneDeep query
    to = { name, params, query, hash }
    for key, val of o
      if params[key]
        params[key] = val
      else
        query[key] = val
    to

  to_msec: (str)->
    timeout = 0
    str.replace /(\d+)(.)|0/g, (_, num, unit)->
      return unless num = Number num
      timeout +=
        switch unit
          when "s"
            1000 * num
          when "m"
            1000 * 60 * num
          when "h"
            1000 * 3600 * num
          when "d"
            1000 * 3600 * 24 * num
          else
            throw new Error "#{timestr} at #{num}#{unit}"
    timeout

  types:
    "#{Number}":
      to_str: to_x String, NaN, ""
      by_str: to_x Number, "", NaN
      by_url: to_x Number, "", NaN
    "#{String}":
      to_str: to_x String, null, ""
      by_str: to_x String, "", null
      by_url: to_x String, "", null
    "#{Array}":
      to_str: JSON.stringify
      by_str: JSON.parse
      by_url: to_x Array, null, null
    "#{Object}":
      to_str: JSON.stringify
      by_str: JSON.parse

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
