<script lang="coffee">
require "~/plugins/components.coffee"

module.exports =
  data: -> {}

</script>
<template lang="pug">
.page-active-bg
  a-header(title="人狼議事")
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
          nuxt
          a-footer
</template>
<style lang="sass" scoped>
</style>

