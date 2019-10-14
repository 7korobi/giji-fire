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
    check.item.tooltip-left(v-model="options" as="impose" data-tooltip="詳細情報を拡げる操作の ON / OFF")
      i.mdi.mdi-arrow-expand-right
    check.item.tooltip-left(v-model="options" as="swipe_page" data-tooltip="ページ一覧を一列にする / 折り返す")
      i.mdi.mdi-gesture-swipe
    btn.item.tooltip-left(v-if="is_floats" v-model="floats" :as="{}" data-tooltip="残ってしまったポップアップを消去")
      i.mdi.mdi-filmstrip-off
      | POP

  template(slot="icons")
    .item
      i.c.mdi(:class="my_mdi")
    h6.c(:class="edit.chat.phase.handle" v-if="edit.is_replacing") 編集
    a.btn.item.tooltip-left(:class="handle" @click="replace_mode()" v-if="edit.can_update && edit.is_creating" data-tooltip="この投稿を編集")
      i.mdi.mdi-pencil
    a.btn.item.tooltip-left(:class="handle" @click="create_mode()" v-if="edit.is_replacing" data-tooltip="この編集を取りやめる")
      i.mdi.mdi-pencil-off

    a.btn.item.tooltip-left(:class="handle" @click="fav"  v-if="edit.can_fav" data-tooltip="いいね！")
      i.mdi.mdi-heart-outline(v-if="true")
      i.mdi.mdi-heart(v-if="false")
    hr

    nuxt-link.item.active.tooltip-left(v-if="$route.query.back" replace :to="back_url" data-tooltip="以前の画面に戻る")
      i.mdi.mdi-backspace
      | BACK
    a.btn.item.active.tooltip-left(v-else @click="go_top" data-tooltip="一番上までスクロール")
      i.mdi.mdi-arrow-collapse-up
      | TOP
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
    hr

  template(slot="popup")
    popup(v-for="o in floats" v-bind="o" :key="o.id" :current="chat" @anker="anker" @popup="popup")

  c-report(handle="footer" deco="center")
    bread-crumb

  fire-oauth(handle="TSAY")

  div(v-if="a.length")
    chat(v-for="o in cite_chats" :key="o.id" v-bind="for_chat(o.id)" v-on="for_chat_event(o.id)")
  div(v-else)
    c-report.form(handle="footer" key="finder")
      search(v-model="search")
      d-mode.center(v-bind="for_mode")
      d-part.center(v-bind="for_part")

    div(v-for="(page_chats, idx) in page_contents", :key="idx")
      banner
        .public
          article.text
            h3 p{{ 1 + page_idxs[idx] }}
      chat(v-for="o in page_chats" :key="o.id" v-bind="for_chat(o.id)" v-on="for_chat_event(o.id)")

    div
      c-post(handle="VSSAY")
        article(v-if="! page_contents.length")
          blockquote.
            現在、この名前の項目はありません。
          hr
          br
        article
          ol(style="list-style-type: upper-latin")
            li(v-if="game.edit_book")
              nuxt-link(:to="edit_url") 村を編集する
            li
              abbr.mdi.mdi-pencil
              | 投稿済みのメッセージを編集できるぞ。
            li
              fcm(:topic="book_id")
              | このページ内での新規投稿を通知
          br

    c-report.form(v-if="page_next_idx" handle="footer" key="limitup")
      .center
        scroll-mine(@input="page_add", :as="page_next_idx") 次頁

    c-report.form(v-else handle="footer" key="limitup")
      d-part.center(v-bind="for_part")
      d-mode.center(v-bind="for_mode")
      search(v-model="search")

  e-potof(v-if="game.init" :value="my_potof" @input="potof_join")
  chat(v-if="edit.is_creating" v-bind="for_chat_new" v-on="for_chat_event(edit.chat.id)")
  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<script lang="coffee">
{ Query, Set } = require 'memory-orm'
{ to_tempo, vuex, localStorage, firestore_model, firestore_models } = require "vue-petit-store"

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
    firestore_model  "book",   -> @book_id && "game/#{@book_id}"
    firestore_models "potofs", -> @book_id && "game/#{@book_id}/potofs"
    firestore_models "cards",  -> @book_id && "game/#{@book_id}/cards"
    firestore_models "stats",  -> @book_id && "game/#{@book_id}/stats"
    firestore_models "parts",  -> @book_id && "game/#{@book_id}/parts"
    firestore_models "phases", -> @book_id && "game/#{@book_id}/phases"
    firestore_models "chats",  -> @book_id && "game/#{@book_id}/chats"
    vuex "hide_ids", on: "menu.potofs"
    localStorage "shows"
    localStorage "options"

    require("~/plugins/book-firebase")

    require("~/plugins/book-show")
    require("~/plugins/pager")
    require("~/plugins/for_component")
  ]
  layout: 'blank'
  data: ->
    floats: {}
    options: ["impose"] # impose
    shows: [] # pin, toc, potof, current, search

  computed:
    game: ->
      return {} unless @book
      [ part_top, part_0 ] = Query.parts.finds(["#{@book.id}-top","#{@book.id}-0"])
      [ potof_npc ] = Query.potofs.finds(["#{@book.id}-NPC"])

      edit_book = @user.uid == @book.uid
      edit_npc  = @user.uid == potof_npc?.uid
      init = edit_book && part_top?.is_update

      { is_update, is_creating, is_entry, is_moving, is_replacing } = @edit
      console.warn { is_update, is_creating, is_entry, is_moving, is_replacing }
      console.warn { edit_book, edit_npc, init, @part, part_top, part_0, potof_npc }
      console.warn { @my_icon, @my_potof, @my_chat, @my_phase }

      { edit_book, edit_npc, init }

    is_show: ->
      impose:   @options.includes("impose")
      magnify:  @shows.includes("magnify")
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
    
    edit_url: ->
      path: "/game/edit"
      query: { @idx }
      

  methods:
    potof_join: ({ tag_id, job, face_id })->
      return unless @game.init
      uid   = @user.uid
      sign  = @sign.sign
      idx   = uid
      potof_id = "#{@book_id}-#{idx}"

      { range, gap } = @book.tempo
      { now_idx, write_at, last_at, next_at } = to_tempo range, gap

      @my_icon_change
        _id: uid
        mdi: "mdi-account"
        potof_id: potof_id

      @potofs_add {
        write_at
        _id: potof_id
        uid
        sign
        face_id
        @part_id
      }
      @cards_add {
        write_at
        _id: "#{potof_id}-live"
        role_id: 'live'
        SSAY: 1000
        TSAY: 1000
        AIM:  1000
        commit: false
        date: Infinity
      }

  head: ->
    titleTemplate: "#{@book_id} %s"

</script>
