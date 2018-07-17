<script lang="coffee">
module.exports =
  mixins: [
    require('~/plugins/pager')
  ]
  props: ["mode", "book", "chats", "part_id"]
  methods:
    page_url: (part_id, page_idx)->
      return unless part_id && data = @chats(part_id)
      idx = part_id
      query: { @mode, idx, page: page_idx + 1 }

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
      @part_id && @book && @chats && @mode

</script>

<template lang="pug">
.center(v-if="show")
  nuxt-link(v-if="part_prev_id" :to="page_url(part_prev_id, 0)") {{ label(part_prev_id) }}へ戻る
  | &nbsp;
  nuxt-link(v-if="part_next_id" :to="page_url(part_next_id, 0)") {{ label(part_next_id) }}へ進む

</template>

