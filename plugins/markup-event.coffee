{ Query } = require 'memory-orm'

has_cite = (target)->
  if target
    cite  = target.attributes.cite
    cite ?= target.parentElement.attributes.cite
    if cite
      if chat = Query.chats.sow_cite cite.value
        chat

has_href = (target)->
  { href, chk, src, alt } = target.attributes
  if href
    url = href.value
    check = chk?.value
    if check == "confirm"
      url

has_checkbox = (target)->
  { type, value } = target.attributes
  if type && type.value == 'checkbox'
    type.value

module.exports =
  data: ->
    hover: null
    pageY: 0
    adjust: null
  watch:
    hover: (id, bye_id)->
      @$emit "popup", { @adjust, @pageY, id, bye_id }

  methods:
    markup_event: (mode = "popup")->
      hover = (e)=>
        if chat = has_cite e.target
          @hover = chat.id
          @pageY = e.pageY ? e.changedTouches?[0]?.pageY
          @adjust = "bottom"
          if e.target.className.includes "cite-in"
            if @pageY < @$store.state.menu.center
              @adjust = "bottom"
            else
              @adjust = "top"
          if e.target.className.includes "cite-top"
            @adjust = "top"
          if e.target.className.includes "cite-bottom"
            @adjust = "bottom"
          return
        @hover = null

      input = (e)=>
        if has_checkbox e.target
          @$emit "check", target.checked

      click = (e)=>
        if chat = has_cite e.target
          e.preventDefault()
          @$emit "anker", ...chat.make_ankers @id
        if url = has_href e.target
          e.preventDefault()
          if confirm "open?\n#{url}"
            open url, '_blank'

      o =
        touchmove: hover
        mousemove: hover
        touchleave: hover
        mouseleave: hover
      switch mode
        when 'click'
          o.click = click
        when 'markdown'
          o.click = click
          o.input = input
      o

