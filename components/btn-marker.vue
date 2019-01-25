<template lang="pug">
nuxt-link.item.active(replace :to="back_url" @click.native="bookmark")
  i.mdi.mdi-map-marker
  | {{ star }}
</template>
<script lang="coffee">
firebase = require "firebase"
{ vuex_readonly, relative_to } = require '~/plugins/struct'
{ firestore_models } = require "~/plugins/firebase"
{ State, Query } = require "memory-orm"

module.exports =
  mixins: [
    firestore_models "markers",
      -> "marker"
      -> @uid && @part_id
      (ref)-> ref.where('uid','==', @uid ).where('part_id', '==', @part_id )
  ]

  props: ['back_url']

  data: ->
    step: State.step

  computed: {
    ...vuex_readonly 'firebase',['user']
    uid: ->
      @user?.uid
    _id: ->
      if @uid
        @back_url?.query?.idx
    book_id: ->
      @_id?.split("-")?[0..1].join("-")
    part_id: ->
      @_id?.split("-")?[0..2].join("-")
    url: ->
      relative_to @$route, @back_url.query

    markers: -> Query.markers
    star: ->
      if @markers.find(@_id)?.url then "⭐️" else ""
  }

  methods:
    bookmark: ->
      write_at = new Date - 0
      if @star
        @markers_del @_id
      else
        @markers_add { @_id, @uid, @book_id, @part_id, @url, write_at }

</script>