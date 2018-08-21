<script lang="coffee">
{ url } = require "~/config/live.yml"

module.exports =
  props: ["title"]
  mixins: [
    require("~/plugins/browser-store")
      local:
        theme: "cinema"
        font:  "std"
      watch:
        theme: ->
          return unless window?
          @use_style 'theme'
          @use_style 'log'
        font: ->
          return unless window?
          @use_style 'font'
  ]
  data: ->
    top:    0
    width:  0
    height: 0
    use: {}
    new:
      rel:
        log: "stylesheet"
        font: "stylesheet"
        theme: "stylesheet"
    old:
      rel:
        log: "stylesheet"
        font: "stylesheet"
        theme: "stylesheet"
      href:
        log: ""
        font: ""
        theme: ""

  created: ->
    return unless window?
    document.ontouchstart = ->
    @poll()

  computed:
    center: ->
      @$store.commit "menu/center", { @top, @left, @height, @width }
    href: ->
      log: url.assets + "/css/log-#{@log}.styl.css"
      font: url.assets + "/css/font-#{@font}.styl.css"
      theme: url.assets + "/css/theme-#{@theme}.styl.css"
    log: ->
      switch @theme
        when "snow"
          "snow"
        when "cinema", "wa", "pop"
          "day"
        else
          "night"

  methods:
    use_style: (key)->
      @new.rel[key] = 'stylesheet'
      setTimeout =>
        @old.href[key] = @href[key]
        setTimeout =>
          @new.rel[key] = 'prefetch'
        , 100
      , 100

    poll: ->
      if @top == scrollY && @left == scrollX
        @center
      @top = scrollY
      @left = scrollX
      @width = innerWidth
      @height = innerHeight
      requestAnimationFrame @poll
  
  head: ->
    # https://materialdesignicons.com/
    link: [
      { hid: 'hid2', rel: 'stylesheet', type: 'text/css', href: url.assets + '/css/index.styl.css' }
      { hid: 'hid3', rel: 'stylesheet', type: 'text/css', href: 'https://cdn.materialdesignicons.com/2.3.54/css/materialdesignicons.min.css' }
      { hid: 'hid4', rel: @new.rel.log,   type: 'text/css', href: @href.log }
      { hid: 'hid5', rel: @new.rel.font,  type: 'text/css', href: @href.font }
      { hid: 'hid6', rel: @new.rel.theme, type: 'text/css', href: @href.theme }
      { hid: 'hid7', rel: @old.rel.log,   type: 'text/css', href: @old.href.log }
      { hid: 'hid8', rel: @old.rel.font,  type: 'text/css', href: @old.href.font }
      { hid: 'hid9', rel: @old.rel.theme, type: 'text/css', href: @old.href.theme }
    ]

</script>
<template lang="pug">
div
  no-ssr
    welcome(:top="top" :title="title || '人狼議事'")
      .btns.form
        span.font
          btn(v-model="font" as="large") 大判
          btn(v-model="font" as="novel") 明朝
          btn(v-model="font" as="std") ゴシック
          btn(v-model="font" as="small") 繊細

        span.theme
          btn(v-model="theme" as="cinema") 煉瓦
          btn(v-model="theme" as="pop")    噴出
          btn(v-model="theme" as="snow")   雪景
          btn(v-model="theme" as="star")   蒼穹
          btn(v-model="theme" as="night")  闇夜

          btn(v-model="theme" as="moon")   月夜
          btn(v-model="theme" as="wa")   和の国

  .outframe.filmend-frame
    .contentframe
      .filmend

</template>
<style lang="sass" scoped>
.filmend-frame
  height: 0
  .inframe
    padding: 0

.outframe
  .contentframe
    text-align: left

.filmend
  margin: -11px 0 0 -2px
  height:  36px
  width:  126px
  display: inline-block

</style>
