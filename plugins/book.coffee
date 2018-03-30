_ = require "lodash"
{ Query } = require "~/plugins/memory-record"
{ path, relative_to } = require "~/plugins/struct"

store = require("~/plugins/browser-store")
  replace:
    idx: ""
    mode: "full"
  watch: (val, old, key)->
    switch key
      when "idx"
        unless @chat_id
          @go_top()
      when "mode"
        @page_reset()

_.merge store,
  beforeMount: ->
    { page } = @$route.query
    if page
      if Number(page)
        @page_idxs = [page - 1]
      else
        @page_reset()
      { location, href } = @$router.resolve relative_to @$route,
        page: undefined
      history.replaceState null, null, href
      @$route.query.page = undefined

  computed:
    page_all_contents: ->
      @chats(@part_id)
    page_idx: ->
      @page_all_contents?.page_idx?(@chat) ? 0
    page: ->
      { page } = @$route.query
      page

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
      params: { idx, mode }
      query: { page: 'back' }
    
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
      @page_idxs = [ @page_idx ]
      { chat_id } = @
      if chat_id? && window?
        @$nextTick =>
          if window[chat_id]
            @$store.commit "menu/focus", chat_id
          else
            console.log chat_id
      else
        @go_top()

    go_top: ->
      @$nextTick =>
        console.log "scrollto TOP"
        window.scrollTo 0, 0

    page_url: (part_id, page_idx)->
      return unless part_id && data = @chats(part_id)
      idx = part_id
      params: { idx }
      query: { page: page_idx + 1 }

  watch:
    "step.chats": ->
      @page_reset()
    
    chat_id: (newVal, oldVal)->
#      console.log "chat_id", newVal, oldVal

    page_idx: (page, old)->
#      console.log "watch page", page, old

path store, "folder", "book", "part", "phase", "chat"


module.exports = (o)->
  if o?.loader
    store
  else
    _.merge {}, store,
      beforeMount: ->
      watch: {}
      computed:
        page: ->
          { page } = @$route.query
          page
