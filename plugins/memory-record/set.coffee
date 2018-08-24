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


module.exports = class Set
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
