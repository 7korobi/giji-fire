_ = require "lodash"
Mem = require "./index.coffee"
Query = require "./query.coffee"

OBJ = ->
  new Object null

f_reset = (list, parent)->
  @all._finder.reset @all, list, parent

f_merge = (list, parent)->
  @all._finder.merge @all, list, parent

f_remove = (list)->
  @all._finder.remove @all, list

f_item = (cb)->
  (item, parent)->
    if item?
      cb.call @, [item], parent

f_clear = ->
  @all._finder.clear_cach @all


module.exports = class Set extends Array
  @$deploy: (map, model, item, parent)->

  @bless: (list)->
    list.__proto__ = @::
    list

  @find: (id)->
    _memory[id].item

  @form: (id)->
    _memory[id].form ?= do ->
      # TODO
      o = _.cloneDeep @find id
      o.__proto__ = Form::

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

  update: (item, old)->
  create: (item)->
  delete: (old)->

  set:           f_reset
  reset:         f_reset

  merge:         f_merge
  add:    f_item f_merge
  append: f_item f_merge

  reject:        f_remove
  del:    f_item f_remove
  remove: f_item f_remove

  clear_cache:   f_clear
  refresh:       f_clear
  rehash:        f_clear
