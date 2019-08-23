{ firestore, database, https } = require 'firebase-functions'
admin = require 'firebase-admin'
format = require 'date-fns/format/index'
locale = require "date-fns/locale/ja"

{ to_msec, to_tempo } = require "vue-petit-store"

tempo = (doc)->
  return null unless doc?.tempo?[0]

  { last_at, write_at, next_at, now_idx, timezone } = to_tempo ...doc.tempo

  if now_idx != doc.last_idx
    Object.assign doc, { last_at, write_at, next_at }
    doc.write_time = format write_at - timezone, "yyyy/MM/dd HH:mm:ss", { locale }
    doc.next_time  = format next_at  - timezone, "yyyy/MM/dd HH:mm:ss", { locale }
    doc.last_time  = format last_at  - timezone, "yyyy/MM/dd HH:mm:ss", { locale }
    doc.last_idx = now_idx
  else
    null


module.exports =
  chk_update:
    firestore.document('parts/{part_id}').onUpdate ({ before, after }, { params })->
      console.log params
      console.log after.data()
      null

  tick_https:
    # _id:
    #    _id: _id
    #    is_active: true
    #    last_idx: Number
    #    tempo: ["15min"]
    #
    https.onRequest (req, res)->
      qs = await admin.firestore().collection('parts').where('is_active','==',true).get()
      for doc in qs.docs
        part = doc.data()
        if tempo part
          admin.firestore().doc("parts/#{part._id}").set part,
            merge: true

      qs = await admin.firestore().collection('game').where('is_active','==',true).get()
      for doc in qs.docs
        book = doc.data()
        if tempo book
          admin.firestore().doc("game/#{book._id}").set book,
            merge: true

      res.status(201).send("OK.")

###
  cheat seet.
    database.ref('/tick/at').onWrite (e)->

    ref = admin.database().ref("/tick")
    oo = await ref.once('value')
    o = oo?.val()
    ref.set(o);


    firestore.document('test/{test_id}').onUpdate ({ data, params })->
      data.previous?.data()
      data.data()
      data.ref.set { now }, { merge: true }
      params.test_id

    ref = admin.firestore().doc('test/tick')
    oo = await ref.get()

    now_s = format new Date - timezone, "yyyy/MM/dd HH:mm:ss", { locale }
###
