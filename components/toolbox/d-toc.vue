<template lang="pug">
div(:class="page_view" v-on="col_space")
  table(v-if="show" v-on="markup_event()")
    tbody
      tr
        th
        th(v-col)
      tr(v-for="(o, line) in book.parts.list", :key="o.id")
        th.r.form.TITLE(style="white-space: nowrap")
          nuxt-link(replace, :to="page_url(o.id, 0)" :class="{ active: o.id === part_id }")
            | {{o.label}}
            sup {{ chat_size(o.id, mode) }}
        th.l.form.TITLE.pages(v-if="is_swipe_page || col_left[0]")
          nuxt-link.cite-in.page(v-for="idx in page_all_idxs(o.id)" replace :to="page_url(o.id, idx)" :class="page_btn_class(o.id, idx)" :key=" o.id + idx " :cite="page_label(o.id, idx)")
            | {{ idx + 1 }}
        th.form(v-else)
          del ...
</template>

<script lang="coffee">
{ Query } = require 'memory-orm'
{ curtain, simple_route } = require "vue-petit-store"

module.exports =
  mixins: [
    require('~/app/plugins/pager')
    require('~/app/plugins/markup-event')
    curtain 'col'
  ]
  props: ["book", "chats", "mode", "part_id", "chat_size", "search", "page_by", "page_idx", "options"]

  data: ->
    col: []

  methods:
    page_all_idxs: (part_id)->
      [0..(@chat_size(part_id, @mode) / @page_by)]

    page_url: (part_id, page_idx)->
      idx = part_id
      page = 1 + page_idx
      simple_route  query: { @mode, idx, page, @search }

    page_label: (part_id, page_idx)->
      [ min,..., max ] = @chats(@mode, part_id)[page_idx] ? []
      min?.id

    page_btn_class: (part_id, page_idx)->
      return [] unless @part_id == part_id
      switch
        when @page_idx == page_idx
          ["active"]
        when @pager.head_idx <= page_idx <= @pager.tail_idx
          ["contain"]
        else
          []
  computed:
    is_swipe_page: ->
      @options.includes("swipe_page")
    page_view: ->
      if @is_swipe_page
        "swipe"
      else
        "wrap"

    show: ->
      @book?.parts.list.length

</script>
<style lang="sass" scoped>
.swipe tbody th:nth-of-type(1)
  position: sticky
  left: 0

.pages
  height: 1em

.pages:hover
  height: reset

.page
  text-align: center
  width: 3.5ex

.header
  padding-left: 20px

</style>
