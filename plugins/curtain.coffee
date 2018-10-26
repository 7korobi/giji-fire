
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
      leave = =>
        @pageX = 0
      move = (e)=>
        @pageX = e.pageX ? e.changedTouches?[0]?.pageX

      scroll: =>
        @data_calc()
      touchmove:  move
      touchleave: leave
      mousemove:  move
      mouseleave: leave
    
    data_calc: ->
      refs = curtain_names.map (key)=> @$refs[key]
      @lefts =
        for o, idx in refs when rects = o.getClientRects()
          rects[0].left

