{ firestore, database, https } = require 'firebase-functions'
admin = require 'firebase-admin'
moment = require 'moment'

serviceAccount = require "~/config/service_account.yml"

admin.initializeApp
  credential:  admin.credential.cert serviceAccount
  databaseURL: "https://api-project-54633717694.firebaseio.com"


msec = (timespan)->
  since = parseFloat timespan
  timespan.replace /week|day|hour|min|sec/, (unit, idx)->
    switch unit
      when "week"
        since *= 7 * 24 * 60 * 60 * 1000
      when "day"
        since *=     24 * 60 * 60 * 1000
      when "hour"
        since *=          60 * 60 * 1000
      when "min"
        since *=               60 * 1000
      when "sec"
        since *=                    1000
  parseInt since

three_day = msec '3day'
nine_hour = msec '9hour'
timezone = -nine_hour

tempo = (doc)->
  return null unless doc?.tempo?[0]

  since = msec doc.tempo[0] || '1day'
  gap   = msec doc.tempo[1] || '0'
  gap -= nine_hour

  now_idx = parseInt(( new Date - gap) / since)
  if now_idx != doc.last_idx
    doc.last_idx = now_idx
  else
    null


module.exports =
  chk_update:
    firestore.document('parts/{part_id}').onUpdate ({ data, params })->
      console.log data.data()
      console.log params

  tick_https:
    # _id:
    #    _id: _id
    #    is_active: true
    #    last_idx: Number
    #    tempo: ["15min"]
    #
    https.onRequest (req, res)->
      now_s = moment(new Date - timezone).format("YYYY/MM/DD HH:mm:ss")
      qs = await admin.firestore().collection('parts').where('is_active','==',true).get()
      for doc in qs.docs
        part = doc.data()
        if tempo part
          part.write_at = new Date - 0
          part.at = now_s
          admin.firestore().doc("parts/#{part._id}").set part,
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

    now = moment(new Date() - timezone).format("YYYY/MM/DD HH:mm:ss");
###
