<script lang="coffee">
{ relative_to } = require "~/plugins/struct"

module.exports =
  props: ["mode", "part_id", "chat_id", "chat_size"]
  methods:
    mode_to: (mode)->
      switch @mode
        when "memo"
          idx = @part_id
        else
          idx = @part_id || @chat_id
      idx = @chat_id || @part_id
      relative_to @$route, { mode, idx }

  computed:
    secret: ->
      true
    show: ->
      @part_id

</script>
<style lang="sass" scoped>
p
  overflow: hidden
</style>
<template lang="pug">
p(v-if="show")
  span(v-if="secret")
    nuxt-link(:to="mode_to('memo')")
      i.mdi.mdi-notebook
      | メモ
      sup {{ chat_size(part_id, "memo") }}
    nuxt-link(:to="mode_to('full')")
      | バレ
      sup {{ chat_size(part_id, "full") }}
  span(v-else)
  span
    nuxt-link(:to="mode_to('normal')")
      | 通常
      sup {{ chat_size(part_id, "normal") }}
  span(v-if="secret")
    nuxt-link(:to="mode_to('solo')")
      | 独り言
      sup {{ chat_size(part_id, "solo") }}
    nuxt-link(:to="mode_to('extra')")
      | 非日常
      sup {{ chat_size(part_id, "extra") }}
    nuxt-link(:to="mode_to('rest')")
      | 墓休み
      sup {{ chat_size(part_id, "rest") }}
  span
</template>

