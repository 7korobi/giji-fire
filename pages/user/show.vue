<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
  
  fire-oauth(handle="TSAY")

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
        nuxt-link(:to="all_markers_url(id)")
          | 一覧
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
{ firestore_models, share } = require "vue-petit-store"
{ Query } = require 'memory-orm'

module.exports =
  mixins: [
    share 'user'
    share 'sign'
    share 'credential'
    firestore_models "markers",
      -> @uid && "marker"
      (ref)-> @uid && ref.where('uid','==', @uid )
  ]
  computed:
    uid: -> @user?.uid
    mark_at: ->
      Query.markers.own(@uid).reduce?.mark_at ? {}
  methods:
    all_markers_url: (idx)->
      a = @marker_for(idx).pluck("anker")
      name: 'sow-village-show'
      query: { a, idx }
        
    del_marker: (id)->
      for { _id } in @marker_for(id).list
        @markers_del _id
    marker_for: (book_id)->
      Query.markers.where({ @uid, book_id })

</script>
