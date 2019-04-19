_ = require 'lodash'


intersectionBase = (option)->
  observer = new IntersectionObserver (doms)->
    doms.forEach (o)->
      o.target._cb_intersection
        is_hit: o.isIntersecting
        ratio: o.intersectionRatio
        cross: o.intersectionRect
        bound: o.boundingClientRect
        root:  o.rootBounds

  , option

  (id)->
    default_id = "#{id}_default"

    bind: (el, binding, { context })->
      vm = context
      vm[default_id] = _.get vm, id
      _.set vm, id, null
      # vm[type_id] = types[vm[default_id].constructor]

    inserted: (el, binding, { context })->
      cb = (o)->
        _.set @, id, 
          if o.is_hit
            @[default_id]
          else
            null
      el._cb_intersection = cb.bind context
      observer.observe el

    unbind: (el)->
      observer.unobserve el
      observer.disconnect el

resize_observer =
  if ResizeObserver?
    new ResizeObserver (doms)->
      doms.forEach (o)->
        { width, height } = o.contentRect
        width  = parseInt width
        height = parseInt height
        o.target._cb_resize { width, height }
  else
    observe: ->
    unobserve: ->
    disconnect: ->

module.exports =
  resize: (id)->
    default_id = "#{id}_default"
    type_id = "#{id}_type"
    observer = resize_observer

    bind: (el, binding, { context })->
      vm = context
      vm[default_id] = _.get vm, id
      # vm[type_id] = types[vm[default_id].constructor]

    inserted: (el, binding, { context })->
      cb = (size)->
        _.set @, id, size
      el._cb_resize = cb.bind context
      observer.observe el

    unbind: (el)->
      observer.unobserve el
      observer.disconnect el


  curtain: (id)->
    spots_id = "#{id}_spots"
    space_id = "#{id}_space"
    calc_id  = "#{id}_calc"
    left_id   = "#{id}_left"
    top_id    = "#{id}_top"
    right_id  = "#{id}_right"
    bottom_id = "#{id}_bottom"

    directives:
      [id]:
        bind: (el, binding, { context })->
          vm = context
          vm.$refs[id] ?= []
          vm.$refs[id].push el

    data: ->
      left = top = 0
      right = bottom = Infinity
      [spots_id]: []
      [id]: { left, top, right, bottom }

    computed:
      [left_id]:   -> o.left   < @[id].left   for o in @[spots_id]
      [top_id]:    -> o.top    < @[id].top    for o in @[spots_id]
      [right_id]:  -> @[id].right  < o.right  for o in @[spots_id]
      [bottom_id]: -> @[id].bottom < o.bottom for o in @[spots_id]

      [space_id]: ->
        enter = =>
          @[calc_id]()
        leave = =>
          left = top = 0
          right = bottom = Infinity
          @[id] = { left, top, right, bottom }
        move = (e)=>
          left = right = e.pageX ? e.changedTouches?[0]?.pageX
          top = bottom = e.pageY ? e.changedTouches?[0]?.pageY
          @[id] = { left, top, right, bottom }

        scroll: enter
        touchenter: enter
        touchmove:  move
        touchleave: leave
        mouseenter: enter
        mousemove:  move
        mouseleave: leave

    methods:
      [calc_id]: ->
        return unless list = @$refs[id]
        @[spots_id] =
          for o in list
            if oo = o.getClientRects()?[0]
              { left, top, right, bottom } = oo
            else
              left = top = Infinity
              right = bottom = 0
            { left, top, right, bottom }


  horizon: intersectionBase
    root: null
    rootMargin: '-50% 0px -50% 0px'

  fullpage: intersectionBase
    root: null
    rootMargin: '0px 0px 0px 0px'

