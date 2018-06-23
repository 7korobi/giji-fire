<script lang="coffee">
{ Query, State } = require "~/plugins/memory-record"
{ url } = require "~/config/live.yml"

module.exports =
  default:
    props: ["top"]

    data: -> {
      ...State
      export_to: "progress"
    }

    computed:
      mode: ->
        Query.sow_villages.reduce.mode

      export_style: ->
        height = @$el?.clientHeight ? 500
        switch
          when           0   <= @top < height * 0.5
            opacity: 1
          else
            opacity: 0
      welcome_style: ->
        backgroundImage: "url(#{url.assets}/images/bg/fhd-giji.png)"
        backgroundPosition: "left 50% top #{ -@top / 3 }px"

    components:
      sow:
        functional: true
        props: ["folder_id"]
        render: (m, ctx)->
          { folder_id } = ctx.props
          { export_to, mode } = ctx.parent
          children = ctx.children ? [ folder_id.toLowerCase() ]

          attrs =
            class: undefined
            attrs: {}
          if data = mode?.progress?[folder_id]
            attrs.class = "EVIL"
            children.push m "sup", [data.count]
          if data = mode?.prologue?[folder_id]
            attrs.class = "MOB"
            children.push m "sup", [data.count]

          switch export_to
            when "progress"
              { href, max_vils } = Query.folders.find(folder_id)
              vils =
                if max_vils
                  "#{max_vils}村:"
                else
                  ""
              attrs.attrs.href = href
              m "p", [
                vils
                m "a", attrs, children
              ]

            when "finish"
              attrs.attrs.to =
                path: "/sow/village"
                query: { folder_id }
              m "p", [
                m "nuxt-link", attrs, children
              ]

</script>
<template lang="pug">
#welcome(:style="welcome_style")
  table.form#export
    thead
      tr
        th.welcome-btns ロビー
        th.welcome-btns 夢の形
        th.welcome-btns 陰謀
        th.welcome-btns ＲＰ
    tbody
      tr
        td.welcome-links.form
          sow(folder_id="LOBBY")
          sow(folder_id="OFFPARTY")
        td.welcome-links.form
          sow(folder_id="MORPHE")
          sow(folder_id="CABALA") cafe
        td.welcome-links.form
          sow(folder_id="WOLF")
          sow(folder_id="ULTIMATE")
          sow(folder_id="ALLSTAR")
        td.welcome-links.form
          sow(folder_id="RP") role-play
          sow(folder_id="PRETENSE") RP-advance
          sow(folder_id="PERJURY")
          sow(folder_id="XEBEC")
          sow(folder_id="CRAZY")
          sow(folder_id="CIEL")
    tfoot
      tr
        th.welcome-btns(colspan=4)
          btn(v-model="export_to" as="finish")   終了した村
          btn(v-model="export_to" as="progress") 進行中の村
      tr
        th.welcome-btns(colspan=4)
          nuxt-link(to="/") 総合トップ

  h2.title-bar
    nuxt-link(to="/") 人狼議事

  slot
  .filmline
</template>
<style lang="stylus" scoped>
#export
  border-collapse: separate
  border-spacing: 3px
  padding: 30px
  margin:   0px auto

  thead, tfoot
    text-align: center
  td
    vertical-align: top
    padding: 0 3px

#welcome
  object-fit: cover
  background-size:  cover

.filmline
  margin: 0
  height: 11px
  background-repeat: repeat-x
  .contentframe
    background-image: none

.welcome-links
  white-space: pre

h2
  height: 130px
  white-space: pre
  text-align: center
  transform-origin: center bottom
  font-size:    45px
  line-height: 130px
  a
    background-color: transparent !important
    font-size:    45px
    line-height:  50px

</style>