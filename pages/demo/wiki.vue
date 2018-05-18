<template lang="pug">
log-wiki(:part="part" :page_idx="0" :chat_id="chat_id" :back_url="back_url" @anker="anker" @remove="remove" @edit="replace")
  .summary(name="list" tag="div" key="summary")
    a-potofs(label="みている")
  c-report(handle="footer" deco="center")
    bread-crumb

  div(v-for="(chats, idx) in page_contents", :key="idx")
    chat(v-for="o in chats" @anker="anker" @focus="focus" :current="chat" :id="o.id", :key="o.id")

  c-post(handle="TSAY")
    fire-oauth(style="white-space: nowrap")
  e-potof(v-if="user" v-model="edit.potof")
  chat(v-if="user && edit.potof.face_id" :id="edit.chat._id" :current="chat" @check="check_post")
  c-report(v-if="user && edit.potof.face_id" :handle="edit.phase.handle")
    btn(v-model="edit.chat.show" as="post")
      i.mdi.mdi-file-document-box
    btn(v-model="edit.chat.show" as="talk") 
      i.mdi.mdi-comment-text
    btn(v-model="edit.chat.show" as="report")
      i.mdi.mdi-note-text
    text-editor(v-model="edit.chat.log" @drop_image="image_post" @submit="chat_post" :maxRow="8" :maxSize="250")

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

post = (target, doc)->
  { _id } = doc
  target.doc(_id).set doc,
    merge: true

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
    part_id:  -> @book_id + '-1'
    phase_id: -> @book_id + '-1-SS'
    potof_id: -> @book_id + '-' + @edit.potof.face_id

    page_contents: ->
      Query.chats.full( [], @part_id ).reduce.list

    my: ->
      return {} unless @user
      { uid } = @user
      potof = Query.potofs.my( @book_id, uid )
      { potof }

    storage: ->
      firebase.storage()
    image: ->
      @storage.ref().child('images')

    db: ->
      firebase.firestore()

    _book: ->
      @db.settings
        timestampsInSnapshots: true
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
    replace: (chat_id)->
      console.log chat_id
    remove: (chat_id)->
      console.log chat_id
    
    check_post: (target)->
      console.log target
    image_post: (file, next)->
      { state, downloadURL } = await @image.child(file.name).put(file)
      next await downloadURL

    chat_post: (log)->
      return if log.length < 4

      { show, deco, to, handle } = @edit.chat

      _id = @part_id + '-SS-' + @edit.chat.new_idx()
      write_at = new Date - 0
      await post @_chats, { _id, @potof_id, write_at, show, deco, to, log }
      @edit.chat.log = ''

  watch:
    user: ->
      if @user
        { displayName, uid } = @user
      else
        displayName = null
        uid = null
      @edit.potof.sign = displayName
      @edit.potof.uid = uid

    'my.potof.face_id': ->
      return unless @my.potof
      { face_id, tag_id, job, sign, uid } = @my.potof
      Object.assign @edit.potof, { face_id, tag_id, job, sign, uid }

    'edit.potof.face_id': ->
      return unless @edit.potof
      { face_id, tag_id, head, job, sign, uid } = @edit.potof
      @edit.chat.head = head
      _id = @potof_id
      write_at = new Date - 0
      await post @_potofs, { _id, face_id, tag_id, job, write_at, sign, uid }

  mounted: ->
    Set.book.add
      _id: @book_id
    Set.part.add
      _id: @part_id
      label: 'wiki'
    Set.phase.add
      _id: @phase_id
      handle: 'SSAY'
      label: '会話'
      mark: null
      group: 'S'
      update: true
      guide: true

    snap @_chats,  'chat'
    snap @_phases, 'phase'
    snap @_potofs, 'potof'

</script>
