_ = require "lodash"
{ Query } = require "~/plugins/memory-record"
{ path, relative_to } = require "~/plugins/struct"


browser = require("~/plugins/browser-store") 
  replace:
    idx: ""
    page: ""
    search: ""
  push:
    mode: 'full'
    a: []

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

  computed: {
    ...path "folder", "book", "part", "phase", "chat"

    is_floats: ->
      Object.keys @floats
      .length
    page_idx: ->
      @page_all_contents?.page_idx?(@chat) ? 0
    cite_chats: ->
      # todo @book_id ずれる
      Query.chats.ankers(@book_id, @a).list

    now: ->
      Query.chats.now(@hide_ids, @search)

    chats: ->
      @now[@mode]

    side_contents: ->
      @now.memo(@part_id)

    page_all_contents: ->
      @chats(@part_id)

    back: ->
      [ @chat_id || @part_id, @mode ].join(",")

    back_url: ->
      [ idx, mode ] = (@$route.query.back ? @back).split(",")
      query: { idx, mode, page: 'back' }
  }
  methods:
    focus: (@idx)->

    popup: ({ adjust, pageY, id, bye_id })->
      if id
        ++zIndex
        key = id
        @$set @floats, id, { id, key, pageY, adjust, zIndex }

      if bye_id
        @$delete @floats, bye_id

    anker: (book_id, a)->
      if @a.length
        @a = _.union @a, a
      else
        @floats = {}
        idx = @book_id + a[-1..][0]
        @$router.push
          query: { a, @back, idx }

    page_reset: ->
      return unless window?
      @page_idxs = [ @page_idx ]
      @floats = {}
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

zIndex = 100

module.exports = _.merge {}, browser, store
