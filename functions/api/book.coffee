{ firestore, database, https } = require 'firebase-functions'
admin = require 'firebase-admin'
{ startGM, deployGM, executionGM, checkGM } = require './game/progress'

ref_for = ( mode, type, doc )->
  { _id } = doc
  return unless _id
  [ folder, book_idx ] = _id.split("-")
  book_id = "#{folder}-#{book_idx}"

  admin
  .firestore()
  .doc "#{mode}/#{book_id}/#{type}/#{_id}"

next_idx = (ref)->
  ref = await ref.orderBy("idx", "desc").limit(1).get()
  idx = ref?.docs?.idx
  if -1 < idx
    idx + 1
  else
    0


module.exports =
  book_created:
    firestore.document('{mode}/{book_id}/{type}/{id}').onCreate (snap, { params })->
      console.log params
      console.log snap.data()

      { mode, book_id, type, id } = params
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

  book_deleted:
    firestore.document('{mode}/{book_id}/{type}/{id}').onDelete (snap, { params })->
      console.log params
      console.log snap.data()

      { mode, book_id, type, id } = params
      null

  chat_updated:
    firestore.document('{mode}/{book_id}/chats/{id}').onUpdate ({ before, after }, { params })->
      console.log params
      console.log after.data()
      { mode, book_id } = params

  game_updated:
    firestore.document('game/{book_id}').onUpdate ({ before, after }, { params })->
      { book_id } = params
      idx = await next_idx admin.firestore().collection("game/#{book_id}/parts")
      _id = "#{book_id}-#{idx}"
      label =
        switch idx
          when 0
            "プロローグ"
          else
            "#{idx}日目"
      write_at = new Date - 0
      admin.firestore().doc("game/#{book_id}/parts/#{_id}").set { _id, idx, label, write_at }
      null
