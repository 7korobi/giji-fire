_ = require "lodash"
Mem = require "./index.coffee"
Query = require "./query.coffee"

module.exports = class List extends Array
  @bless: (list, query)->
    list.__proto__ = @::
    list.query = query
    list

  sort: (sort...)->
    o = _.orderBy @, sort...
    o.__proto__ = @__proto__
    o

  group_by: (cb)->
    o = _.groupBy @, cb
    for key, oo of o
      oo.__proto__ = @__proto__
    o

  page_by: (per)->
    idx = 0
    Object.values @group_by (o)->
      Math.floor(idx++ / per)

  where: (req)-> @query.where req
  in:    (req)-> @query.in    req
