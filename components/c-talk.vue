<script lang="coffee">
module.exports = require("~/components/chat.coffee")()
</script>

<template lang="pug">
table.talk(:id="id" :key="id")
  tbody
    tr
      th
        portrate(:img_src="img_src", :face_id="face_id")
      td
        .baloon(:class="classname")
        .chat(@click="click" @input="input" :key="id" :class="classname")
          chat-head(v-if="head" :head="head" :to="to" :sign="sign")
          hr(v-if="head")
          component.text(:value="log" :context="chat" :is="deco_target" :class="deco" :edit="edit")
          .text(v-if="$slots.default" :class="deco")
            slot
          chat-foot(:part_id="part_id" :chat_id="id" :write_at="write_at")
</template>
