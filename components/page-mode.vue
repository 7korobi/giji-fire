<script lang="coffee">
{ relative_to } = require "~/plugins/struct"

module.exports =
  mixins: [
    require('~/plugins/book')()
  ]
  methods:
    mode_to: (mode)->
      switch @mode
        when "title", "memo"
          idx = @part_id
        else
          idx = @chat_id || @part_id
      name: "sow-village-idx-mode"
      params: { mode, idx }
      query: @$route.query
      hash:  @$route.hash

  computed:
    secret: ->
      true
    show: ->
      @part_id && @now

</script>

<template lang="pug">
.center(v-if="show")
  span
    nuxt-link(:to="mode_to('title')")
      | タイトル
      sup {{ now.title(part_id).all }}
  span(v-if="secret")
    nuxt-link(:to="mode_to('memo')")
      | メモ
      sup {{ now.memo(part_id).all }}
    nuxt-link(:to="mode_to('full')")
      | バレ
      sup {{ now.full(part_id).all }}
  span(v-else)
  span
    nuxt-link(:to="mode_to('normal')")
      | 通常
      sup {{ now.normal(part_id).all }}
  span(v-if="secret")
    nuxt-link(:to="mode_to('solo')")
      | 独り言
      sup {{ now.solo(part_id).all }}
    nuxt-link(:to="mode_to('extra')")
      | 非日常
      sup {{ now.extra(part_id).all }}
    nuxt-link(:to="mode_to('rest')")
      | 墓休み
      sup {{ now.rest(part_id).all }}
  span
</template>

