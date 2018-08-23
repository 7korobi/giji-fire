_ = require "lodash"

module.exports =
  computed:
    for_toc: ->
      { @book, @chats, @part_id, current: @chat }
    for_mode: ->
      { @now, @mode, @part_id, @chat_id }
    for_part: ->
      { @mode, @book, @chats, @part_id }
    for_potofs: ->
      { @part }
    for_mentions: ->
      { @part_id, @chat_id, @page_idx }
    for_side: ->
      { @side_contents }
    for_editor: ->
      deco = @edit.chat.deco
      { head, log, potof } = @edit.chat
      is_ban = false
      is_ban ||= !( head || log?.match /// #{ potof?.face?.name } ///)
      is_warn = false
      { is_ban, is_warn, deco, rows: 7, maxRow: 20, maxSize: 999 }
