<template lang="pug">
log-wiki
  template(slot="summary")
    a-potofs(v-bind="for_potofs" key="3" v-if="is_show.potofs")

  c-report(handle="footer" deco="center")
    bread-crumb

  fire-oauth(handle="TSAY")
  template(v-if="book")
    c-report(handle="TITLE" deco="logo" :book="form")
    e-game(v-bind.sync="form" :bans.sync="bans" :warns.sync="warns")
    e-options(v-model="form.option_ids" :bans.sync="bans" :warns.sync="warns")
    e-say(v-model="form.say_id" :bans.sync="bans" :warns.sync="warns")
    e-tags(v-model="form.tag_ids" :bans.sync="bans" :warns.sync="warns")
    component(is="c-report" :id="`${book_id}-top-M-welcome`" v-bind.sync="welcome" :bans.sync="bans" :warns.sync="warns")
    component(is="c-report" :id="`${book_id}-top-M-vrule`"   v-bind.sync="vrule"   :bans.sync="bans" :warns.sync="warns")
    chat(:id="book.id + '-top-M-nrule'")
    e-locale(v-model="form.locale_id" :bans.sync="bans" :warns.sync="warns")
    e-npc(v-bind.sync="npc" :tag_ids="form.tag_ids" :bans.sync="bans" :warns.sync="warns")
    p-intro(:locale_id="form.locale_id" :chr_npc_id="npc.chr_npc_id")
    e-roles(v-model="form.role_ids" :potof_max="form.potof_max" :bans.sync="bans" :warns.sync="warns")

    c-post(handle="TITLE" v-if="is_edit")
      a.btn(@click="form_save")
        | 編集内容を保存する
      p {{ phase }}
    c-post.ban(handle="F0" v-if="bans.length")
      p(v-for="msg in bans") {{ msg }}
    c-post.ban(handle="F1" v-if="warns.length")
      p(v-for="msg in warns") {{ msg }}

  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<script lang="coffee">
_ = require 'lodash'
{ Query, Set } = require 'memory-orm'
{ to_tempo, to_msec, vuex, localStorage, firestore_model, firestore_models } = require "vue-petit-store"

{ form } = require "~/plugins/form"


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

    require("~/plugins/book-show")
    require("~/plugins/book-firebase")
    require("~/plugins/for_component")

    form  'npc', ->
      job: ""
      face_id: "c99"
      chr_npc_id: "c99"
    , ->
      Query.potofs.find "#{@book_id}-NPC"

    form 'form', ->
      uid: ""
      sign: ""
      label: ""
      potof_max: 5

      option_ids: []
      role_ids: []
      mark_ids: []
      tag_ids: []

      locale_id: ""
      say_id: ""

      range:   "1日"
      gap: "23時30分"
      gap_days: ""
      off: "5分"
      now_idx: 0
    , -> @book

    form 'welcome', ->
      log: """<p>（村のルールは、自由に編集できるよ！）</p>"""
    , ->
      Query.chats.find "#{@book_id}-top-M-welcome"

    form 'vrule', ->
      log: ''
    , ->
      Query.chats.find "#{@book_id}-top-M-vrule"
  ]
  layout: 'blank'
  data: ->
    bans: []
    warns: []

    floats: {}
    options: ["impose"] # impose
    shows: [] # pin, toc, potof, current, search


  computed:
    phase: ->
      Query.phases.find "#{@book_id}-top-M"

    is_edit: ->
      return false if @bans.length
      @is_form_edit || @is_npc_edit　

    game: ->
      return {} unless @book
      [ part_top, part_0 ] = Query.parts.finds(["#{@book.id}-top","#{@book.id}-0"])
      [ potof_npc ] = Query.potofs.finds(["#{@book.id}-NPC"])

      if @user && @book
        edit_book = @user.uid == @book.uid
        edit_npc  = @user.uid == potof_npc?.uid
        init = edit_book && part_top?.is_update

      if @edit
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

  methods:
    form_save: ->
      @book_add { _id: @book_id, ...@form }
      @set_potof @user.uid, @sign.sign, "#{}-NPC", @npc
      @cards_add
        write_at: new Date().getTime()
        _id: "#{@book_id}-NPC-master"
        role_id: 'master'
        MAKER: Infinity

    set_potof: (uid, sign, potof_id, o)->
      { range, gap_days, gap } = @form
      { now_idx, write_at, last_at, next_at } = to_tempo range, gap_days + gap

      @my_icon_change {
        _id: uid
        mdi: "mdi-account"
        potof_id
      }
      @potofs_add {
        write_at
        _id: potof_id
        uid
        sign
        @part_id
        ...o
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
      @$toasted.success "ゲームを編集しました。"
      @$router.push
        path:  "/game/show"
        query:
          mode: 'full'
          idx: "#{@part_id}-top-M-title"

  head: ->
    titleTemplate: "#{@book_id} %s"

</script>
