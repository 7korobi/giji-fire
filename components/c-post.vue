<script lang="coffee">
module.exports = require("~/components/chat.coffee")()
</script>

<template lang="pug">
.chat.post(@click="click" @input="input" :key="id" :class="classname")
  chat-head(v-if="head", :full="full" :head="head", :to="to", :sign="sign")
  hr(v-if="head")
  .text(v-if="$slots.default" :class="deco")
    slot
  .text(v-else v-html="log_html" :class="deco")
  chat-foot(:full="full" :chat_id="id" :anker="anker" :write_at="write_at")
</template>
