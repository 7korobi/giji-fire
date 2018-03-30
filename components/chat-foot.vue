<template lang="pug">
.date
  timeago(v-if="full && write_at", :since="write_at")
  abbr(v-if="chat_id", :cite="chat_id") {{ anker }}
</template>

<script lang="coffee">
module.exports =
  props: ["full", "chat_id", "anker", "write_at"]
</script>
