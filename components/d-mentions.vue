<template lang="pug">
div(v-if="chat")
  .stable(:class="chat.phase.handle")
    article.text
      hr
      p.left(v-if="sign") by {{ sign || '' }}
      p.center(v-if=" part && page ")
        | {{ part }} {{ page }}
      p.center(v-if=" phase && anker ")
        | {{ phase }}
        abbr.fine.btn(title="クリップボードへコピー" @click="clip") {{ anker || '' }}
      p.right(v-if="at")
        timeago(:since="at")
      p(v-if="long_anker")
        abbr.fine.btn(title="クリップボードへコピー" @click="clip") {{ long_anker }}
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
abbr.btn
  user-select: all

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
    at: ->     @chat?.write_at
    part: ->   @chat?.part?.label
    phase: ->  @chat?.phase?.label
    mark: ->   @chat?.phase?.mark
    sign: ->   @chat?.potof?.sign
    name: ->   @chat?.potof?.face?.name
    anker: ->  @chat?.anker @part_id
    page: ->   "p#{1 + @page_idx}"

    long_anker: ->
      if @chat
        prefix = if @mark then '>>' else ''
        "(#{prefix}#{@chat.anker() || ''} #{@name || ''})"
      else
        ""

    mentions: ->
      Query.chats.reduce?.mention_to?[@chat_id]

</script>
