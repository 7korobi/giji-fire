<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ

  no-ssr
    div
      c-report(head="Quill TEST" sign="ななころび" :handle="chat.handle" style="z-index: 10")
        quill-editor(v-model="text" @submit="console")
          select(v-model="chat.handle" key="handle")
            option(value="SSAY") 発言
            option(value="WSAY") 囁き
            option(value="TSAY") 独り言

      c-report(head="Quill TEST result" sign="ななころび" :handle="chat.handle" :deco="chat.deco" :log="text")
      c-report(head="Quill TEST result" sign="ななころび" :handle="chat.handle" :deco="chat.deco")
        textarea(v-model="text")

  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
</template>

<script lang="coffee">
module.exports =
  mixins: [
    require('~/plugins/markup-event')
  ]
  data: (req)->
    text: ""
    potof:
      head: "てすと"
    chat:
      handle: "SSAY"
      deco: "quill"
      part_id: "edit-edit-edit"
  methods:
    console: ->
      console.log arguments
</script>
