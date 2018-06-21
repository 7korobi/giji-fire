<template lang="pug">
.page-active-bg(@drop="drop")
  a-header
  .page-active
    .outframe
      .sideframe
        no-ssr
          .inframe
            .icons.form
              slot(name="icons")

      no-ssr
        .summary(name="list" tag="div" key="summary")
          slot(name="summary")

      .center-left
      .center-right
      .contentframe
        .inframe
          slot
          c-report(handle="footer", :write_at="1169852700003")
            a-footer
            .icons.form

</template>
<style lang="stylus" scoped>
</style>

<script lang="coffee">
module.exports =
  methods:
    drop: (e)->
      e.stopPropagation()
      e.preventDefault()
      console.log "block drop"

</script>
