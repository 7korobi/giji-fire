func = require 'firebase-functions'

module.exports = {
  ...require './timer'

  packMessage:
    func.https.onCall ({ text }, { auth })->
      { uid } = auth
      { name, picture, email } = auth.token

      { uid, email, picture, name, text }

}
