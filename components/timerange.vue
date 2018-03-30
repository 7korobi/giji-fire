<script lang="coffee">
SECOND = 1000
MINUTE = SECOND * 60
HOUR = MINUTE * 60
DAY = HOUR * 24
WEEK = DAY * 7
MONTH = DAY * 30
YEAR = DAY * 365

locales = [
  " %s 秒間"
  " %s 分間"
  " %s 時間"
  " %s 日間"
  " %s 週間"
  " %s ヶ月間"
  " %s 年間"
]

times = [
  [   MINUTE, SECOND]
  [     HOUR, MINUTE]
  [      DAY,   HOUR]
  [     WEEK,    DAY]
  [    MONTH,   WEEK]
  [     YEAR,  MONTH]
  [ Infinity,   YEAR]
]
for time, idx in times
  time[2] = locales[idx]

format =
  date: new Intl.DateTimeFormat 'ja-JP',
    year:  "numeric"
    month: "2-digit"
    day:   "2-digit"
    weekday: "short"
    hour:    "2-digit"

  num: new Intl.NumberFormat 'ja-JP',
    style: 'decimal'
    useGrouping: true
    minimumIntegerDigits: 1
    minimumSignificantDigits:  1
    maximumSignificantDigits: 21
    minimumFractionDigits: 0
    maximumFractionDigits: 2


module.exports =
  props:
    range:
      required: true

  computed:
    time: ->
      for [limit], idx in times when @range < limit
        return times[idx]
      return times[-1...][0]
    timerange: ->
      [_, base, text] = @time
      count = Math.floor @range / base # 切り捨て
      text.replace '%s', count

  render: (m)->
    m 'time', @timerange

</script>
