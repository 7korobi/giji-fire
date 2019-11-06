<template lang="pug">
div
  client-only
    transition-group(name="list" tag="div")
      c-post(handle="footer" key="breadcrumb")
        bread-crumb

  div
    div(v-for="(books, idx) in page_contents" :key="idx")
      c-report(handle="MAKER", v-for="o in books" :id="o._id" :key="o._id" @focus="focus")
        .name
          sup.pull-right {{ o.sign }}
          nuxt-link(:to="book_url(o.id, 'top', 'full')") {{ o.label }}
        .cards
          table.btns.card(style="width: 13em")
            tbody
              tr
                th(colspan="2")
                  img.mark(:src="mark.path" v-for="mark in o.marks.list")
              tr
                th ID
                td {{ o.id }}
              tr
                th 更新
                td {{ o.range }}毎 {{ o.gap }}
              tr
                th 規模
                td {{ o.potof_max }}人 {{ o.say.label }}
              tr
                td(colspan="2")
                  timeago(:since="o.write_at")
          .card(style="width: 27em")
            p(v-if="o.options")
              a.label(v-if="o.mob" :class="o.mob.win") {{ o.mob.label }}
              a.label(v-if="o.game") {{ o.game.label }}
              template(v-for="opt in o.options.list")
                | &#x200B;
                a.label {{ opt.label }}
            p(v-if="o.roles")
              template(v-for="role in o.roles.reduce.summary" :class="role.win")
                | &#x200B;
                a.label(:class="role.win")
                  | {{ role.label }}
                  sup(v-if="1 < role.count") {{ role.count }}

  div
    c-report(handle="footer" key="limitup")
      scroll-mine(v-if="page_next_idx" @input="page_add" :as="page_next_idx") 次頁
    c-post(handle="footer")
      bread-crumb

</template>
<script lang="coffee">
{ Query } = require 'memory-orm'
{ url } = require "~/app/config/live.yml"
{ firestore_models } = require "vue-petit-store"

module.exports =
  mixins: [
    require('~/app/plugins/pager')
    firestore_models "books",  -> "game"
  ]

  data: ->
    idx: ""

  methods:
    focus: (@idx)->
    book_url: (book_id, part_idx, mode)->
      idx = [book_id, part_idx].join("-")
      name: "game-show"
      query: { mode, idx }

    rating_img: (rating = "default")->
      "#{url.store}/images/icon/cd_#{rating}.png"

  computed:
    folder_id: ->
      "fire"
    page_all_contents: ->
      @page_idxs = [0]
      Query
      .books
      .in_folder @folder_id, true
      .list

  head: ->
    titleTemplate: "進行中の村一覧 - %s"

</script>
<style lang="sass" scoped>
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
