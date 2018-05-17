<template lang="pug">
log-wiki(:part="part" :page_idx="0" :chat_id="chat_id" :back_url="back_url" @anker="anker")
  .summary(name="list" tag="div" key="summary")
    a-potofs(label="みている")
  c-report(handle="footer" deco="center")
    bread-crumb

  div(v-for="(chats, idx) in page_contents", :key="idx")
    chat(v-for="o in chats" @anker="anker" @focus="focus" :current="chat" :id="o.id", :key="o.id")

  c-post(handle="TSAY" v-if="! user")
    fire-oauth(style="white-space: nowrap")
  e-potof(v-if="user" v-model="edit.potof")
  chat(v-if="user && edit.potof.face_id" :id="edit.chat._id" :current="chat")
  c-report(v-if="user && edit.potof.face_id" :handle="edit.phase.handle")
    btn(v-model="edit.chat.show" as="post")
      i.mdi.mdi-file-document-box
    btn(v-model="edit.chat.show" as="talk") 
      i.mdi.mdi-comment-text
    btn(v-model="edit.chat.show" as="report")
      i.mdi.mdi-note-text
    text-editor(v-model="edit.chat.log" @submit="chat_post" :maxRow="8" :maxSize="250")

  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<script lang="coffee">

firebase = require "firebase"
{ Query, Set, State } = require "~/plugins/memory-record"
{ vuex_value } = require '~/plugins/vuex-helper'

edit = require '~/models/editor'

snap = (collection, target)->
  collection.onSnapshot (q)=>
    console.log target, q.docs.length
    q.docChanges.forEach ({ newIndex, oldIndex, type, doc })=>
      switch type
        when 'added', 'modified'
          Set[target].add doc.data()
        when 'removed'
          Set[target].remove doc.data()
      console.log { type, newIndex, oldIndex }

module.exports =
  mixins: [
    require('~/plugins/book')
      loader: true
  ]
  layout: 'blank'
  data: ->
    { edit, tag_ids: [], step: State.step }

  computed: {
    ...vuex_value 'firebase',['user', 'credential']
    part_id: ->
      @book_id + '-1'
    part: ->
      { @book_id, id: @part_id, label: 'wiki' }
    page_contents: ->
      Query.chats.full( [], @part_id ).reduce.list

    db: ->
      store = firebase.firestore()
      store.settings
        timestampsInSnapshots: true
      store
    _book: ->
      @db
      .collection 'wiki'
      .doc @book_id
    _phases: -> @_book.collection 'phases'
    _chats:  -> @_book.collection 'chats'
    _potofs: -> @_book.collection 'potofs'
  }

  methods:
    focus: (@idx)->
    anker: (book_id, a)->
      console.log book_id, a
    
    chat_post: (log)->
      return if log.length < 4

      { _id, head } = @edit.potof
      potof_id = _id
      { show, deco, to, handle } = @edit.chat

      _id = @part_id + '-SS-' + @edit.chat.new_idx()
      write_at = new Date - 0
      doc = { _id, potof_id, write_at, show, deco, to, head, log }

      await @_chats.doc(_id).set doc,
        merge: true
      console.log doc
      @edit.chat.log = ''

  watch:
    user: ->
      @edit.potof.sign = @user.displayName
      @edit.potof.uid = @user.uid
      console.log { @user }
    credential: ->
      console.log { @credential }
    'edit.potof.face_id': ->
      { face_id, tag_id, job, sign, uid } = @edit.potof
      _id = @book_id + uid
      write_at = new Date - 0
      doc = { _id, face_id, tag_id, job, write_at, sign, uid }
      @edit.chat.head = @edit.potof.head
      await @_potofs.doc(_id).set doc,
        merge: true

  mounted: ->
    idx =
      for key, i in ["test","page"]
        @idx[i] || key
    @idx = idx.join("-")

    Set.book.add
      _id: @book_id
    Set.phase.add
      _id: @part_id + '-SS'
      handle: 'SSAY'
      update: true
      group: 'S'

    snap @_chats,  'chat'
    snap @_phases, 'phase'
    snap @_potofs, 'potof'

</script>
