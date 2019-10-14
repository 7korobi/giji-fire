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
        tbody(v-if="is_progress")
          tr
            td.center …処理中…
        tbody(v-else)
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
      check(v-for="o in marks" v-model="mark_ids" :as="o.id" :key="o.id")
        img.mark(:src="o.path")
  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<script lang="coffee">
format = require "date-fns/format"
{ Query, Set } = require 'memory-orm'
{ share, localStorage, firestore_model, firestore_models, to_tempo } = require "vue-petit-store"
{ nation, village } = require "~/yaml/rule.yml"

module.exports =
  mixins: [
    firestore_models "books",  -> "game"
    firestore_models "parts",  -> @book_id && "game/#{@book_id}/parts"
    firestore_models "phases", -> @book_id && "game/#{@book_id}/phases"
    firestore_models "chats",  -> @book_id && "game/#{@book_id}/chats"
    share "user"
    share "sign"
    localStorage "shows"
    localStorage "options"
  ]
  layout: 'blank'
  data: ->
    options: ["impose"] # impose
    shows: [] # pin, toc, potof, current, search
    mark_ids: []
    book_id: ""
    label: ""

  computed:
    folder_id: -> 
      "fire"
    book_id_chk: ->
      "#{@folder_id}-#{@book_idx - -1}"
    part_id: ->
      "#{@book_id}-top"
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
      gap   = "23h0m"
      uid   = @user.uid
      sign  = @sign.sign
      { book_id, part_id } = @
      console.warn { book_id, part_id }
      { now_idx, write_at, last_at, next_at } = to_tempo(range, gap)
      @books_add {
        write_at
        last_at
        next_at
        is_epilogue: false
        is_finish:   false

        @label
        @mark_ids

        _id: book_id

        face_id: "c05"
        locale_id: "heavy"

        say_id: "weak"
        winner_id: "NONE"

        option_ids: ["undead-talk", "aiming-talk"]
        role_ids: []

        uid
        sign
        tempo: { range, gap, now_idx }
      }
    
      @parts_add {
        write_at
        _id: part_id

        is_update: true
        uid
        sign
        label: 'タイトル'
      }

      @phases_add {
        write_at
        _id: part_id + '-M'

        is_update: true
        uid
        sign
        handle: 'TITLE'
        group: 'S'
        label: '黒幕'
      }

      write_at++
      @chats_add {
        write_at
        _id: part_id + '-M-title'
        uid
        sign
        show: 'report'
        deco: 'logo'
        mention_ids: []
      }

      write_at++
      @chats_add {
        write_at
        _id: part_id + '-M-welcome'
        uid
        sign
        show: 'report'
        deco: 'trix'
        mention_ids: []
        log: """<p>（村のルールは、自由に編集できるよ！）</p>"""
      }

      v_rules = for {head} in village.list
        "<li>#{head}</li>"
      write_at++
      @chats_add {
        write_at
        _id: part_id + '-M-vrule'
        uid
        sign
        show: 'report'
        deco: 'trix'
        mention_ids: []
        log: """<h3>村のルール</h3><ol>#{v_rules.join("")}</ol>"""
      }

      n_rules = for {head} in nation.list
        "<li>#{head}</li>"
      write_at++
      @chats_add {
        write_at
        _id: part_id + '-M-nrule'
        uid
        sign
        show: 'report'
        deco: 'trix'
        mention_ids: []
        log: """<h3>国のルール</h3><ol>#{n_rules.join("")}</ol>"""
      }

      @$toasted.success "ゲームを開催します。細かい設定を調整しましょう。"
      @$router.push
        path:  "/game/show"
        query:
          mode: 'full'
          idx: "#{part_id}-top-M-title"

  head: ->
    titleTemplate: "#{@book_id} %s"

</script>
