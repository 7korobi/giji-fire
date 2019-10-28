func = require 'firebase-functions'
admin = require 'firebase-admin'

serviceAccount = require "~/app/config/service_account.yml"

admin.initializeApp
  credential:  admin.credential.cert serviceAccount
  databaseURL: "https://giji-db923.firebaseapp.com"

module.exports = {
  ...require './timer'
  ...require './subscribe'
  ...require './book'

  packMessage:
    func.https.onCall ({ text }, { auth })->
      { uid } = auth
      { name, picture, email } = auth.token

      { uid, email, picture, name, text }

}
