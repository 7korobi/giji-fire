<template lang="pug">
nuxt-link.item.active(replace :to="back_url" @click.native="bookmark")
  i.mdi.mdi-map-marker
  | {{ star }}
</template>
<script lang="coffee">
{ idx_with, vuex_readonly, relative_to } = require '~/plugins/struct'
{ firestore_models } = require "~/plugins/firebase"
{ Query } = require "memory-orm"

book_ids = idx_with null, 'book', 'part'

module.exports =
  mixins: [
    firestore_models "markers",
      -> "marker"
      -> @uid && @part_id
      (ref)-> ref.where('uid','==', @uid ).where('part_id', '==', @part_id )
  ]

  props: ['back_url']

  computed: {
    ...vuex_readonly 'firebase', ['user']
    ...book_ids "idx_a"
    uid: -> @user?.uid
    idx: -> @back_url?.query?.idx
    idx_a: -> @idx?.split("-")
    _id: ->
      if @uid
        "#{@idx}-#{@uid}"
    url: ->
      relative_to @$route, @back_url.query

    markers: -> @uid && Query.markers.own(@uid)
    star: ->    @uid && @markers?.find(@_id)?.url && "⭐️"
  }

  methods:
    bookmark: ->
      if @star
        @markers_del @_id
      else
        write_at = new Date - 0
        @markers_add { @_id, @uid, @book_id, @part_id, @url, write_at }

</script>