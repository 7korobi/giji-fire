
<template lang="pug">
log-wiki
  template(slot="summary")
    d-mentions.inframe.mentions(v-bind="for_mentions" @anker="anker" @popup="popup" key="1" v-if="is_show.mention")
    .inframe.swipe.TITLE(v-if="is_show.link")
      .TITLE
        hr
        anker-map(v-bind="for_mentions" @anker="anker" @popup="popup")

    .inframe.TITLE.text(v-if="is_show.toc")
      hr
      d-toc(v-bind="for_toc" key="2" @popup="popup")
      hr
      div.swipe
        select(v-model="page_by")
          option(:value="30") &emsp;30投稿/p
          option(:value="100") &ensp;100投稿/p
          option(:value="300") &ensp;300投稿/p
          option(:value="1000") 1000投稿/p
        span.pull-left(style="width: 150px")
          search(v-model="search")
      d-mode(v-bind="for_mode" style="white-space: nowrap")
    a-potofs(v-bind="for_potofs" key="3" v-if="is_show.potofs")

  template(slot="toasts")
    check.item-half.tooltip-left(v-model="options" as="impose" data-tooltip="詳細情報を拡げる操作の ON / OFF")
      i.mdi.mdi-arrow-expand-right
    check.item-half.tooltip-left(v-model="options" as="swipe_page" data-tooltip="ページ一覧を一列にする / 折り返す")
      i.mdi.mdi-gesture-swipe
    btn.item.tooltip-left(v-if="is_floats" v-model="floats" :as="{}" data-tooltip="残ってしまったポップアップを消去")
      i.mdi.mdi-filmstrip-off
      | POP

  template(slot="icons")
    nuxt-link.item.active.tooltip-left(v-if="$route.query.back" replace :to="back_url" data-tooltip="以前の画面に戻る")
      i.mdi.mdi-backspace
      | BACK
    btn-marker(v-if="$route.query.back" :back_url="{ query: $route.query }" v-bind="for_marker")
    btn-marker(v-else                   :back_url="back_url" v-bind="for_marker")

    check.item.tooltip-left(v-model="shows" as="mention" data-tooltip="今見ている投稿に関する情報")
      i.mdi.mdi-pin
      | INFO
    check.item.tooltip-left(v-model="shows" as="link" data-tooltip="今見ている投稿に関する情報")
      i.mdi.mdi-link-variant
      | LINK
    check.item.tooltip-left(v-model="shows" as="toc" v-if="! a.length" data-tooltip="他の日付へ移動、検索など")
      i.mdi.mdi-filmstrip
      | TOC
    check.item.tooltip-left(v-model="shows" as="potof" data-tooltip="キャラクターの一覧、ステータス等を確認")
      i.mdi.mdi-account-multiple
      | STAT

  template(slot="popup")
    popup(v-for="o in floats" v-bind="o" :key="o.id" :current="chat" @anker="anker" @popup="popup")

  c-post(handle="TSAY")
    fire-oauth(style="white-space: nowrap")

  c-post(handle="footer")
    bread-crumb
      li
        nuxt-link(:to="folder_url") 終了した村一覧
      .pull-right
        button(@click="get_by_network")
          i.mdi.mdi-reload

  no-ssr
    div
      div(v-if="a.length")
        chat(v-for="o in cite_chats" :key="o.id" v-bind="for_chat(o.id)" v-on="for_chat_event(o.id)")
      div(v-else)
        c-report.form(handle="footer" key="finder")
          search(v-model="search")
          d-mode.center(v-bind="for_mode")
          d-part.center(v-bind="for_part")

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

        div(v-for="(page_chats, idx) in page_contents", :key="idx")
          banner
            .public
              article.text
                h3 p{{ 1 + page_idxs[idx] }}
          chat(v-for="o in page_chats" :key="o.id" v-bind="for_chat(o.id)" v-on="for_chat_event(o.id)")

        c-report.form(v-if="page_next_idx" handle="footer" key="limitup")
          .center
            scroll-mine(@input="page_add", :as="page_next_idx") 次頁

        c-report.form(v-else handle="footer" key="limitup")
          d-part.center(v-bind="for_part")
          d-mode.center(v-bind="for_mode")
          search(v-model="search")

  c-post(handle="footer")
    bread-crumb
      li
        nuxt-link(:to="folder_url") 終了した村一覧

</template>

<style lang="sass" scoped>
</style>

<script lang="coffee">
{ Query, State, Finder } = require 'memory-orm'
{ poll, vuex, localStorage } = require "vue-petit-store"

dic = '><&"\n'
reg_dic = /[><\&\"\n]/g
sow_dic = [
  "&gt;"
  "&lt;"
  "&amp;"
  "&quot;"
  "<br>"
]

module.exports =
  mixins: [
    require("~/plugins/book-show")
    require('~/plugins/pager')
    require("~/plugins/for_component")
    poll -> [["sow/story", @book_id ]]
    vuex "hide_ids", on: "menu.potofs"
    localStorage "shows"
    localStorage "options"
  ]

  layout: 'blank'
  data: ->
    step: State.step
    page_view: 'wrap'
    floats: {}
    options: ["impose"] # impose
    shows: [] # pin, toc, potof, current, search

  computed:
    is_show: ->
      impose:   @options.includes("impose")
      side:     @shows.includes("side") && !( ["memo", "memos"].includes(@mode) )
      toc:      @shows.includes("toc")  && !( @a?.length )
      link:     @shows.includes("link")    && @chat
      mention:  @shows.includes("mention") && @chat
      potofs:   @shows.includes("potof")

    page_idx: ->
      @page_all_contents?.page_idx?(@chat) ? 0

    search_words: ->
      @search.replace reg_dic, (chr)->
        sow_dic[ dic.indexOf chr ]

    folder_url: ->
      "/sow/village?folder_id=#{@folder_id.toUpperCase()}"

  head: ->
    anker  = @chat?.anker()
    anker ?= @part?.label
    titleTemplate: "#{ anker ? ""} #{@book?.label ? ""} - %s"


</script>
