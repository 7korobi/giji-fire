<script lang="coffee">
module.exports = require("~/components/chat.coffee")()
</script>

<template lang="pug">
.chat.report(@click="click" @input="input" :id="id" :key="id" :class="classname")
  chat-head(v-if="head", :full="full", :head="head", :to="to", :sign="sign")
  hr(v-if="head")
  component.text(:value="log" :context="chat" :is="deco_target" :class="deco" :edit="edit")
  .text(v-if="$slots.default" :class="deco")
    slot
  chat-foot(:full="full", :chat_id="id", :anker="anker", :write_at="write_at")
</template>