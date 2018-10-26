
module.exports = (curtain_names)->
  data: ->
    lefts: curtain_names.map -> Infinity
    pageX: 0

  methods:
    on_curtain: (idx)->
      @lefts[idx] < @pageX

    movespace: ->
      scroll: =>
        @data_calc true
      touchmove: (e)=>
        @data_calc !( @lefts[0] < Infinity )
        { @pageX } = e.changedTouches[0]
      mousemove: ({ @pageX })=>
        @data_calc !( @lefts[0] < Infinity )
    
    data_calc: (force)->
      if force
        refs = curtain_names.map (key)=> @$refs[key]
        @lefts =
          for o, idx in refs when rects = o.getClientRects()
            rects[0].left

