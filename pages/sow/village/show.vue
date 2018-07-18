
<template lang="pug">
log-wiki
  template(slot="summary")
    d-mentions.inframe.mentions(v-bind="for_mentions" @anker="anker" key="1" v-if="is_show_mention")
    .inframe.TITLE(v-if="is_show_toc")
      hr
      .swipe
        d-mode.form(v-bind="for_mode" style="white-space: nowrap")
        hr
        i.mdi.mdi-magnify
        input(style="width: calc(97% - 2em);" v-model="search" size="30")
        hr
        d-toc(v-bind="for_toc" key="2")
    a-potofs(v-bind="for_potofs" key="3" v-if="is_show_potofs")

  template(slot="icons")
    nuxt-link.item.active(replace, :to="back_url")
      i.mdi.mdi-backspace(v-if="a.length")
      i.mdi.mdi-map-marker(v-else)
    check.item(v-model="shows" as="mentions")
      i.mdi.mdi-pin
    check.item(v-model="shows" as="toc" v-if="! a.length")
      i.mdi.mdi-filmstrip
    check.item(v-model="shows" as="potof")
      i.mdi.mdi-account-multiple

  c-post(handle="footer")
    bread-crumb
      li
        nuxt-link(:to="folder_url") 終了した村一覧

  no-ssr
    div
      div(v-if="a.length")
        chat(v-for="o in cite_chats" @anker="anker" @focus="focus" :id="o.id" :key="o.id")
      div(v-else)
        c-report.form(handle="footer" key="finder")
          i.mdi.mdi-magnify
          input(style="width: calc(97% - 2em);" v-model="search" size="30")
          d-mode(v-bind="for_mode")
          d-part(v-bind="for_part")

        div(v-if="mode == 'memo'")
          c-report.form(handle="footer")
            span
              btn(v-model="mode", as="memos")
                i.mdi.mdi-timer
            span 最新のメモを表示しています。

        div(v-if="mode == 'memos'")
          c-report.form(handle="footer")
            span
              btn(v-model="mode", as="memo")
                i.mdi.mdi-timer-off
            span メモ掲載の一覧を表示しています。

        div(v-for="(chats, idx) in page_contents", :key="idx")
          chat(v-for="o in chats" @anker="anker" @focus="focus" :current="chat" :id="o.id", :key="o.id")

        c-report.form(v-if="page_next_idx" handle="footer" key="limitup")
          .center
            scroll-mine(@input="page_add", :as="page_next_idx") 次頁

        c-report.form(v-else handle="footer" key="limitup")
          d-part(v-bind="for_part")
          d-mode(v-bind="for_mode")
          i.mdi.mdi-magnify
          input(style="width: calc(97% - 2em);" v-model="search" size="30")

  c-post(handle="footer")
    bread-crumb
      li
        nuxt-link(:to="folder_url") 終了した村一覧

</template>


<style lang="stylus" scoped>
</style>

<script lang="coffee">
{ Query, State } = require "~/plugins/memory-record"
{ vuex_value } = require '~/plugins/struct'

module.exports =
  mixins: [
    require("~/plugins/get-by-mount") "30d", "sow/story", -> @book_id
    require("~/plugins/for_component")
    require('~/plugins/pager')
    require("~/plugins/book-show")
    require("~/plugins/browser-store")
      push:
        mode: 'full'
      watch:
        mode: ->
          @page_reset()
  ]

  layout: 'blank'
  data: ->
    { step: State.step }

  head: ->
    labels = [@part, @book].map (o)-> o?.label
    labels.push "人狼議事"
    title: labels.join(' ')

  computed: {
    ...vuex_value "menu.potofs", ['hide_ids']
    ...vuex_value "menu.side", ["shows"]
    is_show_mention: ->
      "mentions" in @shows
    is_show_toc: ->
      "toc"   in @shows && ! @a.length
    is_show_potofs: ->
      "potof" in @shows

    page_idx: ->
      @page_all_contents?.page_idx?(@chat) ? 0

    folder_url: ->
      "/sow/village?folder_id=#{@folder_id.toUpperCase()}"
  }

</script>
