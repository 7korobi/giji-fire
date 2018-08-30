{ to_msec } = require "~/plugins/struct"
{ State } = require "~/plugins/memory-record"


Vue = require 'vue'
if Vue.default?
  Vue = Vue.default

{ step } = State

base = (opt)->
  data: ->
    { step }

  mounted: ->
    list = opt.call @
    await Promise.all list.map ([name, id])=>
      @$store.dispatch name, { id, name }


base.cache = (timestr, vuex_id, opt)->
  ({ dispatch, state, commit, rootState }, { id, name })->
    res = await fetch opt id
    data = await res.json()
    commit vuex_id, { id, data }


base.caches = (timestr, opts)->
  for key, cb of opts
    console.log { timestr, url: cb('*') }
    opts[key] = base.cache timestr, key, cb
  opts

module.exports = base