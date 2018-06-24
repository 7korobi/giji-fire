
<template lang="pug">
div
  c-post(handle="footer")
    bread-crumb
  c-post(handle="SSAY")
    | {{ chrs.length }}人を表示しています。
    ul
      li 人気度
      li
        a キャラクター名（詳細へリンク）
      li ♥ いちばん沢山、そのキャラクターで遊んだプレイヤー
  c-report(handle="header" deco="center")
    tags(v-model="tag_id")

    hr
    table(style="width: 100%")
      tbody
        tr
          td
            btn(as="" v-model="search")
              | 検索
          td
            input(style="width: 97%; " v-model="search" size="10")

  c-report(handle="header" deco="center")
    btn(as="order"        v-model="order") 基本
    btn(as="story_length" v-model="order") 登場回数
    btn(as="fav_count"    v-model="order") 偏愛度
    btn(as="date_max"     v-model="order") 新着度
    btn(as="date_min"     v-model="order") 古参度

  .fullframe
    transition-group.portrates(name="list" tag="div")
      portrate(v-for="chr in chrs" :face_id="chr.face_id" :key="chr.face_id")
        p(v-if="'fav_count' == order")
          | ♥{{chr.face.fav_count}}回
        p(v-else)
          | 登場{{chr.face.story_length}}回

        p(v-if="'date_max' == order")
          timeago(format="short", :since="chr.face.date_max")
        p(v-if="'date_min' == order")
          timeago(format="short", :since="chr.face.date_min")
        nuxt-link(:to="chr.face.summary_url")
          p {{ chr.job }}
          p {{ chr.face.name }}
        p
          | ♥{{ chr.face.sow_auth_id }}

  c-post(handle="footer")
    bread-crumb

</template>

<script lang="coffee">
{ Query } = require "~/plugins/memory-record"
_ = require "lodash"

module.exports =
  mixins: [
    require("~/plugins/get-by-mount") "12h", "aggregate/faces"
    require("~/plugins/browser-store")
      replace:
        order: "date_max"
        tag_id:  "all"
        search: ""
  ]

  computed:
    set: ->
      Query.tags.find @tag_id
    chrs: ->
      asc =
        switch @order
          when "order", "date_min"
            "asc"
          else
            "desc"
      Query.chr_jobs
      .tag(@tag_id)
      .search @search
      .sort("face.#{@order}", asc)
      .list

</script>

<style lang="stylus" scoped>
.chrblank
  a
    display: block
</style>

