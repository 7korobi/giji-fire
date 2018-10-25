format = require 'date-fns/format'
locale = require "date-fns/locale/ja"

to_time = (msec)->
  i = msec / 1000
  return "#{Math.ceil i}s" if i < 60
  i = i / 60
  return "#{Math.ceil i}m" if i < 60
  i = i / 60
  return "#{Math.ceil i}h" if i < 24
  i = i / 24
  return "#{Math.ceil i}d"

module.exports = (o)->
  return "" unless o
  { min, max, range } = o
  return "" unless min? && max? && range?

  min_str = format min, 'dd HH時', { locale }
  max_str = format max, 'dd HH時', { locale }
  if min_str == max_str
    max_str
  else
    if range < 12 * 3600 * 1000
      max_str = format max, '-HH時', { locale }
      min_str.replace "時", max_str
    else
      min_str + " - " + max_str

