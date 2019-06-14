<template lang="pug">
div(v-if="chat")
  .stable(:class="chat.phase.handle")
    hr
    strong.fine.text
      p.center(v-if="star")
        nuxt-link(:to="star_url") {{ star }}
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
        span(title="クリップボードへコピー" @click="clip")
          abbr.btn {{ anker || '' }}
</template>

<style lang="sass" scoped>
abbr.btn
  user-select: all

p
  padding: 0 2px
  user-select: text

time
  display: inline-block

</style>

<script lang="coffee">
{ Query, State } = require 'memory-orm'
{ share, relative_to } = require "vue-petit-store"
_ = require "lodash"

module.exports =
  mixins: [
    share 'user'
  ]
  props: ['book_id', 'chat_id', 'page_idx', 'back']
  data: ->
    step: State.step

  computed:
    uid: -> @user?.uid
    marker_id: ->
      if @uid
        "#{@chat_id}-#{@uid}"

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

    star_url: ->
      a = @markers.pluck("anker")
      idx = @chat_id
      query: { a, @back, idx }


    markers: -> @uid && Query.markers.own(@uid)
    marker: -> @uid && @markers?.find(@marker_id)
    star: -> @marker?.url && "⭐️"

    long_anker: ->
      if @chat
        prefix = if @mark? then '>>' else ''
        "(#{prefix}#{@chat.anker() || ''} #{@name || ''})"
      else
        ""

  methods:
    clip: (e)->
      range = document.createRange()
      range.selectNode e.target
      window.getSelection().addRange range
      document.execCommand 'copy'


</script>
