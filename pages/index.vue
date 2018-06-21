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
    | 更新履歴
    hr
    a(href="https://github.com/7korobi/giji-fire/commits/master") 総合トップ
    a(href="https://github.com/7korobi/giji-sow-api/commits/master") 村ログAPI
    a(href="https://github.com/7korobi/giji_rails/commits/master") 村ログ収集・キャラ更新
    a(href="https://github.com/7korobi/sow-giji/commits/cabala") ゲーム
    a(href="https://github.com/7korobi/sow-giji/commits/show-fix") ゲーム（新）
    span
    a(href="https://api-project-54633717694.firebaseapp.com/") テストサイト

  c-post.form(handle="SSAY")
    nuxt-link(to="/rule-guide") 人狼議事のルール
    br
    .card 人狼議事を遊ぶとき、従うべきルールはこちら。

  c-post.form(handle="VSAY")
    nuxt-link(to="/chr/list") キャラクター一覧表
    br
    .card 人狼議事で遊ぶことができるキャラクターはこちら。
    hr
    nuxt-link(to="/chr/sort") キャラクター並べ替えゲーム
    br
    .card 人狼議事キャラソートを作ってみました。長い！
    hr
    nuxt-link(to="/summary/faces") キャラクター活躍記録
    br
    .card どこかの村で活躍したことのあるキャラクターはこちら。

  c-report(handle="footer" deco="center") 開始待ちの村／進行中の村
  c-post(handle="EVIL", v-for="o in progress", :head="o.name", :key="o._id")
    a(:href="o.folder.href") {{ o.folder.nation }}{{ o.vid }}
    | は、進行中だ。
    .date
      timeago(:since="o.timer.nextcommitdt")
  c-post(handle="MOB",  v-for="o in prologue", :head="o.name", :key="o._id")
    a(:href="o.folder.href") {{ o.folder.nation }}{{ o.vid }}
    | は、開始が楽しみだ。
    .date
      timeago(:since="o.timer.nextcommitdt")

  c-report(handle="footer" deco="center")
    nuxt-link(to="/demo") 開発者用ページ
</template>
<script lang="coffee">
{ Step, Query } = require "~/plugins/memory-record"

module.exports =
  mixins: [
    require("~/plugins/get-by-mount") "1h", "sow/progress"
  ]
  computed:
    user: ->
      @$store.state.user
    mypage: ->
      return null unless @user?._id
      "mypage"
    prologue: ->
      Query.sow_villages.prologue.list
    progress: ->
      Query.sow_villages.progress.list

</script>
<style lang="stylus" scoped>
.card
  padding: 10px 0 10px 20px
</style>
