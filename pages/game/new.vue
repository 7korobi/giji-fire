<template lang="pug">
log-wiki
  template(slot="toasts")
    check.item.tooltip-left(v-model="options" as="impose" data-tooltip="詳細情報を拡げる操作の ON / OFF")
      i.mdi.mdi-arrow-expand-right
    check.item.tooltip-left(v-model="options" as="swipe_page" data-tooltip="ページ一覧を一列にする / 折り返す")
      i.mdi.mdi-gesture-swipe

  c-report(handle="footer" deco="center")
    bread-crumb

  fire-oauth(handle="TSAY")

  div
    c-post(handle="VSSAY")
      h3 ゲームを開催する
      hr
      ol
        li 上のアイコンから、ログインに使うサービスを選択。
        li あなたがロボットでないなら、入力ボックスに{{ book_id_chk }}と書いて作成ボタンを押そう。
        li
          input(v-model="book_id")
          btn(:value="book_id" :as="book_id_chk" @toggle="create") 作成

  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<script lang="coffee">
format = require "date-fns/format"
{ Query, Set, State } = require 'memory-orm'
{ vuex, localStorage, firestore_model, firestore_models, to_tempo } = require "vue-petit-store"

module.exports =
  mixins: [
    firestore_models "books",  -> "game"
    vuex "user", on: "firebase"
    vuex "sign", on: "firebase"
    localStorage "shows"
    localStorage "options"
  ]
  layout: 'blank'
  data: ->
    step: State.step
    options: ["impose"] # impose
    shows: [] # pin, toc, potof, current, search
    book_id: ""

  computed:
    folder_id: -> 
      "fire"
    book_id_chk:->
      "#{@folder_id}-#{@book_idx - -0}"
    book_idx: ->
      Query
      .books.in_folder @folder_id
      .reduce.idx?.max ? 0

  methods:
    create: ->
      range = "1d"
      gap = "23h0m"
      { now_idx, write_at, last_at, next_at } = to_tempo(range, gap)
      await @books_add {
        write_at
        last_at
        next_at
        is_epilogue: false
        is_finish:   false

        _id: @book_id

        tag_id: "giji"
        face_id: "c05"
        locale_id: "heavy"

        say_id: "weak"
        winner_id: "NONE"

        option_ids: ["undead-talk", "aiming-talk"]

        rating: ""
        uid: @user.uid
        sign: @sign.sign
        label: format new Date, "M月d日に開催するゲーム"
        tempo: { range, gap, now_idx }
        card:
          config: []
      }
      @$toasted.success "ゲームを開催します。細かい設定を調整しましょう。"
      @$router.push "/game"
  head: ->
    titleTemplate: "#{@book_id} %s"

</script>
