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

    shows: [] # pin, toc, potof, current, search
    target: null

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
    
    focus: (state, chat_id)->
      return unless window?
      return unless el = window[chat_id]
      return unless rect = el.getBoundingClientRect()
      rect_center = rect.top + rect.height / 2
      top = rect_center - state.horizon
      # console.log " go to #{chat_id} as #{top}px"
      window.scrollBy 0, top

    shows: (state, a)->
      state.shows = a
      return

    update: (state, o)->
      for key, val of state when o[key]
        state[key] = { val..., o[key]... }
      return
