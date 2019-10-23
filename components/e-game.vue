<template lang="pug">
c-post(handle="MAKER")
  span(v-if="! is_open")
    | ゲーム設定
  btn.pull-right(v-if="is_open" v-model="is_open" :as="false")
    | ▲
  btn.pull-right(v-else v-model="is_open" :as="true")
    | ▼

  p.ban(v-for="msg in bans_local") {{ msg }}
  p.warn(v-for="msg in warns_local") {{ msg }}
  table(v-if="is_open")
    tbody
      tr
        td(colspan="2")
          btn(:value="mark_ids" @input="emit_mark_ids" :as="[]")
            i.mdi.mdi-eraser
          check(v-for="o in marks" :value="mark_ids" @input="emit_mark_ids" :as="o.id" :key="o.id")
            img.mark(:src="o.path")

      tr
        td.r
          label(style="display: block" for="label") 名称
        td
          input#label(:value="label" size="20" maxlength="20" @input="emit_label")

      tr
        td.r
          label(style="display: block" for="potof_max") 参加人数
        td
          input#potof_max(type="number" min="4" max="25" :value="potof_max" @input="emit_potof_max")

      tr
        td.r
          label(style="display: block") 「１日」の長さ
        td
          btn(as="1日" :value="range" @input="emit_range") 1日
          btn(as="2日" :value="range" @input="emit_range") 2日
          btn(as="3日" :value="range" @input="emit_range") 3日
      tr
        td.r
          label(style="display: block" for="gap") 更新時刻
        td
          input#gap(type="time" :value="gap_time" step="300" @input="emit_gap")

      tr
        td.r
          label(style="display: block" for="off") 消灯時間
        td
          span
            btn(as="0" :value="off" @input="emit_off") なし
            btn(as="5分" :value="off" @input="emit_off") 5分間
            btn(as="1時" :value="off" @input="emit_off") 1時間
          span(v-if="'1日' < range")
            btn(as="1日" :value="off" @input="emit_off") 1日間

      slot

</template>
<script lang="coffee">
_ = require 'lodash'
{ Query } = require 'memory-orm'
{ to_tempo, to_msec } = require "vue-petit-store"
{ error } = require "~/plugins/form"

module.exports =
  mixins: [
    error 'bans', ( chk )->
      chk "名称が短すぎます。"      , @label.length < 1
      chk "名称が長すぎます。"      , 20 < @label.length
      chk "消灯時間を選びなおします。", "1日" == @off && "1日" == @range
    error 'warns', ( chk )->
      chk "こだわりはありませんか？", ! @mark_ids.length
  ]
  data: ->
    is_open: false
  props: ['label', 'mark_ids', 'potof_max', 'range', 'gap', 'gap_days', 'off']

  computed:
    gap_time: ->
      @gap.replace("時",":").replace("分","")

    marks: ->
      Query.marks.where(enable: true).list

  methods:
    new_gap_days: (range, gap)->
      day = to_msec("1日")
      base_at  = to_tempo("1日", gap).last_at
      range_at = to_tempo(range, gap).last_at
      if i = ( base_at - range_at ) / day
        "#{i}日"
      else
        ""

    emit_off: (_off)->
      @$emit "update:off", _off

    emit_gap: (e)->
      gap = e.target.value.replace(":","時") + '分'
      @$emit "update:gap", gap
      @$emit "update:gap_days", @new_gap_days @range, gap

    emit_range: (range)->
      @$emit "update:range", range
      @$emit "update:gap_days", @new_gap_days range, @gap

    emit_label: (e)->
      @$emit "update:label", e.target.value

    emit_mark_ids: (mark_ids)->
      @$emit "update:mark_ids", mark_ids

    emit_potof_max: (e)->
      @$emit "update:potof_max", e.target.value

</script>
