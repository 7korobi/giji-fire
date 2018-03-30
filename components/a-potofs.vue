<template lang="pug">
.inframe.header(v-if="show")
  .TITLE
    hr
    h6 {{ part.label }}の参加者
    hr
  .swipe.fine
    table
      tfoot.TITLE.form.tb-btn
        tr
          th(colspan="2")
            sup (スクロールします)
          th
            btn(v-model="sort" as="live.date", @toggle="reverse") 日程
          th
            btn(v-model="sort" as="live.role_id", @toggle="reverse") 状態

          th
            btn(v-model="sort" as="give.give", @toggle="reverse") 促
          th(colspan="2")
            btn(v-model="sort" as="say.count", @toggle="reverse") 回数
            btn(v-model="sort" as="say.avg", @toggle="reverse" title="字数 ÷ 回") 平均
            btn(v-model="sort" as="say.all", @toggle="reverse") 字数
            btn(v-model="sort" as="say.density", @toggle="reverse" title="字数 ÷ 範囲") 密度
          th
            btn(v-model="sort" as="say.min", @toggle="reverse") 最初
            btn(v-model="sort" as="say.range", @toggle="reverse" title="最後 － 最初") 範囲
            btn(v-model="sort" as="say.max", @toggle="reverse") 最後
          th
            btn(v-model="sort" as="sign", @toggle="reverse")
              i.mdi.mdi-account

          th
            btn(v-model="sort" as="request.role_id", @toggle="reverse") 希望
          th
            btn(v-model="sort" as="win", @toggle="reverse") 勝敗
          th
            btn(v-model="sort" as="winner_id", @toggle="reverse") 陣営
          th
            btn(v-model="sort" as="role_labels", @toggle="reverse") 役割
          th
            btn(v-model="sort" as="text", @toggle="reverse") 補足
          th

      transition-group.potofs.fine.tlist(name="list" tag="tbody")
        tr(v-for="o in potofs", :key="o.id" v-if="! o.hide")
          th.r(:class="o.live.role_id") {{ o.job }}
          th.l(:class="o.live.role_id") {{ o.face && o.face.name }}
          td.r(:class="o.live.role_id") {{ o.live.date           | currency("日") }}
          td.c(:class="o.live.role_id") {{ o.live.role.label }}

          th.r(:class="o.say_id(part.id)") {{ o.give && o.give.give | currency("回") }}
          td.r(:class="o.say_id(part.id)") {{ o.say(part.id).count  | currency("回") }}
          td.r(:class="o.say_id(part.id)") {{ o.say(part.id).all    | currency("字") }}
          th.r(:class="o.say_id(part.id)") {{ o.say(part.id) | timerange }}
          th.c(:class="o.say_id(part.id)")
            abbr(:class="o.say_id(part.id)") {{ o.sign }}

          th.c(:class="o.winner_id")
            abbr(v-if="o.request", :class="o.winner_id") {{ o.request.role.label }}
          th.c(:class="o.winner_id") {{ o.win }}
          td.c(:class="o.winner_id") {{ o.winner && o.winner.label }}
          td.c(:class="o.winner_id") {{ o.role_labels.join("、") }}
          td.l(:class="o.winner_id") {{ o.text }}
          td.last
  transition-group.swipe.list(v-if="part" name="list" tag="div")
    table.fine(key="ids")
      tbody.TITLE.form.tb-btn
        tr
          th
            btn(v-model="hide_potof_ids", :as="live_on")  参加者
          th
            btn(v-model="hide_potof_ids", :as="live_off") リタイア
          th
            btn(v-model="hide_potof_ids", :as="full_on")  全表示
          th
            btn(v-model="hide_potof_ids", :as="full_off") クリア

    portrate(v-for="o in potofs", :key="o.id", :face_id="o.face_id", :hide="o.hide", @click="toggle(o)")
      .bar(:class="bgc(o)")
</template>


<script lang="coffee">
{ Query } = require "~/plugins/memory-record"

module.exports =
  mixins: [
    require('~/plugins/book')()
  ]

  data: -> {}

  computed:
    full_on:  ->  @potof_ids -> false
    full_off: ->  @potof_ids -> true
    live_on:  ->  @potof_ids (o)-> ! o.commit
    live_off: ->  @potof_ids (o)-> o.commit

    order:
      get: ->
        @$store.state.menu.potofs.order
      set: (order)->
        @$store.commit "menu/update", potofs: { order }
    sort:
      get: ->
        @$store.state.menu.potofs.sort
      set: (sort)->
        @$store.commit "menu/update", potofs: { sort }

    potofs: ->
      if @part
        { list } = Query.potofs.catalog(@book_id, @part_id, @sort, @order)
        for o in list
          o.hide = false
        for id in @hide_potof_ids
          Query.potofs.find(id).hide = true
        list
      else
        []

    bgc: ->
      switch @sort
        when "text", "role_labels", "winner_id", "win"
          (o)-> o.winner_id
        else
          (o)-> o.live.role_id

    show: ->
      @part && "potof" in @$store.state.menu.shows

  methods:
    potof_ids: (f)->
      @potofs
      .filter f
      .map (o)-> o.id
      .sort()

    toggle: (o)->
      o.hide = ! o.hide
      @hide_potof_ids = @potof_ids (o)-> o.hide

    reverse: ->
      switch @order
        when "asc"
          @order = "desc"
        when "desc"
          @order = "asc"

</script>
<style lang="stylus" scoped>
.potofs
  th, td
    border-radius: 0
    padding: 0 0.5ex

.r
  text-align: right
.l
  text-align: left
.c
  text-align: center
.last
  min-width: 1000px

.btns a
  margin-bottom: 6px

.portrate
  flex-basis: auto
  margin: 2px

tfoot
  a
    height: 40px

.swipe tbody th:nth-of-type(2)
  position: sticky
  left: 0

.list
  background: #000
  display: flex
  flex-direction:  row
  flex-wrap:       nowrap
  align-items:     center
  align-content:   space-around
  justify-content: flex-start
  min-width: 100%
  img
    max-height:   65px
    height:       65px
  .bar
    height:        3px
    border-radius: 3px
  .fine
    a
      flex-basis: auto
      max-height:   68px
      height:       68px
</style>

