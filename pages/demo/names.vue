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

  .fullframe.VSSAY
    | いつも見ている人名辞典を検索可能にしてみました。
    hr
    article.fine.column
      div(v-for="o in countries")
        btn(:class="{ PSAY: work_names[o.id] }" v-model="spot_id" :as="o.id") {{ o.id }}
        | {{ o.country.join(" / ") }}
      span
        btn(v-model="spot_id" as="all") ---
  br
  .fullframe.VSSAY
    search(v-model="search")
    article.fine
      | ({{ work_names_size }})件hit
      btn(v-model="limit" :as="1000") 1K
      btn(v-model="limit" :as="3000") 3K
      btn(v-model="limit" :as="5000") 5K
      btn(v-model="limit" :as="9000") 9K
    article.fine.column(v-if="work_names_size < limit")
      div(v-for="id in work_names_order" :style="work_names_style")
        btn(v-model="spot_id" :as="id") {{ id }}
        table
          tbody
            tr(v-for="oo in work_names[id].list")
              td {{ oo.name }}
              td {{ oo.spell }}
    article.fine.column(v-else)
      | ※ 検索結果が多すぎます。

  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
</template>
<style lang="sass">
.fullframe
  .column
    column-width: 25ex
    column-rule-style: dashed
    column-rule-width: 1px

    table
      width: 100%
      tbody
        width: 100%
        tr
          td
            padding: 0

</style>
<script lang="coffee">
{ Set, Query } = require 'memory-orm'
{ pushState, replaceState } = require "vue-petit-store"

{ country, name, timestamp } = require '~/yaml/work_namedb.yml'

console.log timestamp
Set.work_country.set country
Set.work_name.set name

module.exports =
  mixins: [
    replaceState "tag_id"
    replaceState "limit"
    pushState "spot_id"
    pushState "search"
  ]
  data: ->
    tag_id: "all"
    spot_id: "all"
    search: ""
    limit: 1500
  computed:
    work_names_size: ->
      @work_names_query.list.length

    work_names_query: ->
      Query.work_names.by_page @spot_id, @search

    work_names_order: ->
      (@work_names_query.reduce.spot_size || []).map (o)-> o.id

    work_names: ->
      @work_names_query.reduce.spot || {}

    work_names_style: ->
      spots = @work_names_query.reduce.spot_size
      top   = spots[0].count
      width = spots.length
      full  = @work_names_query.reduce.list.length
      return {} if width < 3

      if (full / 3) < top
        {}
      else
        breakInside: "avoid"

    countries: ->
      Query.work_countrys.list

    name_blanks: ->
      @name_counts.from.remain

    name_counts: ->
      Query.faces.name_head(@tag_id)

</script>
