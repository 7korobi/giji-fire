<template lang="pug">
.sideframe
  .inframe
    .icons.form
      check.item(v-model="shows" as="filters")
        i.mdi.mdi-account-multiple
      check.item(v-model="shows" as="tools")
        i.mdi.mdi-square-edit-outline
      hr
</template>
<script lang="coffee">
{ sessionStorage } = require "~/plugins/browser-store"

module.exports =
  mixins: [
    sessionStorage "shows"
  ]
  data: ->
    shows: []

  watch:
    shows: (news)->
      for key in ["filters", "tools"]
        if key in news
          window[key]?.style.display = ""
        else
          window[key]?.style.display = "none"

</script>
