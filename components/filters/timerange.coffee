format = require 'date-fns/format'
locale = require "date-fns/locale/ja"

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

