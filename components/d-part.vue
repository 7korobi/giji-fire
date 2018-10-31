<script lang="coffee">
{ Query } = require "memory-orm"

module.exports =
  mixins: [
    require('~/plugins/pager')
  ]
  props: ["mode", "book", "part_id"]
  methods:
    page_url: (idx)->
      query: { @mode, idx, page: 1 }

    label: (part_id)->
      @book.parts.find(part_id)?.label
  computed:
    part_ids: ->
      @book.parts.pluck('id')

    part_prev_id: ->
      ids = @part_ids
      idx = ids.indexOf @part_id
      ids[idx - 1]

    part_next_id: ->
      ids = @part_ids
      idx = ids.indexOf @part_id
      ids[idx + 1]

    show: ->
      @part_id && @book && @mode

</script>

<template lang="pug">
p(v-if="show")
  nuxt-link(v-if="part_prev_id" :to="page_url(part_prev_id)") {{ label(part_prev_id) }}へ戻る
  | &nbsp;
  nuxt-link(v-if="part_next_id" :to="page_url(part_next_id)") {{ label(part_next_id) }}へ進む

</template>

