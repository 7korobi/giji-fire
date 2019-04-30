_ = require "lodash"

module.exports =
  methods:
    for_chat: (id)->
      { id, @edit, current: @chat }

    for_chat_event: (id)->
      if id == @edit?.chat.id
        {
          @anker
          @popup
          @create_mode
          @remove
          @selection
          drop_image: @image_post
          check:      @check_post
          submit:      @chat_post
        }

      else
        {
          @anker
          @popup
          @focus
        }

  computed:
    for_chat_new: ->
      id = "edit-edit-edit-edit-edit"
      { id, @edit, current: @chat }

    for_toc: ->
      page_idx = @page_all_contents?.page_idx?(@chat) ? @pager.tail_idx

      { @book, @chats, @mode, @part_id, @chat_size, @search, @page_by, page_idx, @options }
    for_mode: ->
      { @mode, @part_id, @chat_id, @chat_size }
    for_part: ->
      { @mode, @book, @part_id }
    for_potofs: ->
      { @part }
    for_marker: ->
      back_url =
        query: { @idx, @mode, page: '' }
      { log, write_at } = @chat ? {}
      { log, write_at, back_url }
    for_mentions: ->
      { @book_id, @chat_id, @page_idx, @a }
    for_side: ->
      { @side_contents }
    for_profile: ->
      deco = "quill"
      is_ban = is_warn = false
      is_ban ||= ! @user?.uid?
      is_ban ||= ! @sign.sign
      { is_ban, is_warn, deco, rows: 7, maxRow: 10, maxWord: 100, maxSize: 500 }
