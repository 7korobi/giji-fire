<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
  c-report(handle="header" deco="center")
    tags(v-model="tag_id")
  c-report(handle="header" deco="center") 0人
  c-post(handle="TSAY")
    span(v-for="name in name_blanks") <{{name}}>
  div(v-for="group, count in name_counts" v-if="0 < count", :key="count")
    transition-group.posts(name="list" tag="div")
      c-report(handle="header" deco="center", :key="'h'+count") {{count}}人
      c-post(v-for="map in group" handle="SSAY", :key="map.id")
        | <{{map.id}}> {{ map.set.join("、") }}
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
</template>

<script lang="coffee">
{ Query } = require "memory-orm"
{ replaceState } = require "~/plugins/browser-store"

module.exports =
  mixins: [
    replaceState "tag_id"
  ]
  data: ->
    tag_id: "all"
  computed:
    name_blanks: ->
      Query.faces.name_blank()

    name_counts: ->
      Query.faces.name_head(@tag_id)

</script>
