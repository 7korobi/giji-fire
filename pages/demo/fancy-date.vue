<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
  c-post(handle="PSAY")
    p.r 差分 {{ since }} msec
    table
      tbody(v-for="[label, [yMd, Hm, Hrmr, ao, ar, Ao, Ar, Eo, Er, Fo, Fr, J, No, Nr, Zo, Zr], 日出, 南中, 日入, { year, day, leap }, data] in results")
        tr
          th.c(colspan="7") {{ label }}
        tr
          th.r.note(colspan="4") 日付
          th.c.note 曜
          th.l.note 時刻
          th(rowspan="7").c
            .form
              a.btn(@click="reset") reset
            .form
              a.btn(@click="back(data[1], '1年')") −
              | 年
              a.btn(@click="succ(data[1], '1年')") ＋
            .form
              a.btn(@click="back(data[1], '1月')") −
              | 月
              a.btn(@click="succ(data[1], '1月')") ＋
            .form
              a.btn(@click="back(data[1], '1週')") −
              | 週
              a.btn(@click="succ(data[1], '1週')") ＋
            .form
              a.btn(@click="back(data[1], '1日')") −
              | 日
              a.btn(@click="succ(data[1], '1日')") ＋
            .form
              a.btn(@click="back(data[1], '1時')") −
              | 時
              a.btn(@click="succ(data[1], '1時')") ＋
            .form
              a.btn(@click="back(data[1], '1分')") −
              | 分
              a.btn(@click="succ(data[1], '1分')") ＋
            .form
              a.btn(@click="back(data[1], '1秒')") −
              | 秒
              a.btn(@click="succ(data[1], '1秒')") ＋
        tr
          td.r(colspan="4") {{ yMd }}
          td.c
            ruby(:data-ruby="Er") {{ Eo }}
          td.l
            ruby(:data-ruby="Hrmr") {{ Hm }}
        tr
          th.c.note(colspan="6")
        tr
          td
          th.r.note(colspan="1") 月相
          td.l
            ruby(:data-ruby="Nr") {{ No }}
          th.r.note(colspan="2") 日出
          td.l
            ruby(:data-ruby="日出[1]") {{ 日出[0] }}
        tr
          td
          th.r.note(colspan="1") 節気
          td.l
            ruby(:data-ruby="Zr") {{ Zo }}
          th.r.note(colspan="2") 南中
          td.l
            ruby(:data-ruby="南中[1]") {{ 南中[0] }}
        tr
          td
          th.r.note(colspan="1") 九星
          td.l
            ruby(:data-ruby="Fr") {{ Fo }}
          th.r.note(colspan="2") 日入
          td.l
            ruby(:data-ruby="日入[1]") {{ 日入[0] }}
        tr
          td
          th.r.note(colspan="1") 干支
          td.l(colspan="3")
            ruby(:data-ruby="ar") {{ ao }}年
            | &nbsp;
            ruby(:data-ruby="Ar") {{ Ao }}日
        tr
          td.r.form(colspan="7")
            input(v-model="data[2]" size="60")
        tr
          td.r(colspan="7") 時間:分:秒
        tr
          td.r(colspan="7") {{ day.join(":") }}

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
    since: 0
    calendars: [
      [ "グレゴリオ暦", FancyDate.Gregorian, "Gyyyy/MM/dd HH:mm Hrmr ao ar Ao Ar Eo Er Fo Fr J No Nr Zo Zr" ]
      [ "太陽太陰暦（地球、月）", FancyDate.平気法, "Gyy年Modd日 Homo Hrmr ao ar Ao Ar Eo Er Fo Fr J No Nr Zo Zr" ]
      [ "フランス革命歴", FancyDate.フランス革命暦, "Gyyy年Modd日 HH:mm Hrmr ao ar Ao Ar Eo Er Fo Fr J No Nr Zo Zr" ]
      [ "ロムルス歴", FancyDate.Romulus, "Gyyyy/MM/dd HH:mm Hrmr ao ar Ao Ar Eo Er Fo Fr J No Nr Zo Zr" ]
      [ "太陽太陰暦（木星、カリスト）", FancyDate.Jupiter, "Gyyyy/MM/dd HH:mm Hrmr ao ar Ao Ar Eo Er Fo Fr J No Nr Zo Zr" ]
      [ "太陽暦（火星）", FancyDate.MarsGregorian, "Gyyyy/MM/dd HH:mm Hrmr ao ar Ao Ar Eo Er Fo Fr J No Nr Zo Zr" ]
    ]

  created: ->
    @tick()
  
  destroyed: ->
    @current_at = @since = 0

  methods:
    back: (c, diff)->
      @since += c.back_msec @current_at, diff
      console.warn { c, diff }

    succ: (c, diff)->
      @since += c.succ_msec @current_at, diff
      console.warn { c, diff }

    reset: ->
      @since = 0

    tick: ->
      console.log await Tempo.sleep @minutes
      if @current_at
        @current_at = Date.now()
        @tick()

  computed:
    show_at: ->
      @current_at + @since

    minutes: ->
      @calendars.map ([,c])=> c.to_tempos( @show_at ).m

    results: ->
      @calendars.map (data)=>
        [label, c, date_f] = data
        [, time_fo, time_fr] = date_f.split(/\s/)
        time_f = "#{time_fo} #{time_fr}"
        { 日の出, 南中時刻, 日の入 } = c.solor @show_at

        [ label
          c.format(@show_at, date_f ).split(/\s/)
          c.format(  日の出, time_f).split(/\s/)
          c.format( 南中時刻, time_f).split(/\s/)
          c.format(  日の入, time_f).split(/\s/)
          c.precision()
          data
        ]

</script>
