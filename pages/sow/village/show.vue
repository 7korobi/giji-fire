
<template lang="pug">
log-show(:part='part' :page_idx="page_idx" :chat_id="chat_id" :back_url='back_url' @anker="anker")
  c-post(handle="footer")
    bread-crumb
      li
        nuxt-link(:to="folder_url") 終了した村一覧

  no-ssr
    div
      c-report.form(handle="footer" key="finder")
        d-mode
        d-part

      div(v-if="mode == 'memo'")
        c-report.form(handle="footer")
          span
            btn(v-model="mode", as="memos")
              i.mdi.mdi-timer
          span 最新のメモを表示しています。

      div(v-if="mode == 'memos'")
        c-report.form(handle="footer")
          span
            btn(v-model="mode", as="memo")
              i.mdi.mdi-timer-off
          span メモ掲載の一覧を表示しています。

      div(v-for="(chats, idx) in page_contents", :key="idx")
        chat(v-for="o in chats" @anker="anker" @focus="focus" :current="chat" :id="o.id", :key="o.id")

      c-report.form(v-if="page_next_idx" handle="footer" key="limitup")
        .center
          scroll-mine(@input="page_add", :as="page_next_idx") 次頁

      c-report.form(v-else handle="footer" key="limitup")
        d-part
        d-mode

  c-post(handle="footer")
    bread-crumb
      li
        nuxt-link(:to="folder_url") 終了した村一覧

</template>


<style lang="stylus" scoped>
</style>

<script lang="coffee">
module.exports =
  mixins: [
    require("~/plugins/get-by-mount") "30d", "sow/story", -> @book_id
    require('~/plugins/pager')
    require('~/plugins/book')
      loader: true
  ]

  layout: 'blank'
  head: ->
    labels = [@part, @book].map (o)-> o?.label
    labels.push "人狼議事"
    title: labels.join(' ')

  methods:
    focus: (@idx)->
    anker: (book_id, a)->
      @$router.push
        path: "./anker"
        query: { a, @back, idx: @part_id }

  computed:
    folder_url: ->
      "/sow/village?folder_id=#{@folder_id.toUpperCase()}"

    page_all_contents: ->
      @chats(@part_id)

</script>
