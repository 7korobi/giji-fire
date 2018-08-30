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
      p(v-if="anker")
        abbr.fine.btn(title="クリップボードへコピー" @click="clip") {{ long_anker }}
  .swipe
    div(:class="chat.phase.handle")
      hr
      h6 anker map
      hr
      table
        tbody
          tr()
            td(v-for="ankers in anker_tree_map")
              div(v-for="o in ankers")
                q(:class="o.phase.handle" :cite="o.id" @click="anker_go(o.id)") {{ o.anker(part_id) }}
      hr
      h6 参照されている
      hr
    table
      tbody.tlist
        tr-intro-chat(v-for="o in mentions" v-on="$listeners" :key="o.id" :id="o.id" :handle="o.phase.handle" :deco="o.deco" :log="o.log")
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
_ = require "lodash"

module.exports =
  props: ['part_id', 'chat_id', 'page_idx']
  methods:
    clip: (e)->
      range = document.createRange()
      range.selectNode e.target
      window.getSelection().addRange range
      document.execCommand 'copy'

    anker_go: (a)->
      if chat = Query.chats.sow_cite a
        @$emit "anker", ...chat.make_ankers @chat_id

    mention_up: (root_ids, depth, ret = {})->
      for id in root_ids
        ret[id] = depth

        { mention_ids } = Query.chats.find id
        done_ids = Object.keys ret
        if mention_ids
          ids = _.difference mention_ids, done_ids
          if ids?.length
            @mention_up ids, depth - 1, ret

    mention_down: (root_ids, depth, ret = {})->
      for id in root_ids
        ret[id] = depth

        children = @mention_children id
        done_ids = Object.keys ret
        if children
          ids = children.map (o)-> o.id
          console.log { root_ids, depth, done_ids, ids }
          ids = _.difference ids, done_ids
          if ids?.length
            @mention_down ids, depth + 1, ret

    mention_step: (root_ids, depth, ret = {})->
      for id in root_ids
        ret[id] = depth

        children = @mention_children(id)
        { mention_ids } = Query.chats.find id
        done_ids = Object.keys ret
        if mention_ids
          ids = _.difference mention_ids, done_ids
          if ids?.length
            @mention_step ids, depth - 1, ret

        if children
          ids = children.map (o)-> o.id
          ids = _.difference ids, done_ids
          if ids?.length
            @mention_step ids, depth + 1, ret

    mention_children: (id)->
      Query.chats.reduce?.mention_to?[id]

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

    anker_tree_map: ->
      scan = {}
      @mention_up   [@chat_id], 0, scan
      @mention_down [@chat_id], 0, scan
      base_depth = Math.min ...Object.values scan
      tree = []
      for id, scan_depth of scan
        
        depth = scan_depth - base_depth
        tree[depth] ?= []
        tree[depth].push Query.chats.find id
      tree

    long_anker: ->
      if @chat
        prefix = if @mark? then '>>' else ''
        "(#{prefix}#{@chat.anker() || ''} #{@name || ''})"
      else
        ""

    mentions: ->
      @mention_children @chat_id

</script>
