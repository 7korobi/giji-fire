<script lang="coffee">
{ vuex_value } = require '~/plugins/vuex-helper'

module.exports =
  props: ['part', 'back_url', 'page_idx', 'chat_id']

  data: -> {}
  computed: {
    ...vuex_value 'menu.side',['shows']
    is_show_mention: ->
      "mentions" in @shows
    is_show_toc: ->
      "toc"   in @shows
    is_show_potofs: ->
      "potof" in @shows
  }


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
              check.item(v-model="shows" as="mentions")
                i.mdi.mdi-pin
              check.item(v-model="shows" as="toc")
                i.mdi.mdi-filmstrip
              check.item(v-model="shows" as="potof")
                i.mdi.mdi-account-multiple

      no-ssr
        .summary(name="list" tag="div" key="summary")
          d-mentions.inframe.mentions(key="1" v-on="$listeners" :page_idx="page_idx" :chat_id="chat_id" v-if="is_show_mention")
          .inframe.TITLE(v-if="is_show_toc")
            hr
            .swipe
              d-mode.form(style="white-space: nowrap")
              hr
              d-toc(key="2")
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

