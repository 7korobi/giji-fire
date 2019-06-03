<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ

  c-report(head="SVG TEST" sign="ななころび" handle="SSAY")
    sow-view(v-model="text")
  c-report(handle="SSAY")
    text-edit(deco="sow" v-model="text" :rows="7" :maxRow="20" :maxSize="999")

  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
</template>

<script lang="coffee">
module.exports =
  data: (req)->
    text: ""
</script>
