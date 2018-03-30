<template lang="pug">
c-post.form(handle="SSAY" deco="giji")
  code {{ book.id }}
  strong {{ book.label }}
  hr
  table
    tbody
      tr
        th.r 参加者
        td.r {{ book.chat.player }}名
        th.r 発言
        td   {{ say.CAPTION }}
        th.r 更新
        td
          | {{ book.chat.next_at }}
          code(v-if="book.chat.interval === '1d'") 一日毎
          code(v-if="book.chat.interval === '2d'") 二日毎
          code(v-if="book.chat.interval === '3d'") 三日毎
          code(v-if="book.chat.night !== '0'") 夜{{ book.chat.night.replace('m','分') }}
      tr
        th.r 見物人
        td.r {{ book.chat.mob }}名
        th.r 投票
        td(colspan="5")
          span(v-if="book.game.vote === 'sign'") 記名
          span(v-if="book.game.vote === 'hide'") 匿名
          span(v-if="-1 < book.option.indexOf('vote_entrust')") 委任
          code(v-if="-1 < book.game.vote_by.indexOf('live')") 生存者
          code.VSAY(v-if="-1 < book.game.vote_by.indexOf('mob')") 見物人(陪審員)
          code.GSAY(v-if="-1 < book.game.vote_by.indexOf('grave')") 墓下(陪審員)
  hr
  code(v-if="0 < book.chat.password") 合言葉
  code(v-if="-1 < book.option.indexOf('sign_show')") ID公開
  code.AIM(v-if="-1 < book.option.indexOf('talk_aim')" title="個人的な耳打ちができる。") 内緒話
  code.WSAY(v-if="-1 < book.option.indexOf('talk_secret_grave')" title="狼・妖精と死者との間で会話ができる。") 幽界トーク
  code.VSAY(v-if="-1 < book.option.indexOf('talk_mob_grave')" title="見物人と死者との間で会話ができる。") 裏方見物人
  code.VSAY(v-if="-1 < book.option.indexOf('talk_mob_alive')" title="見物人と生存者、死者との間で会話ができる。") 舞台見物人
  code(v-if="-1 < book.option.indexOf('role_select')") 役職希望を募る

</template>
<script lang="coffee">
{ Query } = require "~/plugins/memory-record"
{ nation, village } = require "../yaml/rule.yml"
_ = require "lodash"

module.exports =
  props: ['book']
      
  data: ->
    ui:
      ables: []
  
  methods:
    commit: ->
      @_events.input[0] { @book, @potof }
    tag: (id)->
      Query.tags.find(id)

  computed:
    say: -> Query.says.find @book.chat.limit

</script>

<style lang="stylus" scoped>
th.t
  vertical-align: top
label
  white-space: nowrap
</style>
