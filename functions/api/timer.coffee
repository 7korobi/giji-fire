{ firestore } = require 'firebase-functions'
admin = require 'firebase-admin'
serviceAccount = require "~/config/service_account.yml"

admin.initializeApp
  credential:  admin.credential.cert serviceAccount
  databaseURL: "https://api-project-54633717694.firebaseio.com"

nine_hour = - 9 * 3600 * 1000 # 9 hour early.
tempo = (since)->
  f = ->
    { last_at } = f
    now_at = parseInt(( new Date - nine_hour) / since)
    if res = ( now_at != last_at )
      f.last_at = now_at
    res

tempos =
  min:  tempo        60 * 1000 # 10 minutes
  hour: tempo      3600 * 1000 #  1 hours
  day:  tempo 24 * 3600 * 1000 # 24 hours

logging = {}
setInterval ->
  { now, step } = await admin.firestore().doc('test/tick').get()

  for key, tempo of tempos
    logging[key] = tempo()
  console.log logging
, 30000

module.exports =
  tick:
    firestore.document('test/tick').onUpdate ({ data }, ctx)->
      # data.previous?.data()
      { now, step } = data.data()
      setTimeout ->
        now = new Date - 0
        data.ref.set { now }, { merge: true }
      , step
      return
