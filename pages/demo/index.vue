<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
  c-post(handle="SSAY")
    nuxt-link(to="/wiki?idx=test-book") WIKI
  c-post(handle="TSAY")
    | 簡易言語
    nuxt-link(to="/demo/svg") SVG
    nuxt-link(to="/demo/marked2") marked
    nuxt-link(to="/demo/sow") sow
  c-post(handle="TSAY")
    nuxt-link(to="/demo/marked") Markdown Talk
  c-post(handle="TSAY")
    nuxt-link.button(to="/demo/oauth") OpenID
  c-post(handle="TSAY")
    nuxt-link.button(to="/demo/timeago") 時計 page
  c-post(handle="TSAY")
    nuxt-link.button(to="/demo/names") names
  c-post(handle="TSAY")
    nuxt-link.button(to="/demo/chats") chats sample
  c-post(handle="TSAY")
    nuxt-link.button(to="/sow/village/show?mode=full&idx=allstar-2-0") 村ログ(allstar-2)
  br
  c-post(handle="PSAY")
    a(charset="Shift_JIS" href="/demo/sow/crazy-index.html") sow 修正テスト crazy-index
  c-post(handle="PSAY")
    a(charset="Shift_JIS" href="/demo/sow/crazy-makevilform.html") sow 修正テスト crazy-makevilform
  c-post(handle="PSAY")
    a(charset="Shift_JIS" href="/demo/sow/crazy-chrlist.html") sow 修正テスト crazy-chrlist
  c-post(handle="PSAY")
    a(charset="Shift_JIS" href="/demo/sow/crazy-oldlog.html") sow 修正テスト crazy-oldlog
  c-post(handle="PSAY")
    a(charset="Shift_JIS" href="/demo/sow/crazy-trslist.html") sow 修正テスト crazy-trslist
  c-post(handle="PSAY")
    a(charset="Shift_JIS" href="/demo/sow/xebec-279-0-entry.html") sow 修正テスト xebec-279-0-entry
  c-post(handle="PSAY")
    a(charset="Shift_JIS" href="/demo/sow/crazy-246-3.html") sow 修正テスト crazy-246-3
  c-post(handle="PSAY")
    a(charset="Shift_JIS" href="/demo/sow/crazy-246-3-b.html") sow 修正テスト crazy-246-3-b

  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<script lang="coffee">

firebase = require "firebase"

module.exports =
  head: ->
    title: '人狼議事 - 開発者用ページ'
  data: ->
    auth_info: {}
    a: 1

</script>
