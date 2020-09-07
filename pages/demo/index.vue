<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
  c-post(handle="SSAY")
    nuxt-link(to="/game/new") BOOK
  c-post(handle="SSAY")
    nuxt-link(to="/wiki?idx=test-book") WIKI
  c-post(handle="SSAY")
    nuxt-link(to="/demo/fancy-date") 架空歴

  c-post(handle="VGSAY")
    nuxt-link.button(to="/demo/locations" no-prefetch) 住所録
  c-post(handle="VGSAY")
    nuxt-link(to="/demo/device") Device

  c-post(handle="VGSAY")
    a(href="https://weathernews.jp/onebox/?type=day") 天気予報
  c-post(handle="TSAY")
    | 簡易言語
    nuxt-link(to="/demo/sow") sow
    | &nbsp;
    nuxt-link(to="/demo/trix") Trix
    | &nbsp;
    nuxt-link(to="/demo/slate") Slate
    | &nbsp;
    nuxt-link(to="/demo/sow") SOW
    | &nbsp;
  c-post(handle="TSAY")
    nuxt-link.button(to="/demo/oauth") OpenID
  c-post(handle="TSAY")
    nuxt-link.button(to="/demo/timeago") 時計 page
  c-post(handle="TSAY")
    nuxt-link.button(to="/demo/chats") chats sample
  c-post(handle="TSAY")
    nuxt-link.button(to="/sow/village/show?mode=full&idx=allstar-2-0") 村ログ(allstar-2)
  br
  c-post(handle="PSAY")
    a(href="/demo/sow.zip") 人狼議事ゲームサイト見た目修正案

  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<script lang="coffee">

module.exports =
  head: ->
    title: '人狼議事 - 開発者用ページ'
  data: ->
    auth_info: {}
    a: 1

</script>
