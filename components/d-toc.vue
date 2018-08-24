<script lang="coffee">
timerange = require "~/components/filters/timerange"

module.exports =
  mixins: [
    require('~/plugins/pager')
  ]
  props: ["search", "book", "chats", "part_id", "current"]
  methods:
    part_label: (part_id)->
      [ min,..., max ] = @chats(part_id)
      return "" unless min
      [ min, ...] = min
      return "" unless max
      [ ...,  max] = max
      min = min.write_at
      max = max.write_at
      range = max - min
      timerange { min, max, range }

    page_url: (part_id, page_idx)->
      return unless part_id && data = @chats(part_id)
      idx = part_id
      page = 1 + page_idx
      query: { @mode, idx, page, @search }

    page_label: (part_id, page_idx)->
      [ min,..., max ] = @chats(part_id)[page_idx]
      # min = min.write_at
      # max = max.write_at
      # range = max - min
      # timerange { min, max, range }
      min?.anker()


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
    page_idx: ->
      @chats(@part_id).page_idx @current

    show: ->
      @book?.parts.list.length

</script>

<template lang="pug">
table(v-if="show")
  tbody
    tr(v-for="(o, line) in book.parts.list", :key="o.id")
      th.r.form(style="white-space: nowrap")
        nuxt-link.tooltip-top(replace, :to="page_url(o.id, 0)", :data-tooltip="part_label(o.id)", :class="{ active: o.id === part_id }")
          | {{o.label}}
          sup {{ chats(o.id).all }}
      th.l.form.detail
        nuxt-link.page.tooltip-top(v-for="(_, page_idx) in chats(o.id)" replace, :to="page_url(o.id, page_idx)", :data-tooltip="page_label(o.id, page_idx)", :class="page_btn_class(o.id, page_idx)", :key=" o.id + page_idx ")
          | {{ page_idx + 1 }}
</template>

<style lang="sass" scoped>
.page
  text-align: center
  width: 3.5ex

.header
  padding-left: 20px

</style>
