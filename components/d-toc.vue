<template lang="pug">
div(v-on="movespace()")
  table(v-if="show" v-on="markup_event()")
    tbody
      tr
        th
        th(ref="curtain0")
      tr(v-for="(o, line) in book.parts.list", :key="o.id")
        th.r.form(style="white-space: nowrap")
          nuxt-link.tooltip-top(replace, :to="page_url(o.id, 0)" :data-tooltip="part_label(o.id)" :class="{ active: o.id === part_id }")
            | {{o.label}}
            sup {{ chat_size(o.id, mode) }}
        th.l.form(v-if="in_curtain(0)")
          nuxt-link.cite-in.page(v-for="idx in page_all_idxs(o.id)" replace :to="page_url(o.id, idx)" :class="page_btn_class(o.id, idx)" :key=" o.id + idx " :cite="page_label(o.id, idx)")
            | {{ idx + 1 }}
        tform(v-else)
          del ...
</template>

<script lang="coffee">
timerange = require "~/components/filters/timerange"
{ Query } = require "memory-orm"

module.exports =
  mixins: [
    require('~/plugins/pager')
    require('~/plugins/markup-event')
    require("~/plugins/curtain") [
      "curtain0"
    ]
  ]
  props: ["book", "chats", "mode", "part_id", "search", "page_by", "page_idx", "chat_size"]

  methods:
    part_label: (part_id)->
      timerange Query.chats.reduce[part_id][@mode]

    page_all_idxs: (part_id)->
      [0..(@chat_size(part_id, @mode) / @page_by)]

    page_url: (part_id, page_idx)->
      idx = part_id
      page = 1 + page_idx
      query: { @mode, idx, page, @search }

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
    show: ->
      @book?.parts.list.length

</script>
<style lang="sass" scoped>
.page
  text-align: center
  width: 3.5ex

.header
  padding-left: 20px

</style>
