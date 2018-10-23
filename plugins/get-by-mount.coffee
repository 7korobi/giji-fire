{ to_msec } = require "~/plugins/struct"
{ State, Model, Query, Rule, Set, Finder } = require "~/plugins/memory-record"

Vue = require 'vue'
comidx = null

if Vue.default?
  Vue = Vue.default


FetchApi = require "~/worker/fetch-api"
### comlink-mode
if window?
  Comlink = require 'comlink'
  _comlink = require "shared-worker-loader!~/worker/comlink-index"
  comlink = Comlink.proxy (new _comlink).port
###

{ step } = State
mounts = 0

base = (opt)->
  data: ->
    { step }

  mounted: ->
### comlink-mode
    console.log { mounts, step }
    if 0 == mounts && window?
      mounts++
      comlink.add Comlink.proxyValue (data)->
        console.log data
      .then (idx)->
        comidx = idx
        Object.assign window, { comlink }
###
    list = opt.call @

    await Promise.all list.map ([name, id])=>
      @$store.dispatch name, { id, name }

  destroyed: ->
### comlink-mode
    console.log { mounts, step }
    if 0 == mounts && window?
      --mounts
      await comlink.del comidx
###

base.cache = (timestr, vuex_id, opt)->
  ({ dispatch, state, commit, rootState }, { id, name })->
    url = opt id
    console.log { vuex_id, id, name, url }


    copys = await FetchApi[name] url, id
    for key in copys
      Query[key]._finder.clear_cache()

### comlink-mode
    copys = await comlink[name] url, id
    values = JSON.parse await comlink.copy ...copys
    for key, idx in copys
      [ sort, format, memory ] = values[idx]
      { model } = Query[key]._finder
      for _id, o of memory
        model.bless o.item
      Query[key].$sort = sort
      Query[key]._memory = memory
      Query[key]._finder.format = format
      Query[key]._finder.clear_cache()
###

base.caches = (timestr, opts)->
  for key, cb of opts
    console.log { timestr, url: cb('*') }
    opts[key] = base.cache timestr, key, cb
  opts

module.exports = base
