<template lang="pug">
div
  no-ssr
    transition-group(name="list" tag="div")
      c-post(handle="footer" key="breadcrumb")
        bread-crumb
        
      c-post.form(handle="btns" key="form")
        span
          btn(as="" @input="reset()" value="order")
            i.mdi.mdi-eraser
        span
          btn(as="vid"             v-model="order" @toggle="submenu")
            | 州
            sup(v-if="folder_id.length") {{ folder_id.length }}
          btn(as="rating"          v-model="order" @toggle="submenu")
            | こだわり
            sup(v-if="rating.length") {{ rating.length }}
        span
          btn(as="timer.updateddt" v-model="order" @toggle="submenu")
            | 年月日
            sup(v-if="monthry.length") {{ monthry.length }}
          btn(as="upd_range"       v-model="order" @toggle="submenu")
            | 更新間隔
            sup(v-if="upd_range.length") {{ upd_range.length }}
          btn(as="upd_at"          v-model="order" @toggle="submenu")
            | 更新時刻
            sup(v-if="upd_at.length") {{ upd_at.length }}
        span
          btn(as="vpl.0"           v-model="order" @toggle="submenu")
            | 人数
            sup(v-if="size.length") {{ size.length }}
          btn(as="say.CAPTION"     v-model="order" @toggle="submenu")
            | 発言ルール
            sup(v-if="say.length") {{ say.length }}
          btn(as="game.label"     v-model="order" @toggle="submenu")
            | ゲーム
            sup(v-if="game.length") {{ game.length }}
        span
          btn(as="sow_auth_id"     v-model="order" @toggle="submenu")
            | 村建て人
            sup(v-if="sow_auth_id.length") {{ sow_auth_id.length }}

        span
          btn(as="card.option"      v-model="order" @toggle="submenu")
            | 村設定
            sup(v-if="option.length") {{ option.length }}
          btn(as="card.config"     v-model="order" @toggle="submenu")
            | 参加役職
            sup(v-if="config.length") {{ config.length }}

        span
          btn(as="card.event"      v-model="order" @toggle="submenu")
            | 破棄事件
            sup(v-if="event.length") {{ event.length }}
          btn(as="card.discard"    v-model="order" @toggle="submenu")
            | 破棄役職
            sup(v-if="discard.length") {{ discard.length }}
        search(v-model="search" @focus="order = 'name'")
        sub(style="width: 100%")
          | {{ page_all_contents.all | currency }}村があてはまります。

      c-report.form(v-if="drill" handle="btns" key="subform")
        p(v-if="order === 'vid'")
          check(v-for="o in summary('folder_id')" v-model="folder_id", :as="o.id", :key="o.id")
            | {{ o.id }}
            sup(v-if="1 < o.count") {{ o.count }}

        p(v-if="order === 'timer.updateddt'")
          grid(v-bind="grid_data" v-model="monthry")
        p(v-if="order === 'upd_range'")
          check(v-for="o in summary('upd_range')" v-model="upd_range", :as="o.id", :key="o.id")
            | {{ o.id }}
            sup(v-if="1 < o.count") {{ o.count }}
        p(v-if="order === 'upd_at'")
          check(v-for="o in summary('upd_at')" v-model="upd_at", :as="o.id", :key="o.id")
            | {{ o.id }}
            sup(v-if="1 < o.count") {{ o.count }}
        p(v-if="order === 'sow_auth_id'")
          check(v-for="o in summary('sow_auth_id')" v-model="sow_auth_id", :as="o.id", :key="o.id")
            | {{ o.id.replace(/\&\#2e/ig,'.') }}
            sup(v-if="1 < o.count") {{ o.count }}
        p(v-if="order === 'rating'")
          check(v-for="o in summary('rating')" v-model="rating", :as="o.id", :key="o.id")
            img(:src="rating_img(o.id)")
            sup(v-if="1 < o.count") {{ o.count }}
        p(v-if="order === 'vpl.0'")
          check(v-for="o in summary('size')" v-model="size", :as="o.id", :key="o.id")
            | {{ o.id }}人
            sup(v-if="1 < o.count") {{ o.count }}

        p(v-if="order === 'card.option'")
          check(v-for="o in summary('option')" v-model="option", :as="o.id", :key="o.id")
            | {{ o.label }}
            sup(v-if="1 < o.count") {{ o.count }}
        p(v-if="order === 'card.event'")
          check(v-for="o in summary('event')" v-model="event", :as="o.id", :key="o.id")
            | {{ o.label }}
            sup(v-if="1 < o.count") {{ o.count }}
        p(v-if="order === 'card.config'")
          check(v-for="o in summary('config')" v-model="config", :as="o.id", :key="o.id")
            | {{ o.label }}
            sup(v-if="1 < o.count") {{ o.count }}
        p(v-if="order === 'card.discard'")
          check(v-for="o in summary('discard')" v-model="discard", :as="o.id", :key="o.id")
            | {{ o.label }}
            sup(v-if="1 < o.count") {{ o.count }}

        p(v-if="order === 'say.CAPTION'")
          check(v-for="o in summary('say')" v-model="say", :as="o.id", :key="o.id")
            | {{ o.CAPTION }}
            sup(v-if="1 < o.count") {{ o.count }}

        p(v-if="order === 'game.label'")
          check(v-for="o in summary('game')" v-model="game", :as="o.id", :key="o.id")
            | {{ o.label }}
            sup(v-if="1 < o.count") {{ o.count }}

  div
    div(v-for="(villages, idx) in page_contents", :key="idx")
      c-report(handle="MAKER", v-for="o in villages", :write_at="o.write_at", :id="o._id", :key="o._id")
        .name
          sup.pull-right {{ o.sow_auth_id | decode }}
          nuxt-link(:to="book_url(o.id, 'top', 'full')") {{ o.name }}
        .cards
          table.btns.card(style="width: 33%")
            tbody
              tr
                th
                  kbd(style="width: 40px")
                    img(:src="rating_img(o.q.rating)")
                td {{ o.id }}
              tr
                th 更新
                td {{ o.q.upd_range }}毎 {{ o.q.upd_at }}
              tr
                th 規模
                td {{ o.q.size }}人 {{ o.say.CAPTION }}
              tr
                td(colspan="2")
                  timeago(:since="o.write_at")
          .card(style="width: 66%")
            p
              a.label(v-if="o.mob", :class="o.mob.win") {{ o.mob.label }}
              a.label(v-if="o.game") {{ o.game.label }}
              a(v-for="opt in o.option_datas.list")
                .label {{ opt.label }}
            p
              a(v-if="role" v-for="role in o.roles.config", :class="role.win")
                .label
                  | {{ role.label }}
                  sup(v-if="1 < role.count") {{ role.count }}
            hr
            p
              a(v-if="role" v-for="role in o.roles.event", :class="role.win")
                .label
                  | {{ role.label }}
                  sup(v-if="1 < role.count") {{ role.count }}
            p
              a(v-if="role" v-for="role in o.roles.discard", :class="role.win")
                .label
                  | {{ role.label }}
                  sup(v-if="1 < role.count") {{ role.count }}

  div
    c-report(handle="footer" key="limitup")
      scroll-mine(v-if="page_next_idx" @input="page_add", :as="page_next_idx") 次頁
    c-post(handle="footer")
      bread-crumb

</template>
<script lang="coffee">
{ State, Query } = require "~/plugins/memory-record"
{ url } = require "~/config/live.yml"
mount = require "~/plugins/get-by-mount"

module.exports =
  mixins: [
    mount "1h", "sow/oldlog"
    require('~/plugins/pager')
    require("~/plugins/browser-store")
      replace:
        order:  "vid"
        folder_id: []
        monthry: []
        upd_range: []
        upd_at: []
        sow_auth_id: []
        rating: []
        size: []
        say: []
        game: []
        option: []
        event: []
        discard: []
        config: []
        search: ""
      watch: ->
        @page_idxs = [0]
  ]

  data: ->
    mode: "oldlog"
    asc: "desc"
    drill: true

  methods:
    reset: ->
      @$router.replace query: { @order }

    book_url: (book_id, part_idx, mode)->
      name: "sow-village-show"
      query:
        mode: mode
        idx: [book_id, part_idx].join("-")

    rating_img: (rating)->
      "#{url.store}/images/icon/cd_#{rating}.png"

    submenu: (as)->
      @drill = ! @drill

    summary: (key)->
      query_in    = { ...@query_in    }
      query_where = { ...@query_where }

      switch key
        when 'yeary', 'monthry', 'in_month'
          delete query_where['q.yeary']
          delete query_where['q.monthry']
          delete query_where['q.in_month']
        when "option", "event", "discard", "config"
          delete query_in["card." + key]
        else
          delete query_where["q." + key]
      Query
      .sow_villages
      .summary @mode, query_in, query_where, @search
      .reduce?[key]

  computed:
    grid_data: ->
      x: @summary('in_month')
      y: @summary('yeary')
      data: @summary('monthry')
      find: ( x, y )=> y + x

    query_in: ->
      obj = {}
      for key in ["option", "event", "discard", "config"]
        continue unless @[key].length
        obj["card." + key] = @[key]
      obj

    query_where: ->
      obj = {}
      for key in ["folder_id","monthry","upd_range","upd_at","sow_auth_id","rating","size","say","game"]
        continue unless @[key].length
        obj["q." + key] = @[key]
      obj

    page_all_contents: ->
      Query
      .sow_villages
      .all_contents @mode, @query_in, @query_where, @search, @order, @asc
      .list

</script>
<style lang="stylus" scoped>
.cards
  display: flex
  flex-direction:  row
  flex-wrap:       nowrap
  align-content:   space-around
  align-items:     flex-start
  justify-content: flex-start

.card
  padding: 2px
</style>
