<template lang="pug">
log-anker(:part="part" :page_idx="0" :chat_id="chat_id" :back_url='back_url' @anker="anker")
  c-report.form(handle="footer")
    d-mode
  no-ssr
    div
      chat(v-for="o in anker_chats" @anker="anker" @focus="focus" :id="o.id" :key="o.id")
  c-report.form(handle="footer")
    d-mode

</template>
<script lang="coffee">
{ Query } = require "~/plugins/memory-record"
{ uniq, relative_to } = require "~/plugins/struct"

module.exports =
  mixins: [
    require("~/plugins/get-by-mount") "24h", "sow/story", -> @book_id
    require('~/plugins/book')
      loader: true
    require("~/plugins/browser-store")
      replace:
        a: []
  ]

  layout: 'blank'

  methods:
    anker: (book_id, a)->
      @a = uniq @a, a

  computed:
    anker_chats: ->
      # todo @book_id ずれる
      Query.chats.ankers(@book_id, @a).list

</script>
