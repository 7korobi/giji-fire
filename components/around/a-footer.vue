<template lang="pug">

c-report(handle="footer", :write_at="1169852700003")
  article.r
    | 人狼議事キャラセット by りりんら
    | 管理
    q.btn
      | sol・la
    a.btn(href="mailto:7korobi@gmail.com" title="mailto:7korobi@gmail.com")
      | ななころび
    .copyright
      p.
        下記以外では、人狼議事内キャラチップの
        利用を許諾しておりません。ご了承ください
    .copyright
      p
        | 議事総合トップ
        | 人狼議事lobby
        | 人狼議事morphe
        | 人狼議事cafe
        | 人狼議事perjury
        | 人狼議事xebec
        | 人狼議事crazy
        | 人狼議事ciel
        |
        | SoyBean
        | Sangria
        | @7korobi
        | @hello_giji
        | 
        nuxt-link.copyright(to="/guideline" no-prefetch) ガイドライン

</template>
<script lang="coffee">

module.exports = {}

</script>
