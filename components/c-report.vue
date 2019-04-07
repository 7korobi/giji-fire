<script lang="coffee">
module.exports = require("~/components/chat.coffee")()
</script>

<template lang="pug">
chat-body.report(:key="id" v-on="$listeners" v-bind="for_body")
  slot
</template>
