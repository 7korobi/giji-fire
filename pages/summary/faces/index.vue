
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
    search(v-model="search")

  c-report(handle="header" deco="center" style="position: sticky; top: 0px")
    btn(as="order"        v-model="order") 基本
    btn(as="story_length" v-model="order") 登場回数
    btn(as="fav_count"    v-model="order") 偏愛度
    btn(as="date_max"     v-model="order") 新着度
    btn(as="date_min"     v-model="order") 古参度
    a.btn(@click="do_shuffles") 🎲

  no-ssr
    .fullframe
      transition-group.portrates(name="list" tag="div")
        portrate(v-for="(chr, idx) in chrs" :face_id="chr.face_id" :key="chr.face_id" :style="{ order: chr.q[order] }")
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
{ poll, replaceState } = require "vue-petit-store"
{ Query } = require 'memory-orm'
_ = require "lodash"

module.exports =
  mixins: [
    poll -> [["aggregate/faces", 3 ]] # version
    replaceState "order"
    replaceState "tag_id"
    replaceState "search"
  ]

  data: ->
    order: "date_max"
    tag_id:  "all"
    search: ""
    shuffle:
      at: 0
      size: 4

  computed:
    set: ->
      Query.tags.find @tag_id

    chrs_range: ->
      Query
      .chr_jobs
      .tag(@tag_id)
      .search @search

    chrs: ->
      @shuffle.at
      asc =
        switch @order
          when "order", "date_min"
            "asc"
          else
            "desc"
      if @order != "random"
        for o, idx in @chrs_range.sort("face.#{@order}", asc).list
          o.q[@order] = idx
      @chrs_range.list

  methods:
    do_shuffles: ->
      sum = 0
      t = 200
      @order = "random"

      for o, idx in @chrs
        @chrs[idx].q.random = idx

      while 100 < t
        sum += t
        setTimeout @do_shuffle, sum
        t *= 0.99

      while t < 500
        sum += t
        setTimeout @do_shuffle, sum
        t *= 1.3

    do_shuffle: ->
      { size, at } = @shuffle
      for i in [0...size]
        idx = ( at + i ) % @chrs.length
        r = parseInt 1e9 * Math.random()
        @chrs[idx].q.random = r

      @shuffle.at += size

  head: ->
    titleTemplate: "#{ @set.label } - %s"

</script>

