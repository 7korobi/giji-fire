{ to_msec } = require "~/plugins/struct"
{ State } = require "~/plugins/memory-record"

base = (timestr, name, opt = {})->
  timeout = to_msec timestr

  capture = (vue)->
    if opt.call
      payload = opt.call vue
      suffix = JSON.stringify payload
    else
      payload = null
      suffix = ""
    key = name + suffix
    { payload, key, name }

  data: ->
    step: State.step

  mounted: ->
    { timer, read_at } = @$store.state
    { payload, key, name } = capture @
    o =
      timer: {}
      read_at: {}
    o.timer[key] = timeout
    @$store.commit "update", o
    if Date.now() - timeout < read_at[key]
      new Promise (ok)-> ok()
    else
      @$store.dispatch name, payload
      .then =>
        o.read_at[key] = Date.now()
        @$store.commit "update", o

base.plugin = (@arg)->
  ({ commit, state })->
    { timer, read_at } = state
    base.root = { commit, timer, read_at }

module.exports = base
