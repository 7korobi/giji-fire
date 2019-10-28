<script lang="coffee">
module.exports = require("./chat.coffee")()
</script>
<style lang="sass" scoped>

.hide
  height: 2px
  margin -7px 8px 6px 125px

</style>

<template lang="pug">
.chat.hide(:key="id", :class="classname")
</template>
