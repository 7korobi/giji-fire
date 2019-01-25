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
    | 栞
  c-post(handle="GAIM" v-for="({ _id, book_id, part_id, write_at, url }) in markers.list" :key="_id")
    span {{ book_id }}
    abbr
      timeago(:since="write_at")
    nuxt-link(:to="url")
      i.mdi.mdi-map-marker {{ _id }}

  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<script lang="coffee">
firebase = require "firebase"
{ vuex_readonly } = require "~/plugins/struct"
{ firestore_models } = require "~/plugins/firebase"
{ State, Query } = require "memory-orm"

module.exports =
  mixins: [
    firestore_models "markers",
      -> "marker"
      -> @uid
      (ref)-> ref.where('uid','==', @uid )
  ]
  data: ->
    step: State.step

  computed: {
    ...vuex_readonly "firebase", ["user", "credential", "sign"]
    uid: -> @user?.uid
    markers: -> Query.markers.own(@uid)
  }

</script>
