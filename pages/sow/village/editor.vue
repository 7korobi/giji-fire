<template lang="pug">
.outframe
  .sideframe
    .inframe
      .icons.form
        nuxt-link.item.active(replace, :to="back_url")
          i.mdi.mdi-map-marker

  .summary(name="list" tag="div" key="summary")
    a-mentions(key="1" @anker="anker")
  .contentframe
    .inframe
      a-monaco

</template>
<script lang="coffee">
{ Query } = require "~/plugins/memory-record"
{ uniq, relative_to } = require "~/plugins/struct"

module.exports =
  mixins: [
    require("~/plugins/get-by-mount") "24h", "sow/story", -> @book_id
    require('~/plugins/book')
      loader: true
  ]
  layout: "sow"
  mounted: ->
    @shows = [@shows..., "current"]

  methods:
    anker: (book_id, a)->
      a = uniq @$route.query.a, a
      @$router.replace relative_to @$route, { a }

</script>
