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
module.exports =
  mixins: [
    require("~/plugins/browser-store")
      session:
        shows: []
      watch:
        shows: (news)->
          for key in ["filters", "tools"]
            if key in news
              window[key]?.style.display = ""
            else
              window[key]?.style.display = "none"
  ]
  data: ->
    {}
</script>
