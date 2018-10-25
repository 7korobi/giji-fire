_ = require "lodash"
# Mem = require "./index.coffee"



module.exports = class Model
  @rowid = 0

  @bless: (o)->
    o.__proto__ = @::
    o

  @$deploy: (item, parent)->
    @bless item
    Object.assign item, parent
    for deploy in @$name.deploys
      deploy.call item, @
    unless item.id
      throw new Error "detect bad data: #{JSON.stringify item}"

  @update: (item, old)->
  @create: (item)->
  @delete: (old)->

  @aggregate: [
    (o, idx)->
  ]

  @map_partition:  (item, emit)->
    emit
      set: item.id

  @map_reduce: (item, emit)->
    undefined

  @order: (reduce, emit)->
    undefined
