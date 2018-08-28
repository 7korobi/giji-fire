{ to_msec } = require "~/plugins/struct"
{ State } = require "~/plugins/memory-record"


Vue = require 'vue'
if Vue.default?
  Vue = Vue.default

{ step } = State
manage = {}

base = (opt)->
  data: ->
    { manage, step }

  mounted: ->
    list = opt.call @
    await Promise.all list.map ([name, id])=>
      @$store.dispatch name, { id, name, @manage }


base.cache = (timestr, vuex_id, opt)->
  timeout = to_msec timestr
  ({ dispatch, state, commit, rootState }, { id, name, manage })->
    return unless window.localStorage

    cache_id = "#{name}(#{id || ''})"
    at = Date.now() - timeout

    unless at < manage[cache_id]?[0]
      lc = JSON.parse window.localStorage.getItem cache_id
      if at < lc?[0]
        console.log "local cache hit"
        data = lc[2]
      else
        console.log "local cache no."
        res = await fetch opt id
        data = await res.json()
        lc = [
          Date.now()
          timestr
          data
        ]
        window.localStorage.setItem cache_id, JSON.stringify lc
      manage[cache_id] = lc
      commit vuex_id, { id, data }
    else
      console.log "memory cache hit."



base.caches = (timestr, opts)->
  for key, cb of opts
    opts[key] = base.cache timestr, key, cb
  opts

module.exports = base