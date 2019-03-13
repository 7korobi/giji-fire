<script lang="coffee">
module.exports = require("~/components/chat.coffee")()
</script>

<template lang="pug">
.chat.post(:id="id" :key="id" :class="classname" v-on="markup_event('click')")
  chat-head(v-if="head" :head="head" :to="to" :sign="sign")
  hr(v-if="head")
  component.text(v-bind="for_body" v-on="$listeners")
  .text(v-if="$slots.default" :class="deco")
    slot
  chat-foot(:anker="anker")
</template>
