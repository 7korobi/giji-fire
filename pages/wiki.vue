<template lang="pug">
log-wiki
  template(slot="summary")
    d-mentions.inframe.mentions(v-bind="for_mentions" key="1" @anker="anker" @popup="popup")
    .inframe.TITLE
      hr
      .swipe
        search(v-model="search")        
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
    a.btn.item.tooltip-left(:class="handle" @click="move" v-if="edit.is_moving" data-tooltip="編集中の投稿の並び順をこの上に")
      i.mdi.mdi-table-column-plus-before

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
    btn-marker(v-if="$route.query.back" :back_url="{ query: $route.query }" v-bind="for_marker")
    btn-marker(v-else                   :back_url="back_url" v-bind="for_marker")
    check.item(v-model="shows" as="potof")
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
    div(v-for="(page_chats, idx) in page_contents", :key="idx")
      chat(v-for="o in page_chats" :key="o.id" v-bind="for_chat(o.id)" v-on="for_chat_event(o.id)")
    div
      c-post(handle="VSSAY")
        article(v-if="! page_contents.length")
          blockquote.
            現在、この名前の項目はありません。
            誰でも編集できます。
          hr
          br
          h3 項目を新しく書くには
          ol
            li 上のアイコンから、ログインに使うサービスを選択。
            li 書き込みに使うキャラクターを選択。
            li 枠形と色味を好みできめたら、自由に書き込もう。
            li 文字の一部分を選択すると、文字に装飾をつけることができるぞ！
        article(v-if="page_contents.length")
          ol
            li 文字の一部分を選択すると、文字に装飾をつけることができるぞ！
        article
          ol(style="list-style-type: upper-latin")
            li 画像を書き込みフォームにDrag＆Dropすると、その画像を張り付けるぞ。
            li
              abbr.mdi.mdi-pencil
              | 投稿済みのメッセージを編集できるぞ。
            li
              abbr.mdi.mdi-table-column-plus-before
              | 編集中のメッセージは、他のメッセージの上に移動できるぞ。
            li
              fcm(:topic="book_id")
              | このページ内での新規投稿を通知
          br
  e-potof(v-if="edit.is_entry" :value="my_potof" @input="my_potof_change")
  chat(v-if="edit.is_creating" v-bind="for_chat_new" v-on="for_chat_event(edit.chat.id)")
  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<script lang="coffee">
{ Query, Set, State } = require 'memory-orm'
{ vuex, localStorage, firestore_model, firestore_models } = require "vue-petit-store"

module.exports =
  mixins: [
    firestore_models "potofs", -> @book_id && "wiki/#{@book_id}/potofs"
    firestore_models "chats",  -> @book_id && "wiki/#{@book_id}/chats"
    vuex "hide_ids", on: "menu.potofs"
    localStorage "shows"
    localStorage "options"
    require("~/plugins/book-show")
    require("~/plugins/book-firebase")
    require("~/plugins/for_component")
  ]
  layout: 'blank'
  data: ->
    mode: 'wiki' 
    floats: {}
    options: ["impose"] # impose
    shows: [] # pin, toc, potof, current, search

  computed:
    is_show: ->
      magnify: "magnify" in @shows
      potofs:  "potof"   in @shows

    part_id:  -> @book_id + '-top'

    page_idx: -> 0

    page_contents: ->
      @page_all_contents

  methods: {}

  mounted: ->
    is_update = true

    Set.book.add
      _id: @book_id
    Set.part.add
      _id: @part_id
      label: 'wiki'
    Set.phase.merge [
      { is_update, _id: @part_id + '-S', handle: 'SSAY',  label: '会話' }
      { is_update, _id: @part_id + '-M', handle: 'MSAY',  label: '人形' }
      { is_update, _id: @part_id + '-W', handle: 'WSAY',  label: '人狼' }
      { is_update, _id: @part_id + '-P', handle: 'PSAY',  label: '結社' }
      { is_update, _id: @part_id + '-G', handle: 'GSAY',  label: '墓下' }
      { is_update, _id: @part_id + '-F', handle: 'FSAY',  label: '発泡' }
      { is_update, _id: @part_id + '-X', handle: 'XSAY',  label: '妖精' }
      { is_update, _id: @part_id + '-T', handle: 'TITLE', label: '黒地' }
    ]
  head: ->
    titleTemplate: "#{@book_id} %swiki"

</script>
