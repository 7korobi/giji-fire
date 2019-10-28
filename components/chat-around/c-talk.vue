<script lang="coffee">
module.exports = require("./chat.coffee")()
</script>

<template lang="pug">
.talk(:key="id" v-horizon)
  chat-body(v-on="$listeners" v-bind="for_body")
    slot
  .baloon(:class="handle")
  portrate(:img_src="img_src", :face_id="face_id")
</template>
