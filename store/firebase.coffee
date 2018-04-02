module.exports =
  namespaced: true

  state: ->
    shows: [] # pin, toc, potof, current, search

  mutations:
    center: (state, { top, left, height, width })->
      state.height  = parseInt height
      state.horizon = parseInt height / 2
      state.width   = parseInt width

      state.top    = parseInt top
      state.center = parseInt top + height / 2
      state.bottom = parseInt top + height

      state.left  = parseInt left
      state.right = parseInt left + width
    
    update: (state, o)->
      for key, val of state when o[key]
        state[key] = { val..., o[key]... }
      return
