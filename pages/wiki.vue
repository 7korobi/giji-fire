<template lang="pug">
log-wiki
  template(slot="summary")
    d-mentions.inframe.mentions(v-bind="for_mentions" key="1" @anker="anker" @popup="popup")
    .inframe.TITLE
      hr
      .swipe
        search(v-model="search")        
    a-potofs(v-bind="for_potofs" key="3" v-if="is_show.potofs")

  template(slot="icons")
    .item
      i.c.mdi(:class="icon.icon")
    h6.c(:class="edit.chat.phase.handle" v-if="user && is_replacing") 編集
    a.btn.item.tooltip-left(:class="handle" @click="move" v-if="can_move" data-tooltip="編集中の投稿の並び順をこの上に")
      i.mdi.mdi-table-column-plus-before
    a.btn.item.tooltip-left(:class="handle" @click="replace_mode" v-if="can_update" data-tooltip="この投稿を編集")
      i.mdi.mdi-square-edit-outline

    btn.item(v-if="is_floats" v-model="floats" :as="{}" data-tooltip="残ってしまったポップアップを消去")
      i.mdi.mdi-filmstrip-off
      | POP

    a.btn.item.tooltip-left(:class="handle" @click="fav"  v-if="can_fav" data-tooltip="いいね！")
      i.mdi.mdi-heart-outline(v-if="true")
      i.mdi.mdi-heart(v-if="false")
    hr
    nuxt-link.item.active.tooltip-left(v-if="$route.query.back" replace :to="back_url" data-tooltip="以前の画面に戻る")
      i.mdi.mdi-backspace
      | BACK
    nuxt-link.item.active(v-else replace :to="back_url" )
      i.mdi.mdi-map-marker

    check.item(v-model="shows" as="potof")
      i.mdi.mdi-account-multiple
      | STAT
    hr

  template(slot="popup")
    popup(v-for="o in floats" v-bind="o" :key="o.id" :current="chat" @anker="anker" @popup="popup")

  c-report(handle="footer" deco="center")
    bread-crumb

  div(v-if="a.length")
    chat(v-for="o in cite_chats" @anker="anker" @focus="focus" @popup="popup" :id="o.id" :key="o.id")
  div(v-else)
    c-report.form(handle="footer" key="finder")
      search(v-model="search")
    div(v-for="(chats, idx) in page_contents", :key="idx")
      chat(v-for="o in chats" @anker="anker" @focus="focus" @popup="popup" :current="chat" :id="o.id", :key="o.id")
    div
      c-post(handle="VSSAY")
        article(v-if="! page_contents.length")
          blockquote.
            現在、この名前の項目はありません。
            誰でも編集できます。
          hr
          br
          h3 項目を新しく書くには
          ol
            li 下のアイコンから、ログインに使うサービスを選択。
            li 書き込みに使うキャラクターを選択。
            li 枠形と色味を好みできめたら、
            li
              a(target="blank" href="https://ja.wikipedia.org/wiki/Markdown") Markdown形式
              | で自由に書き込もう。
        article(v-if="page_contents.length")
          ol
            li
              a(target="blank" href="https://ja.wikipedia.org/wiki/Markdown") Markdown形式
              | で自由に書き込もう。
        article
          ol(style="list-style-type: upper-latin")
            li 画像を書き込みフォームにDrag＆Dropすると、その画像を張り付けるぞ。
            li
              abbr.mdi.mdi-square-edit-outline
              | 投稿済みのメッセージを編集できるぞ。
            li
              abbr.mdi.mdi-table-column-plus-before
              | 編集中のメッセージは、他のメッセージの上に移動できるぞ。
            li
              fcm(:topic="book_id")
              | このページ内での新規投稿を通知
          br
  c-post(handle="TSAY")
    fire-oauth(style="white-space: nowrap")
  chat-editor(v-if="user" :part_id="part_id" :phases="phases" :current="chat" @icon="icon_change" @check="check_post" @drop_image="image_post" @submit="chat_post" @create_mode="create_mode" @remove="remove" @popup="popup")
  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<style lang="sass" scoped>
.large
  font-size: 2.5ex
</style>
<script lang="coffee">
{ Query, Set, State } = require "memory-orm"
{ vuex_value } = require '~/plugins/struct'

module.exports =
  mixins: [
    require("~/plugins/for_component")
    require("~/plugins/book-show")
    require("~/plugins/book-firebase") "wiki"
  ]
  layout: 'blank'
  data: ->
    step: State.step
    mode: 'wiki' 
    floats: {}

  head: ->
    labels = [@book_id, "人狼議事wiki"]
    title: labels.join(' ')

  computed: {
    ...vuex_value "menu.potofs", ['hide_ids']
    ...vuex_value "menu.side", ["shows"]
    is_show: ->
      magnify: "magnify" in @shows
      potofs:  "potof"   in @shows

    part_id:  -> @book_id + '-top'

    page_idx: -> 0

    page_contents: ->
      @page_all_contents
  }

  methods:
    focus: (@idx)->
      @icon_change 'mdi-access-point'

  mounted: ->
    guide = true
    update = true

    Set.book.add
      _id: @book_id
    Set.part.add
      _id: @part_id
      label: 'wiki'
    Set.phase.merge [
      { update, guide, _id: @part_id + '-S', handle: 'SSAY',  label: '会話' }
      { update, guide, _id: @part_id + '-M', handle: 'MSAY',  label: '人形' }
      { update, guide, _id: @part_id + '-W', handle: 'WSAY',  label: '人狼' }
      { update, guide, _id: @part_id + '-P', handle: 'PSAY',  label: '結社' }
      { update, guide, _id: @part_id + '-G', handle: 'GSAY',  label: '墓下' }
      { update, guide, _id: @part_id + '-F', handle: 'FSAY',  label: '発泡' }
      { update, guide, _id: @part_id + '-X', handle: 'XSAY',  label: '妖精' }
      { update, guide, _id: @part_id + '-T', handle: 'TITLE', label: '黒地' }
    ]

</script>
