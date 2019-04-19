module.exports =
  namespaced: true

  state: ->
    potofs:
      sort: "live.date"
      order: "asc"
      hide_ids: []

  mutations:
    update: (state, o)->
      for key, val of state when o[key]
        state[key] = { val..., o[key]... }
      return
