require "~/models/index"
Mem = require 'memory-orm'

{ poll } = require "vue-petit-store"
poll.api require "~/worker/fetch-api"

if window?
  Object.assign window, { Mem }

module.exports =
  state: ->
    user: null
    env: {}

  actions:
    nuxtServerInit: ({ commit }, { req, env })->
      commit "update", { env }


  mutations:
    update: (state, o)->
      for key, val of state when o[key]
        state[key] = { val..., o[key]... }
        console.log key, state[key]
      return
