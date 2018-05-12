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
          no-ssr
            nuxt
          c-report(handle="footer", :write_at="1169852700003")
            a-footer
</template>
<style lang="stylus" scoped>
</style>

