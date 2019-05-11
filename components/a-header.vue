<script lang="coffee">
{ url } = require "~/config/live.yml"
{ scroll, geo, localStorage } = require "vue-petit-store"

module.exports =
  props: ["title"]
  mixins: [
    localStorage "theme"
    localStorage "font"
    localStorage "bg"
    scroll()
    # geo()
  ]
  data: ->
    theme: "cinema"
    font:  "std"
    bg: "BG"

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

  computed:
    href: ->
      log: url.style + "/css/log-#{@log}.use.css"
      zoom: url.style + "/css/zoom-#{@zoom}.use.css"
      theme: url.style + "/css/theme-#{@theme}.use.css"
    log: ->
      switch @theme
        when "snow"
          "snow"
        when "cinema", "wa", "pop"
          "day"
        else
          "night"
    body_class: ->
      document.querySelector("html").setAttribute "class", [
        @bg
        @font
        @log
        @theme
      ].join(" ")

  methods:
    use_style: (key)->
      @new.rel[key] = 'stylesheet'
      setTimeout =>
        @old.href[key] = @href[key]
        setTimeout =>
          @new.rel[key] = 'prefetch'
        , 100
      , 100

  watch:
    theme:
      immediate: true
      handler: ->
        return unless window?
        @use_style 'theme'
        @use_style 'log'

  head: ->
    # https://materialdesignicons.com/
    @body_class

    meta: [
      hid: 'viewport'
      name: 'viewport'
      content: "initial-scale=1, user-scalable=no, shrink-to-fit=no"
    ]
    link: [
      { hid: 'hid4',  rel: @new.rel.log,   type: 'text/css', href: @href.log }
      { hid: 'hid6',  rel: @new.rel.theme, type: 'text/css', href: @href.theme }
      { hid: 'hid7',  rel: @old.rel.log,   type: 'text/css', href: @old.href.log }
      { hid: 'hid9',  rel: @old.rel.theme, type: 'text/css', href: @old.href.theme }
    ]

</script>
<template lang="pug">
div
  no-ssr
    welcome(:top="scroll.top" :title="title")
      .btns.form
        span
          btn(v-model="bg" as="BG") １
          btn(v-model="bg" as="BG75") ¾
          btn(v-model="bg" as="BG50") ½

        span
          btn(v-model="font" as="large") 大判
          btn(v-model="font" as="novel") 明朝
          btn(v-model="font" as="press") 新聞
        span
          btn(v-model="font" as="goth-L") L
          btn(v-model="font" as="goth-M") M
          btn(v-model="font" as="goth-S") S

        span
          btn(v-model="theme" as="cinema") 煉瓦
          btn(v-model="theme" as="pop")    噴出
          btn(v-model="theme" as="snow")   雪景
          btn(v-model="theme" as="star")   蒼穹
          btn(v-model="theme" as="night")  闇夜

          btn(v-model="theme" as="moon")   月夜
          btn(v-model="theme" as="wa")   和の国

</template>
