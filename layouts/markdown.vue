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
      .toastframe
        .inframe
          no-ssr
            .icons.form
      .sideframe
        .inframe
          no-ssr
            .icons.form
      .summaryframe(name="list" tag="div" key="summary")

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

