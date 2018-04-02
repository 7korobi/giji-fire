_ = require "lodash"
{ Query } = require "~/plugins/memory-record"
{ path, relative_to } = require "~/plugins/struct"

store = require("~/plugins/browser-store")
  replace:
    idx: ""
    mode: "full"
    page: ""

_.merge store,
  computed:
    page_all_contents: ->
      @chats(@part_id)
    page_idx: ->
      @page_all_contents?.page_idx?(@chat) ? 0

    mentions: ->
      Query.chats.reduce?.mention_to?[@chat_id]

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
    
    hide_potof_ids:
      get: ->
        @$store.state.book.hide_potof_ids
      set: (ids)->
        @$store.commit "book/hide_potof_ids", ids

    shows:
      get: ->
        @$store.state.menu.shows
      set: (shows)->
        @$store.commit "menu/shows", shows

  methods:
    page_reset: ->
      return unless window
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

  watch:
    "step.chats": ->
      @page_reset()

    mode: ->
      @page_reset()

    idx: ->
      return unless window
      unless window[@chat_id]
        @go_top()

    page: ->
      if @page
        if Number(@page)
          @page_idxs = [@page - 1]
        else
          @page_reset()

        @page = undefined

path store, "folder", "book", "part", "phase", "chat"


module.exports = (o)->
  res = store
  unless o?.loader
    res = Object.assign {}, res,
      beforeMount: undefined
      beforeRouteEnter: undefined
      beforeRouteUpdate: undefined
      beforeRouteLeave: undefined
    res.watch = {}
  res
