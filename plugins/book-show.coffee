_ = require "lodash"
{ path } = require "~/plugins/struct"


browser = require("~/plugins/browser-store") 
  replace:
    idx: ""
    page: ""

  watch:
    idx: ->
      return unless window?
      unless window[@chat_id]
        @go_top()

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
    page_idx: ->
      @page_all_contents?.page_idx?(@chat) ? 0
  }
  methods:
    focus: (@idx)->

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

module.exports = _.merge {}, browser, store
