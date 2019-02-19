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
    c-post(v-for="({ _id, book_id, part_id, log, write_at, mark_at, url }) in marker.list" :key="_id" handle="GAIM")
      article.marker
        nuxt-link(:to="url")
          span {{ part_id }}
          abbr.pull-right
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
    width: 12em
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
    marker: ->
      Query.markers.own(@uid)

</script>
