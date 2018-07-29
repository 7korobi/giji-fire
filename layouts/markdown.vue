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
        no-ssr
          .inframe.TITLE
            hr
            .swipe
              fire-oauth(style="white-space: nowrap")
            hr

      .center-left
      .center-right
      .contentframe
        .inframe
          no-ssr
            c-report(handle="SSAY" deco="giji")
              nuxt
          a-footer
</template>
<style lang="sass" scoped>
</style>

