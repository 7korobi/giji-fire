require "~/models/index"
{ Set } = require "memory-orm"

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


module.exports = edit =
  potof:
    _id: 'edit-edit-self'
    tag_id: ""
    face_id: ""
    job: ""
    sign: "ななころび"

  phase:
    _id: 'edit-edit-edit-edit'
    handle: 'SSAY'

  chat:
    _id: 'edit-edit-edit-edit-edit'
    potof_id: "edit-edit-self"
    write_at: 0
    show: "talk"
    deco: "giji"
    to: null
    head: ""
    log: ""
    random: []
    new_idx: (zero = 0)->
      Base59.num2str new Date - zero

edit.org_chat = edit.chat

Set.chat.add  edit.chat
Set.phase.add edit.phase
Set.potof.add edit.potof
