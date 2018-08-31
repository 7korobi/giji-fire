<template lang="pug">
log-wiki
  template(slot="summary")
    d-mentions.inframe.mentions(v-bind="for_mentions" key="1" @anker="anker")
    .inframe.TITLE
      hr
      .swipe
        search(v-model="search")        
    a-potofs(v-bind="for_potofs" key="3" v-if="is_show.potofs")

  template(slot="icons")
    .item
      i.c.mdi(:class="icon.icon")
    h6.c(:class="edit.chat.phase.handle" v-if="user && is_replacing") 編集
    a.btn.item(:class="handle" @click="move" v-if="can_move")
      i.mdi.mdi-table-column-plus-before
    a.btn.item(:class="handle" @click="replace_mode" v-if="can_update")
      i.mdi.mdi-square-edit-outline
    a.btn.item(:class="handle" @click="fav"  v-if="can_fav")
      i.mdi.mdi-heart-outline(v-if="true")
      i.mdi.mdi-heart(v-if="false")
    hr
    nuxt-link.item.active(replace :class="handle" :to="back_url")
      i.mdi.mdi-backspace(v-if="a.length")
      i.mdi.mdi-map-marker(v-else)
    check.item(v-model="shows" as="potof")
      i.mdi.mdi-account-multiple
    hr

  c-report(handle="footer" deco="center")
    bread-crumb

  div(v-if="a.length")
    chat(v-for="o in cite_chats" @anker="anker" @focus="focus" :id="o.id" :key="o.id")
  div(v-else)
    c-report.form(handle="footer" key="finder")
      search(v-model="search")
    div(v-for="(chats, idx) in page_contents", :key="idx")
      chat(v-for="o in chats" @anker="anker" @focus="focus" :current="chat" :id="o.id", :key="o.id")
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
  e-potof(v-if="user && is_creating" v-model="edit.potof")
  c-report(v-if="user && is_replacing" handle="header" deco="center") 編集中

  chat(v-if="user && edit.potof.face_id" :id="edit.chat._id" :current="chat" @check="check_post" :edit="true" v-model="edit.chat.log")
  c-report(v-if="user && edit.potof.face_id" :handle="edit.chat.phase.handle")
    text-editor(v-model="edit.chat.log" v-bind="for_editor" @icon="icon_change" @drop_image="image_post" @submit="chat_post")
      select(v-if="is_creating" v-model="edit.phase.handle" key="handle")
        option(v-for="phase in phases" :value="phase.handle" :class="phase.handle" :key="phase.handle") ∞ {{ phase.label }}

      select(v-model="edit.chat.show" key="show")
        option(value="post")   描写
        option(value="talk")   会話
        option(value="report") 看板 
      select(v-model="edit.chat.head" key="head")
        option(value="") 無地
        option(:value="edit.potof.head") 記名
      select(v-model="edit.chat.deco" key="deco")
        option(value="giji")  文字
        option(value="diagram") 作図
      span.pull-right(v-if="is_replacing")
        a.btn.active(@click="create_mode")
          i.mdi.mdi-open-in-new
        a.btn.active(@click="remove")
          i.mdi.mdi-comment-remove-outline

  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<style lang="sass" scoped>
.large
  font-size: 2.5ex
</style>
<script lang="coffee">
{ Query, Set, State } = require "~/plugins/memory-record"
{ vuex_value } = require '~/plugins/struct'

module.exports =
  mixins: [
    require("~/plugins/for_component")
    require("~/plugins/book-show")
    require("~/plugins/book-firebase") "wiki"
  ]
  layout: 'blank'
  data: ->
    { step: State.step, mode: 'wiki' }

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
