func = require 'firebase-functions'
admin = require 'firebase-admin'

serviceAccount = require "~/config/service_account.yml"

admin.initializeApp
  credential:  admin.credential.cert serviceAccount
  databaseURL: "https://api-project-54633717694.firebaseio.com"

module.exports = {
  ...require './timer'
  ...require './book'

  packMessage:
    func.https.onCall ({ text }, { auth })->
      { uid } = auth
      { name, picture, email } = auth.token

      { uid, email, picture, name, text }

}
