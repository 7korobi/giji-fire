<script lang="coffee">
timerange = require "~/components/filters/timerange"

module.exports =
  mixins: [
    require('~/plugins/book')()
    require('~/plugins/pager')
  ]
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

    page_label: (part_id, page_idx)->
      [ min,..., max ] = @chats(part_id)[page_idx]
      min = min.write_at
      max = max.write_at
      range = max - min
      timerange { min, max, range }

    page_btn_class: (part_id, page_idx)->
      if @part_id == part_id && @pager.head_idx <= page_idx <= @pager.tail_idx
        ["nuxt-link-exact-active"]
      else
        []
  computed:
    show: ->
      @book?.parts && "toc" in @$store.state.menu.shows

</script>

<template lang="pug">
.inframe.TITLE(v-if="show")
  hr
  .swipe
    page-mode.form(style="white-space: nowrap")
    hr
    table
      tbody
        tr(v-for="(o, line) in book.parts.list", :key="o.id")
          th.r.form
            nuxt-link.tooltip-top(replace, :to="page_url(o.id, 0)", :data-tooltip="part_label(o.id)", :class="{ active: o.id === part_id }")
              | {{o.label}}
              sup {{ chats(o.id).all }}
          th.l.form
            nuxt-link.page.tooltip-top(v-for="(_, page_idx) in chats(o.id)" replace, :to="page_url(o.id, page_idx)", :data-tooltip="page_label(o.id, page_idx)", :class="page_btn_class(o.id, page_idx)", :key=" o.id + page_idx ")
              | {{ page_idx + 1 }}

</template>

<style lang="stylus" scoped>
.page
  text-align: center

.header
  padding-left: 20px

</style>
