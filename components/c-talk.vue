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
        .chat(:key="id" :class="classname" v-on="markup_event('click')")
          chat-head(v-if="head" :head="head" :to="to" :label="label")
          hr(v-if="head")
          component.text(v-bind="for_body" v-on="$listeners")
          .text(v-if="$slots.default" :class="deco")
            slot
          chat-foot(:anker="anker")
</template>
