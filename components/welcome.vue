<script lang="coffee">
{ poll } = require 'vue-petit-store'
{ Query } = require 'memory-orm'
{ url } = require "~/config/live.yml"

module.exports =
  mixins: [
    poll -> [["sow/progress"]]
  ]
  props: ["top", "title"]

  data: -> {
    export_to: "progress"
  }

  computed:
    mode: ->
      Query.sow_villages.reduce.mode

    export_style: ->
      height = @$el?.clientHeight ? 500
      switch
        when 0 <= @top < height * 0.5
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
  .form#export(v-if="title")
    .welcome-btns.cap ロビー
    .welcome-btns.cap 夢の形
    .welcome-btns.cap 陰謀
    .welcome-btns.cap ＲＰ

    .welcome-links.form.tap
      sow(folder_id="LOBBY")
      sow(folder_id="OFFPARTY")
    .welcome-links.form
      sow(folder_id="MORPHE")
      sow(folder_id="CABALA") cafe
    .welcome-links.form
      sow(folder_id="WOLF")
      sow(folder_id="ULTIMATE")
      sow(folder_id="ALLSTAR")
    .welcome-links.form
      sow(folder_id="RP") role-play
      sow(folder_id="PRETENSE") RP-advance
      sow(folder_id="PERJURY")
      sow(folder_id="XEBEC")
      sow(folder_id="CRAZY")
      sow(folder_id="CIEL")

    .welcome-btns.col4
      btn(v-model="export_to" as="finish")   終了した村
      btn(v-model="export_to" as="progress") 進行中の村

    .welcome-btns.col4.shoe
      a(href="https://giji.f5.si/") 総合トップ

  h1.title-bar
    nuxt-link(to="/") {{ title }}

  slot
  .outframe.filmline
    .contentframe
      span.filmend

</template>
<style lang="sass" scoped>
#export
  border-collapse: separate
  border-spacing: 3px
  padding: 40px 0

  display: grid
  justify-content: center
  grid-template-areas: ". . . ."
  grid-gap: 0 4px

.welcome-btns
  text-align: center
  background-color: rgba(64,82,80,0.8)

.welcome-links
  white-space: pre
  vertical-align: top
  padding: 0.5ex
  background-color: rgba(23,47,31,0.4)

.col4
  grid-column: 1 / 5

.cap
  border-radius: 9px 9px 0 0

.shoe
  border-radius: 0 0 9px 9px
  padding: 0.5ex

#welcome
  object-fit: cover
  background-size:  cover

h1
  height: 140px
  text-align: center
  transform-origin: center bottom
  line-height: 140px
  a
    background: transparent !important
    white-space: pre
    font-size:    55px
    line-height:  55px

</style>