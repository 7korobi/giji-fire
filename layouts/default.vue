<template lang="pug">
.page-active-bg
  a-header(title="人狼議事")
  .page-active
    .outframe
      client-only
        .toastframe
          .inframe
            .report
              .chat.ADMIN
                .text.fine.mono
                  p.r
                    span.limit1-ok o
                    span.limit1-ng -
                    span.limit2-ok o
                    span.limit2-ng -
                    span.limit3-ok o
                    span.limit3-ng -
                  p.limit1-ng.tooltip-left(data-tooltip="不十分な画面幅にあわせ、折返し表示をしています") 折返中

            .icons.form
              slot(name="toasts")
      client-only
        .sideframe
          .inframe
            .icons.form
              slot(name="icons")

      client-only
        .summaryframe(:class="options" name="list" tag="div" key="summary")
          slot(name="summary")

      .center-left
      .center-right
      .contentframe
        .inframe
          nuxt
          a-footer
      slot(name="popup")

</template>
<script lang="coffee">
require "~/app/plugins/components.coffee"
{ localStorage } = require "vue-petit-store"

module.exports =
  mixins: [
    localStorage "shows"
    localStorage "options"
  ]
  data: ->
    options: ["impose"] # impose
    shows: [] # pin, toc, potof, current, search

</script>

