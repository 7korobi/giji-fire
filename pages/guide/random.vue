<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb

  c-report(handle="header" deco="center")
    | ランダムで登場する要素

  c-post.swipe(handle="SSAY" deco="giji" v-for="[id, count, deck] in decks" :key="id")
    | [[{{ id }}]]     {{ count }}通り
    table
      thead
        tr
          th 確率
          th
          th(colspan="4") 要素（複数あれば、どちらか）

      tbody
        tr(v-for="{ ratio, texts } in deck.list")
          td.r
            sup {{ ratio }}
            | /
            sub {{ deck.reduce.ratio.all }}
          td 　
          td {{ texts[0] }}
          td {{ texts[1] }}

  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<script lang="coffee">
{ Step, Query } = require "memory-orm"

module.exports =
  computed:
    decks: ->
      Query.randoms.reduce.type.map ({ count, id })->
        [ id, count, Query.randoms.deck id ]

</script>
