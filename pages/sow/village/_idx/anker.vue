<template lang="pug">
div
  .outframe
    .sideframe
      .inframe
        .icons.form
          nuxt-link.item.active(replace, :to="editor_url")
            i.mdi.mdi-clipboard-text
          nuxt-link.item.active(replace, :to="back_url")
            i.mdi.mdi-map-marker

    .summary(name="list" tag="div" key="summary")
      a-mentions(key="1" @anker="anker")
    .contentframe
      .inframe
        c-report.form(handle="footer" key="finder")
          page-mode
      .inframe
        chat(v-for="o in anker_chats" @anker="anker" @focus="focus", :id="o.id", :key="o.id")
      .inframe
        c-report.form(handle="footer" key="finder")
          page-mode

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

  layout: "sow"
  mounted: ->
    @shows = [@shows..., "current"]

  methods:
    focus: (@idx)->
    anker: (book_id, a)->
      @a = uniq @a, a

  computed:
    editor_url: ->
      back = @$route.query.back
      back ?= @back
      path: "./editor"
      query: { back }

    anker_chats: ->
      Query.chats.ankers(@book_id, @a).list

</script>
