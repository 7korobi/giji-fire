{ to_tempo } = require "~/plugins/to"
{ State, Model, Query, Rule, Set, Finder } = require "memory-orm"

Dexie = require("dexie").default
Vue = require 'vue'
comidx = null

if Vue.default?
  Vue = Vue.default


FetchApi = require "~/worker/fetch-api"

mounts = 0
is_cache = {}
is_online = is_visible = false

if document?
  dexie = new Dexie 'giji'
  dexie
  .version(1).stores
    meta: '&idx'
    data: '&idx'


base = (opt)->
  data: ->
    step: State.step

  mounted: ->
    @timers = {}
    window.addEventListener 'offline', @_waitwake
    window.addEventListener 'online', @_waitwake
    document.addEventListener 'visibilitychange', @_waitwake
    @_waitwake()
      
  destroyed: ->
    window.removeEventListener 'offline', @_waitwake
    window.removeEventListener 'online', @_waitwake
    document.removeEventListener 'visibilitychange', @_waitwake
    for key, val of @timers
      clearTimeout val

  methods:
    get_by_network: ->
      for key, val of @timers
        clearTimeout val

      list = opt.call @
      list.map ([name, id])=>
        idx = [name, id].join("&")
        dexie.meta.delete idx
        dexie.data.delete idx
        is_cache[idx] = 0
      @_waitwake()

    _waitwake: ->
      is_online  = window.navigator.onLine
      is_visible = 'hidden' != document.visibilityState
      is_ok = is_online && is_visible
      if is_ok
        list = opt.call @
        await Promise.all list.map ([name, id])=>
          @$store.dispatch name, { id, name, @timers }
      else
        for key, val of @timers
          clearTimeout val

base.cache = (timestr, vuex_id, opt)->
  # console.log { timestr, timeout, url: opt('*') }
  ({ dispatch, state, commit, rootState }, { id, name, timers })->
    url = opt id
    idx = [name, id].join("&")

    roop = ->
      { last_at, write_at, next_at, timeout } = to_tempo timestr


      get_pass = ->
        wait = new Date - write_at
        console.log { timestr, idx, wait, url: null }

      get_by_lf = ->
        { pack } = await dexie.data.get idx
        State.store pack
        wait = new Date - write_at 
        console.log { timestr, idx, wait, url: '(LF)' }

      get_by_network = ->
        pack = await FetchApi[name] url, id
        await dexie.data.put { idx, pack }
        wait = new Date - write_at
        console.log { timestr, idx, wait, url }


      if write_at < is_cache[idx]
        get_pass()
      else
        # IndexedDB metadata not use if memory has past data, 
        unless 0 < is_cache[idx]
          meta = await dexie.meta.get idx

        switch
          when write_at < meta?.next_at
            await get_by_lf()

          when 0 < meta?.next_at
            await get_by_lf()
            await get_by_network()

          else
            await get_by_network()
            dexie.meta.put { idx, next_at }

      is_cache[idx] = next_at
      if timeout < 0x7fffffff  #  ほぼ25日
        timers[url] = setTimeout roop, timeout
    roop()

base.caches = (timestr, opts)->
  for key, cb of opts
    opts[key] = base.cache timestr, key, cb
  opts

module.exports = base
