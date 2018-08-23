<template lang="pug">
div(v-if="chat")
  .stable(:class="chat.phase.handle")
    hr
    p.left(v-if="sign") by {{ sign || '' }}
    p.center
      | {{ label }}
      abbr(v-if="anker" title="クリップボードへコピー" @click="clip") {{ anker || '' }}
    p.right
      timeago(v-if="chat.write_at" :since="chat.write_at")
    p
      abbr(v-if="long_anker" title="クリップボードへコピー" @click="clip") {{ long_anker }}
  .swipe
    div(:class="chat.phase.handle")
      hr
      h6 参照されている
      hr
    table
      tbody.tlist
        tr-intro-chat(v-for="o in mentions" v-on="$listeners", :key="o.id", :id="o.id", :handle="o.phase.handle", :deco="o.deco", :log="o.log")
</template>

<style lang="sass" scoped>
p
  padding: 0 2px
  user-select: text

table
  width: 100%
  border-collapse: collapse;
</style>

<script lang="coffee">
{ Query } = require "~/plugins/memory-record"

module.exports =
  props: ['part_id', 'chat_id', 'page_idx']
  methods:
    clip: (e)->
      range = document.createRange()
      range.selectNode e.target
      window.getSelection().addRange range
      document.execCommand 'copy'

  computed:
    chat: ->
      Query.chats.find @chat_id
    mark: ->   @chat?.phase?.mark
    sign: ->   @chat?.potof?.sign
    name: ->   @chat?.potof?.face?.name
    anker: ->  @chat?.anker @part_id

    long_anker: ->
      if @chat
        prefix = if @mark then '>>' else ''
        "(#{@name || ''} #{prefix}#{@chat.anker() || ''} )"
      else
        ""

    label: ->
      page = "p#{1 + @page_idx}"
      if @chat
        part = @chat.part?.label
        phase = @chat.phase?.label
        if part && phase
          return "#{part} #{page} #{phase}"
      return ""

    mentions: ->
      Query.chats.reduce?.mention_to?[@chat_id]

</script>
