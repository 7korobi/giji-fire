_ = require "lodash"
{ Query } = require "~/plugins/memory-record"
{ path, relative_to } = require "~/plugins/struct"


browser = require("~/plugins/browser-store") 
  replace:
    idx: ""
    page: ""
    search: ""
  local:
    page_by: 30
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

blank = []
blank.all = 0

store =
  watch:
    "step.chats": ->
      @page_reset()

  computed: {
    ...path "folder", "book", "part", "phase", "chat"

    is_floats: ->
      Object.keys @floats
      .length

    cite_chats: ->
      # todo @book_id ずれる
      Query.chats.ankers(@book_id, @a).list

    side_contents: ->
      @chats "memo", @part_id

    page_idx: ->
      @page_all_contents?.page_idx?(@chat) ? 0

    page_all_contents: ->
      @chats @mode, @part_id

    back: ->
      [ @chat_id || @part_id, @mode ].join(",")

    back_url: ->
      [ idx, mode ] = (@$route.query.back ? @back).split(",")
      query: { idx, mode, page: 'back' }

    search_words: ->
      @search

    chats: ->(mode, part_id)=>
      q = Query
          .chats
          .now @hide_ids, @search_words, @page_by, mode, part_id
          .reduce

      switch mode
        when 'memo'
          q?.last ? blank
        else
          q?.list ? blank

    chat_size: ->(part_id, mode)=>
      if "memo" == mode || @search.length || @hide_ids.length
        @chats(mode, part_id)?.all ? 0
      else
        Query.chats.reduce[part_id]?[mode]?.set?.length ? 0

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
      return unless part_id && data = @chats @mode, part_id
      idx = part_id
      query: { @mode, idx, page: page_idx + 1 }

zIndex = 100

module.exports = _.merge {}, browser, store
