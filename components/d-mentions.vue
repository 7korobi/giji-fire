<template lang="pug">
div(v-if="chat")
  .stable(:class="chat.phase.handle")
    hr
    strong.fine.text
      p.left(v-if="sign")
        | by {{ sign || '' }}
      p.left(v-if="anker" style="white-space: nowrap")
        abbr.btn(title="クリップボードへコピー" @click="clip") {{ long_anker }}
      p.right
        span.pull-left(v-if="part && page")
          | {{ part }} {{ page }}
        timeago(:since="at")
      p.right
        span(v-if="phase") {{ phase }}
        span(v-if="anker" title="クリップボードへコピー" @click="clip")
          abbr.btn {{ anker || '' }}
</template>

<style lang="sass" scoped>
abbr.btn
  user-select: all

p
  padding: 0 2px
  user-select: text
</style>

<script lang="coffee">
{ Query } = require 'memory-orm'
_ = require "lodash"

module.exports =
  props: ['book_id', 'chat_id', 'page_idx']
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
    anker: ->  @chat?.anker()
    page: ->   "p#{1 + @page_idx}"

    long_anker: ->
      if @chat
        prefix = if @mark? then '>>' else ''
        "(#{prefix}#{@chat.anker() || ''} #{@name || ''})"
      else
        ""

</script>
