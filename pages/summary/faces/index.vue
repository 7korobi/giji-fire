
<template lang="pug">
div
  c-post(handle="SSAY")
    | {{ faces.list.length }}人を表示しています。
    ul
      li 人気度
      li
        a キャラクター名（詳細へリンク）
      li ♥ いちばん沢山、そのキャラクターで遊んだプレイヤー
  c-report(handle="header" deco="center")
    tags(v-model="tag_id")
  c-report(handle="header" deco="center")
    btn(as="order"        v-model="order") 基本
    btn(as="story_length" v-model="order") 登場回数
    btn(as="fav_count"    v-model="order") 偏愛度
    btn(as="date_max"     v-model="order") 新着度
    btn(as="date_min"     v-model="order") 古参度

  .fullframe
    transition-group.portrates(name="list" tag="div")
      portrate(v-for="face in faces.list", :face_id="face.id", :key="face.id")
        p(v-if="'fav_count' == order")
          | ♥{{face.fav_count}}回
        p(v-else)
          | 登場{{face.story_length}}回

        p(v-if="'date_max' == order")
          timeago(format="short", :since="face.date_max")
        p(v-if="'date_min' == order")
          timeago(format="short", :since="face.date_min")
        nuxt-link(:to="face.summary_url")
          p {{ face.chr_jobs.list[0].job }}
          p {{ face.name }}
        p
          | ♥{{ face.sow_auth_id }}

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
      push:
        order: "date_max"
        tag_id:  "all"
  ]

  computed:
    faces: ->
      console.log @
      Query.faces.aggregate(@tag_id, @order)

</script>

<style lang="stylus" scoped>
.chrblank
  a
    display: block
</style>

