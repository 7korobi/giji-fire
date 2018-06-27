_ = require 'lodash'

module.exports =
  namespaced: true

  state: ->
    token: null
    user: null
    credential: null

  mutations:
    replace: (state, o)->
      for key, val of o
        state[key] = val
      return

    update: (state, o)->
      _.merge state, o
      return

  actions:
    update: ({commit}, o)->
      commit 'update', o
