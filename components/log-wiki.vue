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
          a-footer
        slot(name="popup")

</template>
<style lang="sass" scoped>
</style>

<script lang="coffee">
module.exports =
  methods:
    drop: (e)->
      e.stopPropagation()
      e.preventDefault()
      console.log "block drop"

</script>
