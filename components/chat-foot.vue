<template lang="pug">
.date(v-if="anker")
  abbr.btn(@click="open_mention") {{ anker || "" }}
</template>

<script lang="coffee">
{ localStorage } = require "vue-petit-store"
module.exports =
  mixins: [
    localStorage "shows"
  ]
  props: ["anker"]
  data: ->
    shows: [] # pin, toc, potof, current, search
  methods:
    open_mention: ->
      @shows = [...@shows, 'mention']
</script>

