<script lang="coffee">
moment = require '~/plugins/moment'

SECOND = 1000
MINUTE = SECOND * 60
HOUR = MINUTE * 60
DAY = HOUR * 24
WEEK = DAY * 7
MONTH = DAY * 30
YEAR = DAY * 365

locales = [
  "%s年後"
  "%sヶ月後"
  "%s週間後"
  "%s日後"
  "%s時間後"
  "%s分後"
  "%s秒後"
  "今"
  "%s秒前"
  "%s分前"
  "%s時間前"
  "%s日前"
  "%s週間前"
  "%sヶ月前"
  "%s年前"
]

times = [
  [    -YEAR,   YEAR]
  [   -MONTH,  MONTH]
  [    -WEEK,   WEEK]
  [     -DAY,    DAY]
  [    -HOUR,   HOUR]
  [  -MINUTE, MINUTE]
  [   -25000, SECOND]
  [    25000,  25000]
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
  date:
    format: (since)->
      moment since
      .format('ll') + "頃"

  short:
    format: (since)->
      moment since
      .format 'l'

module.exports =
  data: ->
    now: null
    tick: Infinity
    interval: null

  props:
    since:
      required: true
    maxTime:
      type: Number
      default: 1 * YEAR
    lock:
      type: Boolean
      default: false
    format:
      type: String
      default: "date"

  computed:
    sinceTime: ->
      new Date(@since).getTime()
    msec: ->
      @tick = Infinity
      @now = Date.now()
      @now - @sinceTime
    time: ->
      for [limit], idx in times when @msec < limit
        return times[idx]
      return times[-1...][0]
    timeago: ->
      if @maxTime && @msec > @maxTime
        clearInterval @interval
        @interval = null
        return format[@format].format(@sinceTime)

      [_, base, text] = @time
      msec = Math.abs 100 + @msec
      count = Math.floor msec / base # 八捨九入
      @tickTime
      text.replace '%s', count
    tickTime: ->
      return Infinity if @lock
      [_, base] = @time
      tick = base
      if Infinity == @tick
        tick = -@msec % base
        if tick < 0
          tick += base
      if @tick != tick
        if @interval
          clearInterval @interval
        @interval = setInterval =>
          @now = Date.now()
          @tickTime
        , @tick = tick
      @tick

  render: (m)->
    m 'time', @timeago

  beforeDestroy: ->
    return if @lock
    clearInterval @interval
    @interval = null
</script>
