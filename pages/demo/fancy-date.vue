<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
  c-post(handle="SSAY")
    article.text
      span.r.pull-left(v-html="current_gregorian")
      span.r.pull-left(v-html="current_historic")
    article.text
      span.r.pull-right(v-html="solor_gregorian")

  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<script lang="coffee">
{ FancyDate } = require 'vue-petit-store'
g = FancyDate.Gregorian

module.exports =
  head: ->
    title: "人狼議事 - 架空歴 #{ @current_gregorian }"

  data: ->
    current_at: new Date().getTime()

  created: ->
    @tick()

  computed:
    current_historic: ->
      @historic.format @current_at, "y<br>M<br>d<br>e<br>H<br>m<br>s<br>"
    current_gregorian: ->
      @gregorian.format @current_at, "y<br>M<br>d<br>e<br>H<br>m<br>s<br>"
    solor_gregorian: ->
      { 日の出, 南中時刻, 日の入 } = @gregorian.solor @current_at
      [
        @gregorian.format 日の出,  'Hm'
        @gregorian.format 南中時刻, 'Hm'
        @gregorian.format 日の入,  'Hm'
      ].join("<br>")

    historic: ->
      FancyDate.平気法
    gregorian: ->
      FancyDate.Gregorian

  methods:
    tick: (@current_at = new Date().getTime())->
      { m } = @gregorian.to_tempos @current_at
      setTimeout =>
        console.warn 'gregorian tick.'
        @tick()
      , m.remain

      { m } = @historic.to_tempos @current_at
      setTimeout =>
        console.warn 'historic tick.'
        @tick()
      , m.remain

</script>
