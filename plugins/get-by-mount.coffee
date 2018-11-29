{ to_msec } = require "~/plugins/to"
{ State, Model, Query, Rule, Set, Finder } = require "memory-orm"

LF = require "localforage"
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
lfs = {}
mounts = 0
is_cache = {}

if document?
  LF.config
    driver: LF.INDEXEDDB
    name: 'giji'
    version: 1.0
    storeName: 'KVS'
    description: '人狼議事'

  lfs.meta = LF.createInstance { name: 'meta' }
  lfs.data = LF.createInstance { name: 'data' }

  document.addEventListener 'visibilitychange', ({ timeStamp })->
    is_visible = document.visibilityState
    console.log { timeStamp, is_visible }


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

    @timers = {}
    list = opt.call @

    await Promise.all list.map ([name, id])=>
      @$store.dispatch name, { id, name, @timers }

  destroyed: ->
    for key, val of @timers
      clearTimeout val
### comlink-mode
    console.log { mounts, step }
    if 0 == mounts && window?
      --mounts
      await comlink.del comidx
###

# memory -> LF -> workbox -> network

base.cache = (timestr, vuex_id, opt)->
  timeout = to_msec timestr
  # console.log { timestr, timeout, url: opt('*') }
  ({ dispatch, state, commit, rootState }, { id, name, timers })->
    roop = ->
      url = opt id

      if is_cache[url]
        console.log { cache: 'memory',  timestr, id, name, url }
      else
        meta = await lfs.meta.getItem url
        is_cache[url] = true

        if new Date < meta?.expire 
          console.log { cache: 'LF',  timestr, id, name, url }
          pack = await lfs.data.getItem url
          State.store pack

        else
          console.log { cache: false, timestr, id, name, url }
          pack = await FetchApi[name] url, id
          lfs.data.setItem url, pack
          lfs.meta.setItem url,
            expire: timeout + (new Date - 0)

      if timeout < 0x7fffffff  #  ほぼ25日
        timers[url] = setTimeout roop, timeout
    roop()

### comlink-mode
    copys = await comlink[name] url, id
    values = JSON.parse await comlink.copy ...copys
    for key, idx in copys
      ...
###

base.caches = (timestr, opts)->
  for key, cb of opts
    opts[key] = base.cache timestr, key, cb
  opts

module.exports = base
