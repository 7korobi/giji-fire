<script lang="coffee">
module.exports = require("~/components/chat.coffee")()
</script>

<template lang="pug">
.chat.report(:id="id" :key="id" :class="classname" v-on="markup_event('click')")
  chat-head(v-if="head" :head="head" :to="to" :sign="sign")
  hr(v-if="head")
  component.text(v-if="edit" :is="edit_target" :class="deco" :part_id="part_id" :phases="phases" v-on="$listeners")
  component.text(v-else :is="deco_target" :class="deco" :value="log" v-on="$listeners")
  .text(v-if="$slots.default" :class="deco")
    slot
  chat-foot(:anker="anker")
</template>
