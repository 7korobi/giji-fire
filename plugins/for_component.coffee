_ = require "lodash"

module.exports =
  computed:
    for_toc: ->
      { @book, @chats, @part_id }
    for_mode: ->
      { @now, @mode, @part_id, @chat_id }
    for_part: ->
      { @mode, @book, @chats, @part_id }
    for_potofs: ->
      { @part }
    for_mentions: ->
      { @chat_id, @page_idx }
