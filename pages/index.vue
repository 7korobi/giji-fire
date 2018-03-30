<template lang="pug">
div
  br
  c-post(handle="XSAY", :write_at="1169852700003")
    p 祝！人狼議事10周年！
    app-logo

  c-report(handle="footer" deco="center" v-if="mypage") ロビー
  c-post.form(handle="TSAY" v-if="mypage")
    nuxt-link(:to="mypage") あなたの情報
  c-report(handle="footer" deco="center") みんなの情報
  c-post.form(handle="SSAY")
    a(href="https://github.com/7korobi/giji-nuxt/commits/master") 総合トップ
    a(href="https://github.com/7korobi/sow-giji/commits/cabala") ゲーム
    a(href="https://github.com/7korobi/sow-giji/commits/show-fix") ゲーム（新）
    .card 人狼議事を構成するプログラムの、更新履歴はこちら。

  c-post.form(handle="SSAY")
    nuxt-link(to="/rule-guide") 人狼議事のルール
    br
    .card 人狼議事を遊ぶとき、従うべきルールはこちら。

  c-post.form(handle="VSAY")
    nuxt-link(to="/character-tag") キャラクター一覧表
    br
    .card 人狼議事で遊ぶことができるキャラクターはこちら。

  c-report(handle="footer" deco="center")
    nuxt-link(to="/demo") 開発者用ページ
</template>
<script lang="coffee">
{ Step, Query } = require "~/plugins/memory-record"

module.exports =
  mixins: [
  ]
  computed:
    user: ->
      @$store.state.user
    mypage: ->
      return null unless @user?._id
      "mypage"

</script>
<style lang="stylus" scoped>
.card
  padding: 10px 0 10px 20px
</style>
