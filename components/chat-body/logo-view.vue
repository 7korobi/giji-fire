<template lang="pug">
article
  .name
    | {{ value.id }} by {{ value.sign }}
    img.mark.pull-right(:src="o.path" v-for="o in use_marks")
  hr
  center
    br
    h2 {{ value.label }}
    br
  hr.stripe(v-if="tempo.next_at || potofs.length")
  center
    table
      tbody
        tr(v-if="potofs.length")
          td.r 参加人数
          td {{ potofs.length }}人 / {{ value.potof_max }}人
        tr(v-if="tempo.next_at")
          td.r 日程
          td {{ value.range }}毎 {{ value.gap }}
        tr(v-if="tempo.next_at")
          td.r 次の更新
          td {{ next_time }}
        tr(v-if="tempo.next_at")
          td.r 次の消灯
          td {{  off_time }}

    table(v-if="tempo.next_at")
      tbody
        tr.TSAY
          td.c 日
          td.c 月
          td.c 火
          td.c 水
          td.c 木
          td.c 金
          td.c 土
        tr(v-for="week in calendar")
          td(v-for="[cn, title, body] in week" :class="cn")
            | {{ title }}
            br
            | {{ body }}

</template>

<script lang="coffee">
{ Query } = require 'memory-orm'
{ to_tempo, to_msec, path_by } = require "vue-petit-store"

def = (module)->
  if window?
    module.default
  else
    module

format = def require 'date-fns/format'
locale = def require "date-fns/locale/ja"

startOfMonth = def require "date-fns/startOfMonth"
startOfWeek = def require "date-fns/startOfWeek"
endOfMonth = def require "date-fns/endOfMonth"
endOfWeek = def require "date-fns/endOfWeek"
addMonths = def require "date-fns/addMonths"
isWeekend = def require "date-fns/isWeekend"

DAY = to_msec "1d"

module.exports =
  props: ["value"]

  computed:
    calendar: ->
      now = new Date
      head_at = startOfWeek(now).getTime();
      { range, gap_days, gap } = @value
      unless range && gap_days && gap
        return [[]]

      get_day = (idx)=>
        day = head_at + DAY * idx
        { next_at } = to_tempo range, gap_days + gap, day
        iso = format day, 'yyyy-MM-dd', { locale }

        if now < day + DAY
          [
            if @$store.state.holidays[iso] || isWeekend(day)
              "WSAY"
            else
              "SSAY"
            format day, "M/d", { locale }
            if next_at < day + DAY && now < next_at
              format next_at, 'HH:mm', { locale }
            else
              "-"
          ]
        else
          ["","",""]
      [
        for idx in [ 0 ...  7]
          get_day idx
        for idx in [ 7 ... 14]
          get_day idx
        for idx in [14 ... 21]
          get_day idx
      ]

    tempo: ->
      return { next_at: 0 } unless @value.range && @value.gap_days && @value.gap
      to_tempo @value.range, @value.gap_days + @value.gap

    next_time: ->
      next_at = @tempo.next_at
      format next_at, "M月d日(EE) HH:mm", { locale }

    off_time: ->
      off_at = @tempo.next_at - to_msec @value.off || ""
      format off_at, "M月d日(EE) HH:mm", { locale }

    use_marks: ->
      Query.marks
      .where id: @value.mark_ids
      .list

    potofs: ->
      @value?.potofs?.list || []

  
</script>
