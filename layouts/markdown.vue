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
          client-only
            .icons.form
      .sideframe
        .inframe
          client-only
            .icons.form
      .summaryframe(name="list" tag="div" key="summary")

      .center-left
      .center-right
      .contentframe
        .inframe
          client-only
            c-report(handle="SSAY" deco="giji")
              nuxt
          a-footer
</template>
<style lang="sass" scoped>
</style>

