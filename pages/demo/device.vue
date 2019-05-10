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
    table
      tbody
        tr
          td
          th.c x
          th.c y
          th.c z
        tr
          td.r accel: {
          td.r x: {{ accel.x }}
          td.r y: {{ accel.y }}
          td.r z: {{ accel.z }}
          td.l }
        tr
          td.r gravity: {
          td.r x: {{ gravity.x }}
          td.r y: {{ gravity.y }}
          td.r z: {{ gravity.z }}
          td.l }
        tr
          td.r accel_with_gravity: {
          td.r x: {{ accel_with_gravity.x }}
          td.r y: {{ accel_with_gravity.y }}
          td.r z: {{ accel_with_gravity.z }}
          td.l }

  c-talk(handle="SSAY" deco="center" face_id="c30")
    table
      tbody
        tr
          td
          th.c alpha
          th.c beta
          th.c gamma
        tr
          td.r gyro: {
          td.r alpha: {{ gyro.alpha }}
          td.r beta: {{ gyro.beta }}
          td.r gamma: {{ gyro.gamma }}
          td.l }
        tr
          td.r rotate: {
          td.r alpha: {{ rotate.alpha }}
          td.r beta: {{ rotate.beta }}
          td.r gamma: {{ rotate.gamma }}
          td.l }

  c-talk(handle="SSAY" deco="center" face_id="c40")
    table
      tbody
        tr
          td.r longitude: {{ geo.longitude }},
          td
        tr
          th.r
            p altitude: {{ geo.altitude }},
            p heading: {{ geo.heading }},
            p speed: {{ geo.speed }},
          td.r latitude: {{ geo.latitude }},

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
{ geo, scroll, accel, rotate, device } = require "vue-petit-store"

device
  pow: 100

module.exports =
  head: ->
    title: '人狼議事 - 開発者用ページ'
  mixins: [
    geo()
    scroll()
    accel()
    rotate()
  ]

  computed: {}

</script>
