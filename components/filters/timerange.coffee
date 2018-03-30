moment = require "~/plugins/moment"

to_time = (msec)->
  i = msec / 1000
  return "#{Math.ceil i}s" if i < 60
  i = i / 60
  return "#{Math.ceil i}m" if i < 60
  i = i / 60
  return "#{Math.ceil i}h" if i < 24
  i = i / 24
  return "#{Math.ceil i}d"

module.exports = ({ min, max, range })->
  return "" unless range?
  min_str = moment(min).format('ddd HH時')
  max_str = moment(max).format('ddd HH時')
  if min_str == max_str
    max_str
  else
    if range < 12 * 3600 * 1000
      max_str = moment(max).format('-HH時')
      min_str.replace "時", max_str
    else
      min_str + " - " + max_str

