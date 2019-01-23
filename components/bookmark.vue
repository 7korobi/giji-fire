<template lang="pug">
nuxt-link.item.tooltip-left(v-if="label" :data-tooltip="label.full" :to="at")
  i.mdi.mdi-bookmark-check
  | {{ label.mini }}
.item.tooltip-left(v-else)
</template>
<script lang="coffee">
firebase = require "firebase"
{ path, vuex_readonly, relative_to } = require '~/plugins/struct'
{ firebase_snap } = require "~/plugins/firebase"

module.exports =
  mixins: [
    firebase_snap "bookmark", "has_bookmark", (db)-> db.doc("user/#{ @user.uid }/bookmarks/#{ @book_id }")
  ]

  props: ['mode', 'chat_id', 'write_at']

  data: ->
    bookmark:
      mode:    ""
      book_id: ""
      chat_id: ""
      write_at: 0

  computed: {
    ...vuex_readonly 'firebase',['user']
    book_id: ->
      @chat_id?.split("-")[0..1].join("-")
    is_enable: ->
      return false unless @chat_id && @write_at
      true
    has_bookmark: ->
      @user?.uid && @book_id
    has_label: ->
      return false unless @has_bookmark
      return true  unless @write_at
      return false unless @bookmark?.write_at > @write_at
      return true
    label: ->
      return unless @has_label
      full: "読み進めた場所まで移動します。"
      mini: "Go"
    at: ->
      { chat_id, mode } = @bookmark
      idx = chat_id
      page = "back"
      o = relative_to @$route, { mode, idx, page }
      console.log o
      o
  }

  watch:
    write_at: _.debounce ->
      return unless @is_enable
      return unless ! @bookmark || @bookmark.write_at < @write_at
      @bookmark_add { @mode, @book_id, @chat_id, @write_at }
    , 2000,
      leading: false
      trailing: true


</script>