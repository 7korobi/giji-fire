<template lang="pug">
nuxt-link.item.active(replace :to="back_url" @click.native="bookmark")
  i.mdi.mdi-map-marker
  | {{ star }}
</template>
<script lang="coffee">
{ relative_to, firestore_models, vuex_read, path_by } = require "vue-petit-store"

{ Query } = require "memory-orm"

module.exports =
  mixins: [
    path_by "idx", [null, 'book', 'part']
    vuex_read 'firebase', ['user']
    firestore_models "markers",
      -> "marker"
      -> @uid && @part_id
      (ref)-> ref.where('uid','==', @uid ).where('part_id', '==', @part_id )
  ]

  props: ['back_url', 'log', 'write_at']

  computed:
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

  methods:
    bookmark: ->
      if @star
        @markers_del @_id
        @$toasted.success "#{@idx} から栞をぬく"
      else
        mark_at = new Date - 0
        log = @log.replace /(<br>|\n| )+/g, " "
        @markers_add { @_id, @uid, @book_id, @part_id, log, @url, @write_at, mark_at }
        @$toasted.success "#{@idx} に栞をさす"


</script>