<template lang="pug">
div(v-if="face.story_length")
  c-post(handle="footer")
    bread-crumb
      li
        nuxt-link(to="/summary/faces") キャラクター活躍記録
  c-report(handle="footer" deco="center")
    h1 {{ face.name }}の活躍
    .date
      | #[timeago(:since="face.date_min")] ～ #[timeago(:since="face.date_max")]
  c-talk(handle="TSAY" deco="giji", :face_id="face.id", :head="face.name")
    | #[b {{ face.lives.sum }}]人が村にいました。
    .flex
      a.label3(v-for="o in face.lives", :class="o._id.live")
        .label {{ o.role.label }}
        .count {{ o.story_ids.length }}回
    | 全部で#[b {{ face.roles.length }}]種類、のべ#[b {{ face.roles.sum }}]の能力を持ちました。
    .flex
      a.label3(v-for="o in face.roles", :class="o.role.win")
        .label {{ o.role.label }}
        .count {{ o.story_ids.length }}回


  c-report(handle="footer")
    article.swipe
      table
        thead
          tr
            th 総合値
            th 一番長い発言
            th 総文字数
            th 総発言回数
        tbody.calc(v-for="o in face.mestypes")
          tr(:class="o.handle")
            th {{ o.title }}
            td {{ o.max | currency }} 字
            td {{ o.all | currency }} 字
            td {{ o.count | currency }} 回


  c-report(handle="footer")
    article.swipe
      table
        thead
          tr
            th 平均値
            th /村数
            th 文字数
            th 発言回数
        tbody.calc(v-for="o in face.mestypes")
          tr(:class="o.handle")
            th {{ o.title }}
            td {{ o.per | currency }} 村
            td {{ o.all / o.per | currency }} 字
            td {{ o.count / o.per | currency }} 回

  c-talk.form(v-for="folder in face.folders" :handle="folder_handle(folder[0][0])", :face_id="face.id", :head="folder.nation", :key="folder[0][0]")
    | {{ folder.length }}回登場しました
    .flex
      nuxt-link.label-mini.r(v-for="id in folder", :to="book_url(id,'normal')", :key="id.join('-')") {{ id[1] }}


  c-report.form(handle="VGSAY" deco="center", :head="face.name + 'で活躍した人達'")
    btn(as="story_ids.length" v-model="order") 参加村数
    btn(as="count" v-model="order") 総発言回数
    btn(as="all" v-model="order") 総発言文字数
    btn(as="date_min" v-model="order") 古参度
    btn(as="date_max" v-model="order") 新着度
    article.swipe
      table
        transition-group.tlist(name="list" tag="tbody")
          tr(v-for="o in sow_auths", :key="o._id.sow_auth_id")
            td.c
              abbr {{ o._id.sow_auth_id }}
            td.r.count {{ o.story_ids.length | currency }}村
            td.r.count {{ o.count | currency }}回
            td.r.count {{ o.all | currency }}文字
            td.c
              timeago.count(:since="o.date_min")
            td.c
              .gap ～
            td.c
              timeago.count(:since="o.date_max")

  c-post(handle="footer")
    bread-crumb
      li
        nuxt-link(to="/summary/faces") キャラクター活躍記録
</template>

<script lang="coffee">
{ poll, pushState } = require "vue-petit-store"
{ Query } = require 'memory-orm'
_ = require "lodash"

folder_handle =
  offparty: 'FSAY'
  lobby:    'FSAY'
  test:     'FSAY'
  pan:      'FSAY'

  wolf:     'PSAY'
  allstar:  'PSAY'
  ultimate: 'PSAY'

  cabala:   'SSAY'
  morphe:   'SSAY'

  rp:       'VSSAY'
  pretense: 'VSSAY'
  soybean:  'VSSAY'
  crazy:    'VSSAY'
  perjury:  'VSSAY'
  xebec:    'VSSAY'
  ciel:     'VSSAY'

module.exports =
  mixins: [
    pushState "id"
    pushState "order"
    poll -> [["aggregate/face", @id ]]
  ]

  data: ->
    id:  "c41"
    order: "story_ids.length"

  methods:
    folder_handle: (folder_id)->
      folder_handle[folder_id]

    book_url: (book_id, mode)->
      name: "sow-village-show"
      query:
        mode: mode
        idx: [...book_id, 0].join("-")

    label_size: (str)->
      width  = 0.8 * (str.match(/[iIjl]/g) ? []).length
      width += 1.0 * (str.match(/[0-9a-hkm-z]/g) ? []).length
      width += 1.3 * (str.match(/[A-HJ-Z]/g) ? []).length
      width += 2.0 * (str.match(/[^0-9a-zA-Z]/g) ? []).length
      switch
        when width <  6.5
          "label2"
        # when width < 13
        #   "label3"
        when width < 20.5
          "label4"
        # when width < 28
        #   "label5"
        else
          "label6"

  computed:
    sow_auths: ->
      asc =
        switch @order
          when "date_min"
            "asc"
          else
            "desc"
      _.orderBy @face.sow_auths, @order, asc

    face: ->
      Query.faces.find @id

  head: ->
    titleTemplate: "#{ @face.name }の活躍 - %s"

</script>

<style lang="sass" scoped>

.calc
  td
    font-weight: bold
    text-align:  right

.flex
  align-items:     center
  align-content:   space-around
  justify-content: flex-end
  display: flex
  flex-direction: row
  flex-wrap: wrap

  a
    white-space: nowrap
    display: block
    flex-grow: 0
    .label
      margin: 0 2.5ex 0 0
      text-align: center
      display: block

    .count
      margin: -1.4em -2px -2px -2px
      text-align: right
      display: block

.gap
  margin: 0 -1ex

.label-mini
  width: 4ex
.label2
  width: calc( #{ 16% } -  4px )
.label3
  width: calc( #{ 24% } -  4px )
.label4
  width: calc( #{ 32% } -  4px )
.label5
  width: calc( #{ 40% } -  4px )
.label6
  width: calc( #{ 48% } -  4px )

</style>

