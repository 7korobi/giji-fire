func = require 'firebase-functions'
admin = require 'firebase-admin'


module.exports = {
  ...require './timer'
  hello:
    func.database.ref('/hello').onWrite (e)->
      await e.data.ref.set('world!')
      console.log 'write success'

  packMessage:
    func.https.onCall ({ text }, { auth })->
      { uid } = auth
      { name, picture, email } = auth.token

      { uid, email, picture, name, text }

}
