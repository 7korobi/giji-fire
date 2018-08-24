<script lang="coffee">
module.exports = require("~/components/chat.coffee")()

</script>
<style lang="sass" scoped>
.mention
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis
</style>

<template lang="pug">
tr.chat(@click="click" @input="input" :key="id" :class="classname")
  td
    q(v-if="id", :cite="id") {{ anker || '' }}
  td.mention
    component(:value="log" :context="chat" :is="deco_target" :class="deco")

    slot
</template>
