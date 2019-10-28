module.exports = (str)->
  if str?.replace?
    str.replace /&#(\d+);/, (_, code)->
      String.fromCharCode code
  else
    