<script lang="coffee">
require "~/plugins/components.coffee"

module.exports =
  default:
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
        c-report(handle="footer", :write_at="1169852700003")
          a-footer
</template>
