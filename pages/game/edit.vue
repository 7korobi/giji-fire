<template lang="pug">
log-wiki
  template(slot="summary")
    a-potofs(v-bind="for_potofs" key="3" v-if="is_show.potofs")

  c-report(handle="footer" deco="center")
    bread-crumb

  fire-oauth(handle="TSAY")

  e-potof(:tag_ids="tag_ids" :value="npc_potof" @input="npc_join" @tag_ids="tag_ids_update")
  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<script lang="coffee">
{ Query, Set } = require 'memory-orm'
{ to_tempo, vuex, localStorage, firestore_model, firestore_models } = require "vue-petit-store"

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
    require("~/plugins/for_component")
  ]
  layout: 'blank'
  data: ->
    tag_id: ""
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

    tag_ids: ->
      (@book?.tag_ids) || Query.tags.pluck "id"

    npc_potof: ->
      Query.potofs.find "#{@book_id}-NPC"

  methods:
    tag_ids_update: (tag_ids)->
      @book_add {
        tag_ids
      }

    npc_join: ({ tag_id, job, face_id })->
      return unless @game.init
      uid   = @user.uid
      sign  = @sign.sign
      idx   = "NPC"
      potof_id = "#{@book_id}-NPC"

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
      @cards_add {
        write_at
        _id: "#{potof_id}-master"
        role_id: 'master'
        MAKER: Infinity
      }

  head: ->
    titleTemplate: "#{@book_id} %s"

</script>
