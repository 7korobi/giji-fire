<template lang="pug">
.date(v-if="anker")
  span(v-if="full") {{ label || "" }}
  abbr(v-if="full") {{ sign || "" }}
  timeago(v-if="full && write_at" :since="write_at")  
  abbr.tap(v-if="chat_id" ref="anker" v-on="copyable()") {{ anker || "" }}
</template>

<script lang="coffee">
{ Query } = require "~/plugins/memory-record"
module.exports =
  props: ["part_id", "chat_id", "write_at"]
  data: ->
    full: false

  computed:
    chat: ->
      Query.chats.find @chat_id
    mark: ->
      @chat?.phase?.mark
    label: ->
      @chat?.phase?.label
    sign: ->
      @chat?.potof?.sign
    name: ->
      @chat?.potof?.face?.name

    anker: ->
      if @chat
        if @full
          if @mark
            "(#{@name} >>#{@chat.anker()})"
          else
            "(#{@name} #{@chat.anker()})"
        else
          @chat.anker @part_id

  methods:
    copyable: ->
      toggle = =>
        @full = ! @full

      copy = =>
        { anker } = @$refs
        range = document.createRange()
        range.selectNode anker
        window.getSelection().addRange range
        document.execCommand 'copy'

      touchstart: toggle
      mousedown: toggle
      touchend: copy
      touchleave: copy
      mouseup: copy
      mouseleave: copy
</script>

