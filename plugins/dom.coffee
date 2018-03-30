module.exports =
  adjust: ->
    { top, horizon, height } = @$store.state.menu
    if window? && @$el
      rect = @$el.getBoundingClientRect()
      my_top = rect.top
      my_btm = rect.height + my_top + 6
      switch
        when 0 < my_btm < horizon
          "head"
        when my_top < horizon < my_btm
          "focus"
        when horizon < my_top < height
          "tail"
        else
          null
    else
      null
