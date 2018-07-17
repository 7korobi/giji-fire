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
_ = require "lodash"
{ Query } = require "~/plugins/memory-record"
{ relative_to } = require "~/plugins/struct"

module.exports =
  layout: "sow"
  mounted: ->
  methods:
    anker: (book_id, a)->
      a = _.union @$route.query.a, a
      @$router.replace relative_to @$route, { a }

</script>
