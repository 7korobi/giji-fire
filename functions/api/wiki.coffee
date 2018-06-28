{ firestore, database, https } = require 'firebase-functions'
admin = require 'firebase-admin'

module.exports =
  book_create:
    firestore.document('{mode}/{book_id}/{type}/{id}').onCreate (snap, { params })->
      console.log params
      console.log snap.data()

      { mode, book_id, type, id } = params
      ref_potofs = await admin.firestore().collection("#{mode}/#{book_id}/potofs").get()
      fcm_tokens =
        for doc in ref_potofs.docs
          s = doc.data().fcm_token
          continue unless s
          s

      switch type
        when 'chats'
          payload =
            notification: 
              title: 'chat message here!'
              body: "#{book_id} updated. chat updated."
#              icon: ""

        when 'potofs'
          payload =
            notification: 
              title: 'potof here!'
              body: "#{book_id} updated. potof updated."
#              icon: ""

      await admin.messaging().sendToDevice fcm_tokens, payload

  book_delete:
    firestore.document('{mode}/{book_id}/{type}/{id}').onDelete (snap, { params })->
      console.log params
      console.log snap.data()

      { mode, book_id, type, id } = params

  book_update:
    firestore.document('{mode}/{book_id}/{type}/{id}').onUpdate ({ before, after }, { params })->
      console.log params
      console.log after.data()

  post:
    https.onCall ( data, { auth })->
      console.log auth
      console.log data
