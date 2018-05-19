{ Set } = require "~/plugins/memory-record"

Base = (table)->
  size = table.length
  num2str: (num)->
    str = ""
    while num
      at = num % size
      str += table[at]
      num = Math.floor(num / size)
    str

Base59 = Base "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789"


module.exports = edit =
  book:
    _id: 'edit-edit'
  potof:
    _id: 'edit-edit-self'
    tag_id: ""
    face_id: ""
    job: ""
    sign: "ななころび"

  phase:
    _id: 'edit-edit-edit-SS'
    handle: 'SSAY'

  chat:
    _id: 'edit-edit-edit-SS-edit'
    potof_id: "edit-edit-self"
    write_at: 0
    show: "talk"
    deco: "giji"
    to: null
    head: ""
    log: ""
    new_idx: ->
      Base59.num2str new Date - 0

Set.book.add  edit.book
Set.phase.add edit.phase
Set.potof.add edit.potof
Set.chat.add  edit.chat
