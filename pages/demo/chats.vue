
<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ

  c-talk(key="stylecheck" :write_at="now - 3600000" face_id="f5" to="幻日世界" sign="ななころび" head="宝珠 コーラ" handle="SSAY")
    pre
      code
        | 123456789012345678901234567890123456789012345678901234567890
        | ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
        | アイウエオカキクケコサシスセソタチ、ツテトナニヌネノヤユヨ
        | ～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
    | 123456789012345678901234567890123456789012345678901234567890
    blockquote
      | 123456789012345678901234567890123456789012345678901234567890
      | あいうえおかきくけこさしすせそたち、つてとなにぬねのやゆよ
      blockquote
        | あいうえおかきくけこさしすせそたち、つてとなにぬねのやゆよ
    hr
    h6 h6
    h5 h5
    h4 h4
    h3 h3
    h2 h2
    h1 h1
    fieldset
      legend
        input(type="checkbox")
        | form items

    ul.task-list
      li.task-list-item one
      li.task-list-item two
      ol
        li three
        li four

    table
      thead
        tr
          th Tables
          th.c Are
          th.r Cool
      tbody
        tr
          td
            label
              | form
          td.c
            input(style="width: 3em" type="text")
            input(style="width: 3em" type="number")
            select
              option 1
              option 2
            input(type="checkbox")
            input(type="radio")
          td.r $1600
        tr
          td row 3
          td(style="text-align: center;")
          td.r $12
    .date
      abbr anker

  c-talk(v-for="(handle, idx) in handles" :key="'E' + handle" :face_id="'c' + (10 + idx)", :write_at="now - 3600000", to="宛先" sign="ななころび" :head="handle" :handle="handle" :deco="deco(idx)")
    ins 霜草蒼蒼
    nuxt-link(to="/demo/timeago")
      | 人絶獨
      sup 出
    sub 門前望野
    strong 蟲切切村
    label 南村北行
    kbd 霜草蒼蒼
    abbr 蟲切切村
    code 南村北行
    s 人絶獨出
    del /*門前望野*/
    ruby
      | 田
      rt なむなむなむ
    span(data-ruby="なむなむなむ")
      | 月出
    a(title="Hello World")
      | 蕎麥花
      sup 如
      sub 雪
    input(style="width: 3em" type="text")
    input(style="width: 3em" type="number")
    select
      option 1
      option 2

    hr
    h6 h6
    hr.stripe
    h5 h5
    hr.footnote
    .date
      abbr anker

  div(v-for="(handle, idx) in colors")
    banner
      h2 p{{ 1 + idx }}
    c-report(:key="'R' + handle" :handle="handle" deco="center")
      | 表題サンプル
      .date
        abbr
          | {{handle}}

    c-post(:key="'P' + handle" :handle="handle" deco="giji")
      | アクション、ト書きサンプル

  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
</template>

<script lang="coffee">
{ Query } = require 'memory-orm'

module.exports =
  computed:
    now: ->
      Date.now()
    
    colors: ->
      """DEL_M DEL_S ADMIN executed suicide victim cursed feared droop mob alive grave visiter juror live suddendead leave  LOVER HATER PIXI GURU EVIL LONEWOLF WOLF HUMAN DISH MOB NONE  FSAY LSAY hide GAIM  AIM MSAY SSAY VSSAY GSAY VGSAY WSAY PSAY XSAY TSAY public private MAKER TITLE""".split /\s+/
    handles: ->
      'O0 O1 O2 O3 MAKER O5 TITLE O7 ADMIN O9 A0 A1 public A3 A4 A5 A6 A7 A8 A9 WSAY LSAY F2 XSAY F4 FSAY F6 F7 F8 F9 T0 TSAY T2 hide T4 HSAY T6 T7 T8 T9 Y0 VSSAY SSAY Y3 Y4 Y5 VGSAY GSAY Y8 Y9 W0 PSAY AIM W3 ELSE W5 GAIM W7 W8 W9'.split /\s+/
  methods:
    deco: (idx)->
      ["","head","mono"][idx % 3]

</script>


