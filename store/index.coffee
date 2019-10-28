Mem = require 'memory-orm'

require "~/app/models/index"
require "~/app/plugins/fetch-api"

if window?
  Object.assign window, { Mem }

get_json = (url)->
  res = await fetch url
  await res.json()

module.exports =
  plugins: [
    ( store )->
      store.dispatch 'holiday'
  ]
  state: ->
    user: null
    env: {}
    holidays: {}

  actions:
    nuxtServerInit: ({ commit }, { req, env })->
      commit "update", { env }

  mutations:
    update: (state, o)->
      for key, val of state when o[key]
        state[key] = { val..., o[key]... }
        console.log key, state[key]
      return

    holiday: (state, o)->
      Object.assign state.holidays, o

  actions:
    holiday: ({ commit })->
      commit 'holiday', await get_json 'https://holidays-jp.github.io/api/v1/date.json'