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
              check.item(v-model="shows" as="potof")
                i.mdi.mdi-account-multiple

      no-ssr
        .summary(name="list" tag="div" key="summary")
          d-mentions.inframe.mentions(key="1" @anker="$listeners.anker" :page_idx="0" :chat_id="chat_id")
          a-potofs(key="3" :part='part' v-if="is_show_potofs")

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
{ vuex_value } = require '~/plugins/vuex-helper'

module.exports =
  props: ['part', 'back_url', 'chat_id']

  data: -> {}
  computed: {
    ...vuex_value "menu.side", ["shows"]
    is_show_potofs: ->
      "potof" in @shows
    
  }

</script>
