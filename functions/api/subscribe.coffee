{ firestore, database, https } = require 'firebase-functions'
admin = require 'firebase-admin'

ref_for = ( mode, type, doc )->
  { _id } = doc
  return unless _id
  [ folder, book_idx ] = _id.split("-")
  book_id = "#{folder}-#{book_idx}"

  admin
  .firestore()
  .doc "#{mode}/#{book_id}/#{type}/#{_id}"


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
      { mode, book_id, part_id, face_id, is_notice } = query
      m_book =
        topic: "init"
        notification: 
          title: '村の情報'
          body: ""
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
                m_book.topic = book_id
                m_book.notification.body = """
                  #{part_id}
                  新しい参加者がいます。
                """
                await admin.messaging().send m_book

              when !! part_id
                m_book.topic = book_id
                if is_notice
                  m_book.notification.body = """
                    #{part_id}
                    もうすぐ日付が進みます。
                  """
                else
                  m_book.notification.body = """
                    #{part_id}
                    日付が進みました。
                  """
                await admin.messaging().send m_book

              else
                m_book.topic = mode
                m_book.notification.body = """
                  #{book_id}
                  新しい村が現れました。
                """
                await admin.messaging().send m_book

      res.status(201).send("OK.")

# obsolete
  wiki_potof:
    https.onCall (doc, { auth })->
      console.log auth
      ref_for "wiki", "potofs", doc
      .set doc,
        merge: true

  wiki_potof_delete:
    https.onCall (doc, { auth })->
      console.log auth
      ref_for "wiki", "potofs", doc
      .delete()


  wiki_chat:
    https.onCall (doc, { auth })->
      console.log auth
      ref_for "wiki", "chats", doc
      .set doc,
        merge: true

  wiki_chat_delete:
    https.onCall (doc, { auth })->
      console.log auth
      ref_for "wiki", "chats", doc
      .delete()


  book_chat:
    https.onCall (doc, { auth })->
      console.log auth
