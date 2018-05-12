<script lang="coffee">

module.exports =
  props: ['back_url']
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
              nuxt-link.item.active(replace, :to="back_url")
                i.mdi.mdi-map-marker

      no-ssr
        .summary(name="list" tag="div" key="summary")
          d-mentions.inframe.mentions(key="1" @anker="$listeners.anker")

      .center-left
      .center-right
      .contentframe
        .inframe
          slot
          c-report(handle="footer", :write_at="1169852700003")
            a-footer
</template>
<style lang="stylus" scoped>
</style>

