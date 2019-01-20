_ = require "lodash"

module.exports =
  computed:
    for_toc: ->
      page_idx = @page_all_contents?.page_idx?(@chat) ? @pager.tail_idx

      { @book, @chats, @mode, @part_id, @search, @page_by, page_idx, @chat_size }
    for_mode: ->
      { @mode, @part_id, @chat_id, @chat_size }
    for_part: ->
      { @mode, @book, @part_id }
    for_potofs: ->
      { @part }
    for_mentions: ->
      { @book_id, @chat_id, @page_idx, @a }
    for_side: ->
      { @side_contents }
    for_editor: ->
      deco = @edit.chat.deco
      { head, log, potof } = @edit.chat
      is_ban = false
      is_ban ||= !( head || log?.match /// #{ potof?.face?.name } ///)
      is_warn = false
      { is_ban, is_warn, deco, rows: 7, maxRow: 20, maxWord: 200, maxSize: 999 }
    for_profile: ->
      deco = "quill"
      is_ban = is_warn = false
      is_ban ||= ! @user?.uid?
      is_ban ||= ! @sign.sign
      { is_ban, is_warn, deco, rows: 7, maxRow: 10, maxWord: 100, maxSize: 500 }
