<script lang="coffee">
module.exports = require("~/components/chat.coffee")()
</script>

<template lang="pug">
.chat.post(@click="click" @input="input" :id="id" :key="id" :class="classname")
  chat-head(v-if="head" :head="head" :to="to" :sign="sign")
  hr(v-if="head")
  component.text(:value="log" :context="chat" :is="deco_target" :class="deco" :edit="edit")
  .text(v-if="$slots.default" :class="deco")
    slot
  chat-foot(:anker="anker")
</template>
