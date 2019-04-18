_ = require 'lodash'


intersectionBase = (option)->
  observer = new IntersectionObserver (doms)->
    doms.forEach (o)->
      o.target._cb_intersection o.isIntersecting, o
  , option

  (id)->
    default_id = "#{id}_default"
    type_id = "#{id}_type"

    created: ->
      @[default_id] = _.get @, id
      # @[type_id] = types[@[default_id].constructor]

    mounted: ->
      @$el._cb_intersection = (is_hit)=>
        _.set @, id,
          if is_hit
            @[default_id]
          else
            null
      observer.observe @$el

    beforeDestroy: ->
      observer.unobserve @$el
      observer.disconnect @$el


module.exports =
  resize_directive: (id)->
    default_id = "#{id}_default"
    type_id = "#{id}_type"
    observer =
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

  horizon: intersectionBase
    root: null
    rootMargin: '-50% 0px -50% 0px'
    threshold: [0]

  fullpage: intersectionBase
    root: null
    rootMargin: '0px 0px 0px 0px'
    threshold: [0, 1]


