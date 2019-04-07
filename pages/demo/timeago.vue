<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
  c-report(head="リアルクロックテスト" sign="ななころび" handle="SSAY")
    timeago(v-for="(time, idx) in times", :key="idx", :since="time.at")
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
</template>

<script lang="coffee">
module.exports =
  data: (req)->
    now = new Date() - 0
    clicks: 0
    name: if req then 'server' else 'client'
    times: [[-3610..-3590]...,Infinity,[-70..-50]...,Infinity,[50..70]...,Infinity,[3590..3610]...].map (t)->
      at: now - t * 1000
  head: ->
    title: "About Page (#{this.name}-side)"
  methods:
    reset: (idx)->
      @clicks++
      @times[idx].at = new Date() - -62000
</script>
