<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
  c-post(handle="PSAY")
    table
      tbody(v-for="c in results")
        tr
          th.c(colspan="6") {{ c[0] }}
        tr
          th.r.note(colspan="4") 日付
          th.c.note 曜
          th.l.note 時刻
        tr
          td.r(colspan="4") {{ c[1] }}
          td.c {{ c[2] }}
          td.l {{ c[3] }}
        tr
          th.c.note(colspan="6")
        tr
          td
          th.r.note(colspan="1") 干支
          td.l {{ c[4] }}
          th.r.note(colspan="2") 日出
          td.l {{ c[7] }}
        tr
          td
          th.r.note(colspan="1") 節気
          td.l {{ c[5] }}
          th.r.note(colspan="2") 南中
          td.l {{ c[8] }}
        tr
          td
          th.r.note(colspan="1") 月相
          td.l {{ c[6] }}
          th.r.note(colspan="2") 日入
          td.l {{ c[9] }}

  c-post(handle="TSAY")
    table.text
      thead
        tr
          th 書式
      tbody
        tr(v-for="c in calendars")
          td
            input(v-model="c[2]" size="35")

  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<script lang="coffee">
{ Tempo, FancyDate } = require 'fancy-date'
window.FancyDate = FancyDate

module.exports =
  head: ->
    title: "人狼議事 - 架空歴 #{ @results[0][1] }"

  data: ->
    current_at: Date.now()
    calendars: [
      [ "グレゴリオ暦（1970年1月1日基準）", FancyDate.Gregorian, "yyyy/MM/dd E HH:mm T Z N" ]
      [ "平気法太陽太陰暦（1970年1月1日基準）", FancyDate.平気法, "Gyy年Mdd日 E Hm T Z N" ]
      [ "火星太陽暦（前1年9月1日＝火星暦1年1月1日）", FancyDate.MarsGregorian, "yyyy/MM/dd E HH:mm T Z" ]
    ]

  created: ->
    @tick()
  
  destroyed: ->
    @current_at = 0

  methods:
    tick: ->
      console.log await Tempo.sleep @minutes
      if @current_at
        @current_at = Date.now()
        @tick()

  computed:
    minutes: ->
      @calendars.map ([,c])=> c.to_tempos( @current_at ).m
    results: ->
      @calendars.map ([label, c, date_f, time_f ])=>
        [,, time_f] = date_f.split(/\s+/)
        [yMd, E, Hm, T,Z,N] = c.format(@current_at, date_f ).split(/\s+/)
        { 日の出, 南中時刻, 日の入 } = c.solor @current_at

        [ label
          yMd
          E
          Hm

          T
          Z
          N

          c.format  日の出, time_f
          c.format 南中時刻, time_f
          c.format  日の入, time_f
        ]

</script>
