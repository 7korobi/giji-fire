<script lang="coffee">
module.exports = require("~/components/chat.coffee")()
</script>

<template lang="pug">
table.talk(:id="id", :key="id")
  tbody
    tr
      th
        portrate(:img_src="img_src", :face_id="face_id")
      td
        .baloon(:class="classname")
        .chat(@click="click", :key="id", :class="classname")
          chat-head(v-if="head", :full="full", :head="head", :to="to", :sign="sign")
          hr(v-if="head")
          .text(v-html="log_html" :class="deco")
          .text(v-if="$slots.default" :class="deco")
            slot
          chat-foot(:full="full" :chat_id="id" :anker="anker" :write_at="write_at")
</template>
