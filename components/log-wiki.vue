<template lang="pug">
.page-active-bg
  a-header
  .page-active
    .outframe
      no-ssr
        .toastframe
          .inframe
            .report
              .chat.ADMIN
                .text.fine
                  p.r
                    span.limit1-ok 〇
                    span.limit1-ng ×
                    | /
                    span.limit2-ok 〇
                    span.limit2-ng ×
                    | /
                    span.limit3-ok 〇
                    span.limit3-ng ×
                  p.limit1-ng.tooltip-left(data-tooltip="不十分な画面幅にあわせ、折返し表示をしています") 折返中

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
require "~/plugins/components.coffee"
{ localStorage } = require "vue-petit-store"

module.exports =
  mixins: [
    localStorage "shows"
    localStorage "options"
  ]
  data: ->
    options: ["impose"] # impose
    shows: [] # pin, toc, potof, current, search

  methods:
    drop: (e)->
      e.stopPropagation()
      e.preventDefault()
      console.log "block drop"

</script>
