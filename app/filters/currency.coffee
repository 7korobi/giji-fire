module.exports = (num, unit = "")->
  switch num
    when 0, undefined, null, Infinity
      " "
    else
      str = String Math.ceil num
      while str != str = str.replace /^(-?\d+)(\d{3})/, "$1,$2"
        true
      " #{str}#{unit}"
