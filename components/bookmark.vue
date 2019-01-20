<template lang="pug">
.item.tooltip-left.active(v-if="has_bookmark" data-tooltip="読み進めた位置")
  i.mdi.mdi-bookmark-check
  | Bookmark
.item.tooltip-left(v-else)
</template>
<script lang="coffee">
firebase = require "firebase"
{ path, vuex_value } = require '~/plugins/struct'
{ firebase_snaps } = require "~/plugins/firebase"

module.exports =
  mixins: [
    firebase_snaps "bookmark", "has_bookmark", -> @_db.collection("user/#{ @user.uid }/bookmarks").where("book_id","==", @book_id )
  ]

  props: ['chat_id', 'write_at']

  data: ->
    _bookmark:
      book_id: ""
      chat_id: ""
      write_at: 0

  computed: {
    ...vuex_value 'firebase',['user', 'bookmark']
    book_id: ->
      @chat_id.split("-")[0..1].join("-")
    is_news: ->
      @_bookmark.write_at < @write_at
    has_bookmark: ->
      @user?.uid && @book_id
  }
  watch:
    write_at: ->
      if @is_news
        @bookmark

</script>