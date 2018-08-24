<template lang="pug">
.date(v-if="anker")
  abbr.btn(@click="open_mention") {{ anker || "" }}
</template>

<script lang="coffee">
{ Query } = require "~/plugins/memory-record"
{ vuex_value } = require '~/plugins/struct'
module.exports =
  props: ["anker"]
  computed: {
    ...vuex_value "menu.side", ["shows"]
  }

  methods:
    open_mention: ->
      @shows = [...@shows, 'mention']
</script>

