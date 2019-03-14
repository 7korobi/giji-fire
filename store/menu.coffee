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
      sort: "live.date"
      order: "asc"
      hide_ids: []

  mutations:
    center: (state, o)->
      Object.assign state, o

    focus: (state, { query, mode })->
      return unless window?
      return unless el = document.querySelector query
      return unless { height, top } = el.getBoundingClientRect()
      switch mode
        when 'center'
          top += height / 2 - state.horizon
        when 'bottom'
          top += height

      console.log " go to #{query} as #{top}px"
      window.scrollBy 0, top

    update: (state, o)->
      for key, val of state when o[key]
        state[key] = { val..., o[key]... }
      return
