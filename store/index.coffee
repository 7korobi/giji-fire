require "../models/index"
Mem = require "~/plugins/memory-record"

if window?
  window.Mem = Mem

module.exports =
  state: ->
    user: null
    env: {}
    read_at: {}
    timer: {}

  actions:
    nuxtServerInit: ({ commit }, { isDev, req, env })->
      commit "update", { env }


  mutations:
    update: (state, o)->
      for key, val of state when o[key]
        state[key] = { val..., o[key]... }
        console.log key, state[key]
      return
