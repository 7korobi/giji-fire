<template lang="pug">
.page-active-bg
  a-header
  .page-active
    .outframe
      no-ssr
        .toastframe
          .inframe
            .icons.form
              slot(name="toasts")
      no-ssr
        .sideframe
          .inframe
            .icons.form
              slot(name="icons")

      no-ssr
        .summaryframe(:class="options" name="list" tag="div" key="summary")
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
{ vuex } = require "~/plugins/vue-struct"

module.exports =
  mixins: [
    vuex "menu.side", ["shows", "options"]
  ]
  methods:
    drop: (e)->
      e.stopPropagation()
      e.preventDefault()
      console.log "block drop"

</script>
