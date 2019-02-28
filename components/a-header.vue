<script lang="coffee">
{ url } = require "~/config/live.yml"
{ localStorage } = require "vue-petit-store"

module.exports =
  props: ["title"]
  mixins: [
    localStorage "theme"
    localStorage "font"
    localStorage "zoom"
  ]
  data: ->
    top:    0
    width:  0
    height: 0

    theme: "cinema"
    font:  "std"
    zoom:  "0.5"

    use: {}
    new:
      rel:
        log: "prefetch"
        zoom: "prefetch"
        font: "prefetch"
        theme: "prefetch"
    old:
      rel:
        log: "stylesheet"
        zoom: "stylesheet"
        font: "stylesheet"
        theme: "stylesheet"
      href:
        log: ""
        zoom: ""
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
      log: url.style + "/css/log-#{@log}.styl.css"
      zoom: url.style + "/css/zoom-#{@zoom}.styl.css"
      font: url.style + "/css/font-#{@font}.styl.css"
      theme: url.style + "/css/theme-#{@theme}.styl.css"
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

  watch:
    theme:
      immediate: true
      handler: ->
        return unless window?
        @use_style 'theme'
        @use_style 'log'
    font:
      immediate: true
      handler: ->
        return unless window?
        @use_style 'font'
    zoom:
      immediate: true
      handler: ->
        return unless window?
        @use_style 'zoom'

  head: ->
    # https://materialdesignicons.com/
    meta: [
      { hid: 'viewport', name: 'viewport', content: "width=device-width, initial-scale=#{@zoom}, shrink-to-fit=no" }
    ]
    link: [
      { hid: 'hid10', rel: 'stylesheet', type: 'text/css', href: 'https://cdn.materialdesignicons.com/3.4.93/css/materialdesignicons.min.css' }
      { hid: 'hid3',  rel: 'stylesheet',   type: 'text/css', href: url.style + '/css/index.styl.css' }
      { hid: 'hid4',  rel: @new.rel.log,   type: 'text/css', href: @href.log }
      { hid: 'hidA',  rel: @new.rel.zoom,  type: 'text/css', href: @href.zoom }
      { hid: 'hid5',  rel: @new.rel.font,  type: 'text/css', href: @href.font }
      { hid: 'hid6',  rel: @new.rel.theme, type: 'text/css', href: @href.theme }
      { hid: 'hid7',  rel: @old.rel.log,   type: 'text/css', href: @old.href.log }
      { hid: 'hidB',  rel: @old.rel.zoom,  type: 'text/css', href: @old.href.zoom }
      { hid: 'hid8',  rel: @old.rel.font,  type: 'text/css', href: @old.href.font }
      { hid: 'hid9',  rel: @old.rel.theme, type: 'text/css', href: @old.href.theme }
    ]

</script>
<template lang="pug">
div
  no-ssr
    welcome(:top="top" :title="title")
      .btns.form
        span.zoom
          btn(v-model="zoom" as="1.0" ) １
          btn(v-model="zoom" as="0.75") ¾
          btn(v-model="zoom" as="0.5" ) ½

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
