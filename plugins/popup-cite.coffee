{ Query } = require "~/plugins/memory-record"

module.exports =
  data: ->
    hover: null
    pageY: 0
  watch:
    hover: (id, bye_id)->
      @$emit "popup", { @pageY, id, bye_id }

  methods:
    popup: ->
      tips = (e)=>
        cite  = e.target.attributes.cite
        cite ?= e.target.parentElement.attributes.cite
        if cite
          if chat = Query.chats.sow_cite cite.value
            @hover = chat.id
            @pageY = e.pageY ? e.changedTouches?[0]?.pageY
            return
        @hover = null

      touchmove: tips
      mousemove: tips
      touchleave: tips
      mouseleave: tips
