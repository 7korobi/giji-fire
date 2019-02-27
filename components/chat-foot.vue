<template lang="pug">
.date(v-if="anker")
  abbr.btn(@click="open_mention") {{ anker || "" }}
</template>

<script lang="coffee">
{ vuex } = require "vue-petit-store"
module.exports =
  mixins: [
    vuex "menu.side", ["shows"]
  ]
  props: ["anker"]
  methods:
    open_mention: ->
      @shows = [...@shows, 'mention']
</script>

