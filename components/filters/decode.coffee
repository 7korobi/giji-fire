module.exports = (str)->
  str.replace /&#(\d+);/, (_, code)->
    String.fromCharCode code
