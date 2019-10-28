{ Query, Set } = require 'memory-orm'

Base = (table)->
  size = table.length
  num2str: (num)->
    str = ""
    while num
      at = num % size
      str = table[at] + str
      num = Math.floor(num / size)
    str

Base59 = Base "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789"


module.exports =
  methods:
    new_idx: (zero = 0)->
      Base59.num2str new Date - zero

