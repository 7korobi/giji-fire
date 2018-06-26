_ = require "lodash"
{ Query } = require "~/plugins/memory-record"
{ vuex_value } = require '~/plugins/vuex-helper'


browser = require("~/plugins/browser-store") 
  replace:
    mode: "full"

  watch:
    mode: ->
      @page_reset()

store =
  computed: {
    ...vuex_value "menu.potofs", ['hide_ids']
    page_all_contents: ->
      @chats(@part_id)

    now: ->
      Query.chats.now(@hide_ids)

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
  }

module.exports =
  _.merge {}, browser, store
