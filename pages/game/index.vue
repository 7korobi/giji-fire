<template lang="pug">
div
  no-ssr
    transition-group(name="list" tag="div")
      c-post(handle="footer" key="breadcrumb")
        bread-crumb

  div
    div(v-for="(books, idx) in page_contents" :key="idx")
      c-report(handle="MAKER", v-for="o in books" :id="o._id" :key="o._id" @focus="focus")
        .name
          sup.pull-right {{ o.sign }}
          nuxt-link(:to="book_url(o.id, 'top', 'full')") {{ o.name }}
        .cards
          table.btns.card(style="width: 33%" v-if="o.q")
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
              a.label(v-if="o.mob" :class="o.mob.win") {{ o.mob.label }}
              a.label(v-if="o.game") {{ o.game.label }}
              a(v-for="opt in o.option_datas.list")
                span.label {{ opt.label }}
            p
              a(v-if="role" v-for="role in o.roles.config" :class="role.win")
                span.label
                  | {{ role.label }}
                  sup(v-if="1 < role.count") {{ role.count }}
            hr
            p
              a(v-if="role" v-for="role in o.roles.event" :class="role.win")
                span.label
                  | {{ role.label }}
                  sup(v-if="1 < role.count") {{ role.count }}
            p
              a(v-if="role" v-for="role in o.roles.discard" :class="role.win")
                span.label
                  | {{ role.label }}
                  sup(v-if="1 < role.count") {{ role.count }}

  div
    c-report(handle="footer" key="limitup")
      scroll-mine(v-if="page_next_idx" @input="page_add" :as="page_next_idx") 次頁
    c-post(handle="footer")
      bread-crumb

</template>
<script lang="coffee">
{ State, Query } = require 'memory-orm'
{ url } = require "~/config/live.yml"
{ firestore_models } = require "vue-petit-store"

module.exports =
  mixins: [
    require('~/plugins/pager')
    firestore_models "books",  -> "game"
  ]

  data: ->
    idx: ""
    state_step: State.step

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
