{ firestore, database, https } = require 'firebase-functions'
admin = require 'firebase-admin'



module.exports =
  subscribe:
    https.onCall ({ fcm_token, fcm_topics }, { auth })->
      fcm_tokens = [fcm_token]
      all =
        for topic in fcm_topics
          admin.messaging().subscribeToTopic fcm_tokens, topic
      Promise.all all

  unsubscribe:
    https.onCall ({ fcm_token, fcm_topics }, { auth })->
      fcm_tokens = [fcm_token]
      all =
        for topic in fcm_topics
          admin.messaging().unsubscribeFromTopic fcm_tokens, topic
      Promise.all all

  book_external:
    https.onRequest ({ query }, res)->
      { mode, book_id, part_id, face_id } = query
      message =
        topic: mode
        notification: 
          title: '村の情報'
        webpush:
          headers:
            TTL: '60'
          notification:
            click_action: 'https://giji.f5.si/'

      if book_id
        switch mode
          when "init"
            switch
              when !! face_id
                message.notification.body = """
                  #{book_id}
                  新しい参加者がいます。
                """
                await admin.messaging().send message

              when !! part_id
                message.notification.body = """
                  #{book_id}
                  日付が進みました。
                """
                await admin.messaging().send message

              else
                message.notification.body = """
                  #{book_id}
                  新しい村が現れました。
                """
                await admin.messaging().send message

      res.status(201).send("OK.")

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
          message =
            topic: book_id
            notification: 
              title: '新着'
              body: """
                #{book_id}
                あたらしい投稿があります。
              """

        when 'potofs'
          message =
            topic: book_id
            notification: 
              title: '新着'
              body: """
                #{book_id}
                あたらしい参加者がいます。
              """

      switch mode
        when 'wiki'
          Object.assign message,
            webpush:
              headers:
                TTL: '60'
              notification:
                click_action: 'https://giji.f5.si/wiki?idx=' + book_id

      await admin.messaging().send message

  book_delete:
    firestore.document('{mode}/{book_id}/{type}/{id}').onDelete (snap, { params })->
      console.log params
      console.log snap.data()

      { mode, book_id, type, id } = params
      null

  book_update:
    firestore.document('{mode}/{book_id}/chats/{id}').onUpdate ({ before, after }, { params })->
      console.log params
      console.log after.data()

      { mode, book_id, type, id } = params
      null
