<script lang="coffee">

module.exports =
  mixins: [
    require("~/plugins/browser-store")
      local:
        text: "(自由帳)"
      watch: (val, old, key)->
  ]

  data: ->
    {}

  computed:
    texts: ->
      @text.split("\n\n")
</script>

<template lang="pug">
  monaco-editor(v-model="text" style="height: 90vh")

</template>
