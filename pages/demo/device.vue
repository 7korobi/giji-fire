<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ

  c-talk(handle="SSAY" deco="center" face_id="c10")
    article.fine(style="display: none")
      svg()
        g.edgePath
          path.path(v-for="(o, key) in []" fill="none" v-if="o" v-bind="o")
    h2 デバイスから取得できる情報
    
  c-talk(handle="SSAY" deco="center" face_id="c20")
    p accel:   {{ accel.label }}
    p gravity: {{ gravity.label }}
    table
      tbody
        tr
          td
          th.c xy
          th.c xz
        tr
          td.r accel: {
          td
            svg(v-bind="svg_xyz")
              g.edgePath
                path.path.solid(:d="`M${ -10 * accel.x },${ 10 * accel.y }L0,0`")
          td.r
            svg(v-bind="svg_xyz")
              g.edgePath
                path.path.solid(:d="`M${ -10 * accel.x },${ 10 * accel.z }L0,0`")
          td.l }
        tr
          td.r gravity: {
          td
            svg(v-bind="svg_xyz")
              g.edgePath
                path.path.solid(:d="`M${ -10 * gravity.x },${ 10 * gravity.y }L0,0`")
          td.r
            svg(v-bind="svg_xyz")
              g.edgePath
                path.path.solid(:d="`M${ -10 * gravity.x },${ 10 * gravity.z }L0,0`")
          td.l }
        tr
          td.r accel with gravity: {
          td
            svg(v-bind="svg_xyz")
              g.edgePath
                path.path.solid(:d="`M${ -10 * accel_with_gravity.x },${ 10 * accel_with_gravity.y }L0,0`")
          td.r
            svg(v-bind="svg_xyz")
              g.edgePath
                path.path.solid(:d="`M${ -10 * accel_with_gravity.x },${ 10 * accel_with_gravity.z }L0,0`")
          td.l }

  c-talk(handle="SSAY" deco="center" face_id="c30")
    p rotate: {{ rotate.label }}
    table
      tbody
        tr
          td
          th.c alpha
          th.c beta
          th.c gamma
        tr
          td.r gyro: {
          td
            svg(v-bind="svg_abg")
              g.edgePath
                path.path.solid(v-bind="roll(gyro.alpha)")
          td
            svg(v-bind="svg_abg")
              g.edgePath
                path.path.solid(v-bind="roll(gyro.beta)")
          td
            svg(v-bind="svg_abg")
              g.edgePath
                path.path.solid(v-bind="roll(gyro.gamma)")
          td.l }
        tr
          td.r rotate: {
          td
            svg(v-bind="svg_abg")
              g.edgePath
                path.path.solid(v-bind="roll(rotate.alpha)")
          td
            svg(v-bind="svg_abg")
              g.edgePath
                path.path.solid(v-bind="roll(rotate.beta)")
          td
            svg(v-bind="svg_abg")
              g.edgePath
                path.path.solid(v-bind="roll(rotate.gamma)")
          td.l }

  c-talk(handle="SSAY" deco="center" face_id="c40")
    p label: {{ geo.label }},
    p heading: {{ geo.heading }},
    p speed: {{ geo.speed }},
    svg(v-bind="svg_geo")
      g.edgePath
        path.path.solid(d="M-180,0L180,0M0,-90L0,90")
        path.path.solid(:d="`M${ geo.longitude },${ - geo.latitude }L0,0`")
        text.path(text-anchor="middle" :x=" geo.longitude " :y=" - geo.latitude ") {{ parseInt(geo.altitude * 100) / 100 }}

  c-talk(handle="SSAY" deco="center" face_id="c50")
    table
      tbody
        tr
          td.r width: {{ scroll.width   }},
          td
        tr
          th
          td.r
            p horizon: {{ scroll.horizon }},
            p height:  {{ scroll.height  }},
  c-talk(handle="SSAY" deco="center" face_id="c60")
    table
      tbody
        tr
          th 
          td.r top: {{ scroll.top }},
          th
        tr
          td.r left: {{ scroll.left }},
          td.r center: {{ scroll.center }},
          td.r right: {{ scroll.right }},
        tr
          th
          td.r bottom: {{ scroll.bottom }},
          th

  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
</template>
<script lang="coffee">
{ geo, gyro, scroll, accel, rotate, device } = require "vue-petit-store"

deg_to_r = Math.PI * 2 / 360

module.exports =
  head: ->
    title: '人狼議事 - 開発者用ページ'
  mixins: [
    geo()
    gyro()
    accel()
    rotate()
    scroll()
  ]
  methods:
    roll: (deg)->
      r = deg * deg_to_r
      d: "M#{ 100 * Math.sin r },#{ 100 * Math.cos r }L0,0"

  computed:
    svg_geo: ->
      viewBox: "-180 -90 360 180"
      width:  "24em"
      height: "12em"
    svg_xyz: ->
      viewBox: "-100 -100 200 200"
      width:  "10em"
      height: "10em"
    svg_abg: ->
      viewBox: "-100 -100 200 200"
      width:  "5em"
      height: "5em"
</script>
