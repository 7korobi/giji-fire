<template lang="pug">
table
  tbody(v-on="markup_event('click')")
    tr
      td(v-for="ankers in anker_tree_map")
        div(v-for="o in ankers" :key="o.id")
          q.cite-in(:cite="o.id" :class="anker_class(o)") {{ o.anker() || '' }}

</template>

<script lang="coffee">
{ Query } = require "memory-orm"
_ = require "lodash"

module.exports =
  mixins: [
    require('~/plugins/markup-event')
  ]
  props: ['book_id', 'chat_id', 'a']
  methods:
    anker_class: (chat)->
      if @a.includes chat.id[ @book_id.length .. ]
        [chat.phase.handle, 'bold']
      else
        [chat.phase.handle]

    anker_go: (a)->
      if chat = Query.chats.sow_cite a
        @$emit "anker", ...chat.make_ankers @chat_id

    mention_up: (root_ids, depth, ret = {})->
      for id in root_ids
        if chat = Query.chats.find id
          ret[id] = depth
          done_ids = Object.keys ret
          { mention_ids } = chat
          if mention_ids
            ids = _.difference mention_ids, done_ids
            if ids?.length
              @mention_up ids, depth - 1, ret

    mention_down: (root_ids, depth, ret = {})->
      for id in root_ids
        if chat = Query.chats.find id
          ret[id] = depth
          done_ids = Object.keys ret

          children = @mention_children id
          if children
            ids = children.map (o)-> o.id
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
    id: ->
      @chat_id
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

</script>
