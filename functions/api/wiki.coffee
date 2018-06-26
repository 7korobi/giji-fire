{ firestore, database, https } = require 'firebase-functions'
admin = require 'firebase-admin'
format = require 'date-fns/format'
locale = require "date-fns/locale/ja"

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


  update:
    firestore.document('{mode}/{book_id}/parts/{part_id}').onUpdate ({ data, params })->
      console.log data.data()
      console.log params
  
  post:
    https.onCall ( data, { auth })->
      console.log auth
      console.log data
