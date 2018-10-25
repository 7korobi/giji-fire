<script lang="coffee">
{ relative_to } = require "~/plugins/struct"
{ Query } = require "~/plugins/memory-record"

module.exports =
  props: ["mode", "part_id", "chat_id"]
  methods:
    mode_to: (mode)->
      switch @mode
        when "memo"
          idx = @part_id
        else
          idx = @part_id || @chat_id
      idx = @chat_id || @part_id
      relative_to @$route, { mode, idx }

    size: (mode)->
      Query.chats.reduce?[@part_id]?[mode]?.set.length

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
      sup {{ size("memo") }}
    nuxt-link(:to="mode_to('full')")
      | バレ
      sup {{ size("full") }}
  span(v-else)
  span
    nuxt-link(:to="mode_to('normal')")
      | 通常
      sup {{ size("normal") }}
  span(v-if="secret")
    nuxt-link(:to="mode_to('solo')")
      | 独り言
      sup {{ size("solo") }}
    nuxt-link(:to="mode_to('extra')")
      | 非日常
      sup {{ size("extra") }}
    nuxt-link(:to="mode_to('rest')")
      | 墓休み
      sup {{ size("rest") }}
  span
</template>

