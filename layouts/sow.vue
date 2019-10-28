<script lang="coffee">
require "~/app/plugins/components.coffee"

module.exports =
  data: -> {}

</script>
<template lang="pug">
div
  a-header
  .outframe
    .center-left
    .center-right
  nuxt.page-active
  .outframe
    .contentframe
      .inframe
        a-footer
</template>
