<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ

  no-ssr
    div
      c-report(head="tiptap TEST" sign="ななころび" handle="SSAY" style="z-index: 10")
        tiptap-editor(v-model="text" @submit="console")

      c-report(head="tiptap TEST result" sign="ななころび" handle="SSAY" deco="ql-editor" :log="text")
      c-report(head="tiptap TEST result" sign="ななころび" handle="SSAY" deco="ql-editor")
        textarea(v-model="text")

  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
</template>

<script lang="coffee">
module.exports =
  data: (req)->
    text: ""
    chat:
      part_id: "edit-edit-edit"
  methods:
    console: ->
      console.log arguments
</script>
