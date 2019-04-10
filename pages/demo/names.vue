<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
  c-report(handle="header" deco="center")
    tags(v-model="tag_id")
  c-report(handle="header" deco="center")
    p 0人
    article.fine(v-if="name_blanks") {{ name_blanks.map(c=> `<${c} `).join("") }}
  c-post(handle="TSAY")
    span(v-for="name in name_blanks") <{{name}}>
  div(v-for="group, count in name_counts" v-if="0 < count", :key="count")
    transition-group.posts(name="list" tag="div")
      c-report(handle="header" deco="center", :key="'h'+count")
        p {{count}}人
        article.fine(v-if="group") {{ group.map(o=> `<${o.id} `).join("") }}
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
      span
        check(v-model="options" as="is_used") 採用済
  br
  .fullframe.VSSAY
    search(v-model="search")
    article.fine
      | ({{ work_names_size }})件hit
      btn(v-model="limit" :as="1000") 1K
      btn(v-model="limit" :as="3000") 3K
      btn(v-model="limit" :as="5000") 5K
      btn(v-model="limit" :as="9000") 9K
    article.fine.col_wide(v-if="work_names_size < limit")
      div(v-for="id in work_names_order" :style="work_names_style")
        btn(v-model="spot_id" :as="id") {{ id }}
        table
          tbody
            tr(v-for="oo in work_names[id].list")
              td.r
                component(:is="oo.is_used ? 's' : 'span'").fine {{ oo.head_used || "" }}
              td
                component(:is="oo.is_used ? 's' : 'span'") {{ oo.name }}
              td
                component(:is="oo.is_used ? 's' : 'span'") {{ oo.spell }}
    article.fine.col_wide(v-else)
      | ※ 検索結果が多すぎます。

  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
</template>
<script lang="coffee">
{ Set, Query } = require 'memory-orm'
{ pushState, replaceState } = require "vue-petit-store"

{ country, name, timestamp } = require '~/yaml/work_namedb.yml'
console.log timestamp

names = Query.faces.pluck("name")

Set.work_country.set country
Set.work_name.set name
for o in Query.work_names.list
  o.head_used = Query.faces.reduce.name_head.from[o.name[0]]?.set.length
  if names.includes o.name
    o.is_used = true


module.exports =
  mixins: [
    replaceState "tag_id"
    replaceState "limit"
    pushState "spot_id"
    pushState "search"
  ]
  data: ->
    options: []
    tag_id: "all"
    spot_id: "all"
    search: ""
    limit: 1000
  computed:
    is_used: ->
      @options.includes 'is_used'
    work_names_size: ->
      @work_names_query.list.length

    work_names_query: ->
      if @is_used
        Query.work_names
        .by_page @spot_id, @search
        .where({ @is_used })
      else
        Query.work_names
        .by_page @spot_id, @search

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

  watch:
    limit: (n, o)->
      console.log { o, n, @limit, @limit_type, @limit_default }
</script>
