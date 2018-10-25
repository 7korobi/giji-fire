_ = require "lodash"

module.exports =
  computed:
    for_toc: ->
      page_idx = @page_all_contents?.page_idx?(@chat) ? @pager.tail_idx

      { @book, @chats, @mode, @part_id, @search, @page_by, page_idx }
    for_mode: ->
      { @mode, @part_id, @chat_id }
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
      { is_ban, is_warn, deco, rows: 7, maxRow: 20, maxSize: 999 }
