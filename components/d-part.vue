<script lang="coffee">
module.exports =
  mixins: [
    require('~/plugins/book')()
    require('~/plugins/pager')
  ]
  computed:
    part_prev_id: ->
      ids = @book.parts.pluck('id')
      idx = ids.indexOf @part_id
      ids[idx - 1]

    part_next_id: ->
      ids = @book.parts.pluck('id')
      idx = ids.indexOf @part_id
      ids[idx + 1]

    show: ->
      @part_id && @book && @chats && @mode

</script>

<template lang="pug">
.center(v-if="show")
  nuxt-link(v-if="part_prev_id" :to="page_url(part_prev_id, 0)") 前の日へ
  | &nbsp;
  nuxt-link(v-if="part_next_id" :to="page_url(part_next_id, 0)") 次の日へ

</template>

