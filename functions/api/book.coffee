{ firestore, database, https } = require 'firebase-functions'
admin = require 'firebase-admin'
{ startGM, deployGM, executionGM, checkGM } = require './game/progress'

require "~/app/models/index"
{ Query } = require 'memory-orm'


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
  for o in ref.docs
    { idx, label, _id } = o.data()
    if -1 < idx
      return idx + 1
    return 0
  return 0

init_chats = (idx, { book_id, locale_id, tag_id, face_id })->
  { chr_set_id } = Query.tags.find tag_id
  job = Query.chr_jobs.where({ chr_set_id, face_id }).list[0]
  npc = Query.chr_npcs.where({ chr_set_id, face_id }).list[0]
  locale = Query.locales.find locale_id
  head = "#{job.job} #{job.face.name}"

  write_at = new Date - 0

  a = []
  if 3 < idx
    day = 3
  else
    day = idx
  if locale.intro[day]
    a.push { _id: "#{book_id}-#{idx}-S-INTRO", deco: 'giji', show: 'post', log: locale.intro[day], write_at: write_at - 1 }
  if npc["say_#{idx}"]
    a.push { _id: "#{book_id}-#{idx}-S-NPC",   deco: 'giji', show: 'talk', head, log: npc["say_#{idx}"], write_at }
  a


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

      if message
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
      { locale_id } = after.data()
      { book_id } = params
      idx = await next_idx admin.firestore().collection("game/#{book_id}/parts")
      _id = "#{book_id}-#{idx}"
      write_at = new Date - 0
      label =
        switch idx
          when 0
            "プロローグ"
          else
            "#{idx}日目"
      b = admin.firestore().batch()
      o = { _id, idx, label, write_at }
      b.set admin.firestore().doc("game/#{book_id}/parts/#{_id}"), o

      phases = [
        { _id: "#{_id}-S", is_update: false, handle: 'SSAY',  label: '会話' }
        { _id: "#{_id}-T", is_update: true,  handle: 'TITLE', label: '黒地' }
      ]
      for o in phases
        b.set admin.firestore().doc("game/#{book_id}/phases/#{o._id}"), o

      npc_ref  = await admin.firestore().doc("game/#{book_id}/potofs/#{book_id}-NPC").get()
      { tag_id, face_id } = npc_ref.data()

      for o in init_chats idx, { book_id, locale_id, tag_id, face_id }
        b.set admin.firestore().doc("game/#{book_id}/chats/#{o._id}"), o

      await b.commit()
      null
