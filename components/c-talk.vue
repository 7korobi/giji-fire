<script lang="coffee">
module.exports = require("~/components/chat.coffee")()
</script>

<template lang="pug">
table.talk(:key="id")
  tbody
    tr
      th
        portrate(:img_src="img_src", :face_id="face_id")
      td
        .baloon(:class="classname")
        chat-body(v-on="$listeners" v-bind="for_body")
          slot
</template>
