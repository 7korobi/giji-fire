<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ

  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
</template>
<script lang="coffee">
{ Set, Query } = require 'memory-orm'
{ pushState, replaceState } = require "vue-petit-store"

geo = require '~/yaml/work_geo_orm.yml'
Set.work_location.reset geo

module.exports =
  mixins: [
  ]
  data: ->
    options: []
    search: ""
    limit: 1000
  computed:
    is_used: ->
      @options.includes 'is_used'
</script>
