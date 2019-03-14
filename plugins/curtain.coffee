
module.exports = (curtain_names)->
  data: ->
    lefts: curtain_names.map -> Infinity
    pageX: 0

  mounted: ->
    @data_calc()

  methods:
    in_curtain: (idx)->
      @lefts[idx] < @pageX

    movespace: ->
      enter = =>
        @data_calc()
      leave = =>
        @pageX = 0
      move = (e)=>
        @pageX = e.pageX ? e.changedTouches?[0]?.pageX

      scroll: enter
      touchenter: enter
      touchmove:  move
      touchleave: leave
      mouseenter: enter
      mousemove:  move
      mouseleave: leave
    
    data_calc: ->
      @lefts =
        for key, idx in curtain_names
          if rect = @$refs[key]?.getClientRects()?[0]
            rect.left
          else
            Infinity

