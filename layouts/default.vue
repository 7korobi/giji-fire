<script lang="coffee">
require "~/plugins/components.coffee"

module.exports =
  data: -> {}

</script>
<template lang="pug">
.page-active-bg
  a-header
  .page-active
    .outframe
      .sideframe
        .inframe
          no-ssr
            .icons.form
      .summary(name="list" tag="div" key="summary")

      .center-left
      .center-right
      .contentframe
        .inframe
          nuxt
          a-footer
</template>
<style lang="stylus" scoped>
</style>

