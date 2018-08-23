<template lang="pug">
.date(v-if="anker")
  abbr.(v-if="chat_id" @click="open_mention") {{ anker || "" }}
</template>

<script lang="coffee">
{ Query } = require "~/plugins/memory-record"
{ vuex_value } = require '~/plugins/struct'
module.exports =
  props: ["part_id", "chat_id"]
  computed: {
    ...vuex_value "menu.side", ["shows"]
    chat: ->
      Query.chats.find @chat_id
    anker: ->
      @chat?.anker @part_id
  }

  methods:
    open_mention: ->
      @shows = [...@shows, 'mention']
</script>

