<script lang="coffee">
module.exports = require("./chat.coffee")()
</script>

<template lang="pug">
.post(:key="id" v-horizon)
  chat-body(v-on="$listeners" v-bind="for_body")
    slot
</template>
