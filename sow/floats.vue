<template lang="pug">
.outframe
  .contentframe(v-for="(o, key, idx) in floats" :style="o" :key="key")
    .inframe
      .chat.report.btns.center(@click="clear")
      div(v-html="o.html")
      
</template>
<script lang="coffee">
module.exports =
  data: ->
    floats: {}
  methods:
    clear: ->
      @floats = {}

</script>
