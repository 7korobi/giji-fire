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
        li(v-if="user && ! sign") #[nuxt-link(to="/user/edit") サインを記帳]します。他の人に見せるために使います。
      
      table(v-if="sign")
        tbody
          tr
            td(colspan=2) ID欄に「{{ book_id_chk }}」と書いて作成ボタンを押そう。
          tr
            td.r
              label(style="display: block" for="book_id") ID
            td
              input#book_id(v-model="book_id")
          tr
            td.r
              label(style="display: block" for="label") 名称
            td
              input#label(v-model="label")
              img.mark(:src="o.path" v-for="o in use_marks")
          tr
            td.c
              a.btn(@click="shuffle") 🎲
            td
              btn(:value="book_id" :as="book_id_chk" @toggle="create") 作成

    c-post(handle="MAKER")
      btn(v-model="mark_ids" :as="[]")
        i.mdi.mdi-eraser
      check(v-for="o in marks" v-model="mark_ids" :as="o.id")
        img.mark(:src="o.path")
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
    mark_ids: []
    book_id: ""
    label: ""

  computed:
    folder_id: -> 
      "fire"
    book_id_chk:->
      "#{@folder_id}-#{@book_idx - -0}"
    book_idx: ->
      Query
      .books.in_folder @folder_id
      .reduce.idx?.max ? 0
    use_marks: ->
      Query.marks.finds @mark_ids
    marks: ->
      Query.marks.where(enable: true).list

  created: ->
    @shuffle()

  methods:
    shuffle: ->
      tarot = Query.randoms.choice("tarot").label
      planet = Query.randoms.choice("planet").label
      @label = "#{planet}の#{tarot}"

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

        @label
        @mark_ids
        _id: @book_id

        tag_id: "giji"
        face_id: "c05"
        locale_id: "heavy"

        say_id: "weak"
        winner_id: "NONE"

        option_ids: ["undead-talk", "aiming-talk"]
        role_ids: []

        uid: @user.uid
        sign: @sign.sign
        tempo: { range, gap, now_idx }
      }
      @$toasted.success "ゲームを開催します。細かい設定を調整しましょう。"
      @$router.push "/game"
  head: ->
    titleTemplate: "#{@book_id} %s"

</script>
