_ = require "lodash"
{ Query } = require "~/plugins/memory-record"
{ path, relative_to } = require "~/plugins/struct"
{ vuex_value } = require '~/plugins/vuex-helper'


browser = require("~/plugins/browser-store") 
  replace:
    idx: ""
    mode: "full"
    page: ""

  watch:
    idx: ->
      return unless window?
      unless window[@chat_id]
        @go_top()

    mode: ->
      @page_reset()

    page: ->
      if @page
        if Number(@page)
          @page_idxs = [@page - 1]
        else
          @page_reset()

        @page = undefined


store =
  watch:
    "step.chats": ->
      @page_reset()

  computed:
    page_all_contents: ->
      @chats(@part_id)
    page_idx: ->
      @page_all_contents?.page_idx?(@chat) ? 0

    now: ->
      Query.chats.now(@hide_potof_ids)

    chats: ->
      @now[@mode]

    back: ->
      [ @chat_id || @part_id, @mode, @$route.name ].join(",")

    back_url: ->
      [ idx, mode, name ] = (@$route.query.back ? @back).split(",")
      name: name
      query: { idx, mode, page: 'back' }

    editor_url: ->
      back = @$route.query.back
      back ?= @back
      path: "./editor"
      query: { back }

    hide_potof_ids: vuex_value("menu.potofs", ['hide_ids']).hide_ids

  methods:
    page_reset: ->
      return unless window?
      @page_idxs = [ @page_idx ]
      { chat_id } = @
      @$nextTick =>
        if chat_id? && window[chat_id]
          @$store.commit "menu/focus",
            query: "#" + chat_id
            mode: 'center'
        else
          console.log "scrollto TOP"
          window.scrollTo 0, 0

    go_top: ->
      @$nextTick =>
        console.log "scrollto TOP"
        window.scrollTo 0, 0

    page_url: (part_id, page_idx)->
      return unless part_id && data = @chats(part_id)
      idx = part_id
      query: { @mode, idx, page: page_idx + 1 }

path store, "folder", "book", "part", "phase", "chat"



module.exports = (o)->
  if o?.loader
    _.merge {}, browser, store
  else
    _.merge {}, browser.slave, store
