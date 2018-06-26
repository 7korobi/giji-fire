{ to_msec } = require "~/plugins/struct"
{ State } = require "~/plugins/memory-record"

Vue = require 'vue'
if Vue.default?
  Vue = Vue.default

{ step } = State
manage =
  read_at: {}
  timer: {}

base = (timestr, name, opt)->
  timeout = to_msec timestr

  capture = (vue)->
    if opt?.call
      payload = opt.call vue
      suffix = JSON.stringify payload
    else
      payload = null
      suffix = ""
    key = name + suffix
    { payload, key, name }

  data: ->
    { manage, step }

  mounted: ->
    { timer, read_at } = @manage
    { payload, key, name } = capture @

    timer[key] = timeout
    @manage.timer = timer
    unless Date.now() - timeout < read_at[key]
      await @$store.dispatch name, payload
      read_at[key] = Date.now()
      @manage.read_at = read_at

base.plugin = (@arg)->
  ({ commit, state })->
    { timer, read_at } = state
    base.root = { commit, timer, read_at }

module.exports = base
