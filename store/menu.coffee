module.exports =
  namespaced: true

  state: ->
    top:    0
    center: 0
    bottom: 0

    left:   0
    right:  0

    horizon: 0
    height:  0
    width:   0

    potofs:
      sort: "live"
      order: "asc"
      hide_ids: []

    side:
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

    focus: (state, { query, mode })->
      return unless window?
      return unless el = document.querySelector query
      return unless { height, top } = el.getBoundingClientRect()
      switch mode
        when 'center'
          top += height / 2 - state.horizon
        when 'bottom'
          top += height

      # console.log " go to #{id} as #{top}px"
      window.scrollBy 0, top

    update: (state, o)->
      for key, val of state when o[key]
        state[key] = { val..., o[key]... }
      return
