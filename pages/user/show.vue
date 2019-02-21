<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
  
  c-post(handle="TSAY")
    fire-oauth(style="white-space: nowrap")

  c-post(handle="SSAY" v-if="user && sign")
    article
      .name
        sup.pull-right {{ sign.sign }}
      hr
      div(v-html="sign.introduction")

  c-post(handle="SSAY" v-if="user")
    nuxt-link(to="/user/edit") 編集

  c-report(handle="footer")
    p #[i.mdi.mdi-map-marker] 栞
  div(v-if="uid")
    div(v-for="({ id }) in mark_at")
      c-post(handle="GAIM")
        | {{ id }}
        button.pull-right(@click="del_marker(id)")
          i.mdi.mdi-delete-forever
        hr
        article.marker(v-for="({ _id, book_id, part_id, log, write_at, mark_at, url }) in marker_for(id).list" :key="_id")
          nuxt-link(:to="url")
            timeago(:since="mark_at || write_at")
          span(v-html="log")

  c-report(handle="footer" deco="center")
    bread-crumb
</template>

<style lang="sass" scoped>
.marker
  overflow: hidden
  white-space: nowrap
  a
    width: 5em
</style>

<script lang="coffee">
{ firestore_models } = require "~/plugins/firebase"
{ vuex_read } = require "~/plugins/vue-struct"
{ Query } = require "memory-orm"

module.exports =
  mixins: [
    vuex_read "firebase", ["user", "credential", "sign"]
    firestore_models "markers",
      -> "marker"
      -> @uid
      (ref)-> ref.where('uid','==', @uid )
  ]
  computed:
    uid: -> @user?.uid
    mark_at: ->
      Query.markers.own(@uid).reduce?.mark_at ? {}
  methods:
    del_marker: (id)->
      for { _id } in @marker_for(id).list
        @markers_del _id
    marker_for: (book_id)->
      Query.markers.where({ @uid, book_id })

</script>
