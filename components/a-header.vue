<script lang="coffee">

host = "https://s3-ap-northeast-1.amazonaws.com/giji-assets/nuxt"

module.exports =
  mixins: [
    require("~/plugins/browser-store")
      cookie:
        theme: "cinema"
        font:  "std"
      watch: (val, old, key)->
        return unless window?
        @use_style key
        return unless key == 'theme'
        @use_style 'log'
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
    body_class: ->
      [@log, @theme, @font]
    href: ->
      log: host + "/css/log-#{@log}.styl.css"
      font: host + "/css/font-#{@font}.styl.css"
      theme: host + "/css/theme-#{@theme}.styl.css"
    log: ->
      switch @theme
        when "snow"
          "snow"
        when "cinema", "wa"
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
      { hid: 'hid1', rel: 'stylesheet', type: 'text/css', href: host + '/element-ui/theme-chalk/index.css' }
      { hid: 'hid2', rel: 'stylesheet', type: 'text/css', href: host + '/css/index.styl.css' }
      { hid: 'hid3', rel: 'stylesheet', type: 'text/css', href: 'https://cdn.materialdesignicons.com/2.1.19/css/materialdesignicons.min.css' }
      { hid: 'hid4', rel: @new.rel.log,   type: 'text/css', href: @href.log }
      { hid: 'hid5', rel: @new.rel.font,  type: 'text/css', href: @href.font }
      { hid: 'hid6', rel: @new.rel.theme, type: 'text/css', href: @href.theme }
      { hid: 'hid7', rel: @old.rel.log,   type: 'text/css', href: @old.href.log }
      { hid: 'hid8', rel: @old.rel.font,  type: 'text/css', href: @old.href.font }
      { hid: 'hid9', rel: @old.rel.theme, type: 'text/css', href: @old.href.theme }
    ]

</script>
<template lang="pug">
div(:class="body_class")
  welcome(:top="top")
    .btns.form
      span.font
        btn(v-model="font" as="large") 大判
        btn(v-model="font" as="novel") 明朝
        btn(v-model="font" as="std") ゴシック
        btn(v-model="font" as="small") 繊細

      span.theme
        btn(v-model="theme" as="cinema") 煉瓦
        btn(v-model="theme" as="snow")   雪景
        btn(v-model="theme" as="star")   蒼穹
        btn(v-model="theme" as="night")  闇夜

        btn(v-model="theme" as="moon")   月夜
        btn(v-model="theme" as="wa")   和の国

  a-writeframe(:top="top")
  .outframe.filmend-frame
    .contentframe
      .filmend

</template>
<style lang="stylus" scoped>
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
