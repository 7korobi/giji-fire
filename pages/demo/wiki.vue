<template lang="pug">
log-wiki(:part="part" :back_url="back_url")
  .summary(name="list" tag="div" key="summary")
    a-potofs(label="みている")
  c-report(handle="footer" deco="center")
    bread-crumb

  div(v-for="(chats, idx) in page_contents", :key="idx")
    chat(v-for="o in chats" @anker="anker" @focus="focus" :current="chat" :id="o.id", :key="o.id")

  e-potof(v-model="edit.potof")
  chat(v-if="edit.potof.face_id" :id="edit.chat._id" :current="chat")
  c-report(v-if="edit.potof.face_id" :handle="edit.phase.handle")
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

snap = (collection, target)->
  collection.onSnapshot (q)=>
    q.docChanges.forEach ({ newIndex, oldIndex, type, doc })=>
      switch type
        when 'added', 'modified'
          Set[target].add q.docs[newIndex].data()
      console.log { newIndex, oldIndex, type, doc }

module.exports =
  mixins: [
    require('~/plugins/book')
      loader: true
  ]
  layout: 'blank'
  data: ->
    edit =
      potof:
        _id: "edit-edit-edit"
        tag_id: ""
        face_id: ""
        job: ""
        sign: "ななころび"

      phase:
        _id: 'edit-edit-edit-SS'
        handle: 'SSAY'
        group: 'S'

      chat:
        _id: 'edit-edit-edit-SS-edit'
        potof_id: "edit-edit-edit"
        write_at: 0
        show: "talk"
        deco: "giji"
        to: null
        head: ""
        log: ""

    Set.book.add
      _id: 'edit-edit'
    Set.phase.add edit.phase
    Set.potof.add edit.potof
    Set.chat.add  edit.chat
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

      { show, deco, to, handle } = @edit.chat
      potof_id = @book_id + '-1'
      _id = @part_id + '-SS-1'
      head = ''
      write_at = new Date - 0
      doc = { _id, potof_id, write_at, show, deco, to, head, log }
      await @_chats.doc(_id).set doc,
        merge: true
      console.log doc
      @edit.chat.log = ''

  watch:
    'edit.potof.face_id': ->
      { face_id, tag_id, job, sign } = @edit.potof
      _id = @book_id + '-1'
      write_at = new Date - 0
      doc = { _id, face_id, tag_id, job, write_at, sign }
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
      group: 'S'

    snap @_chats,  'chat'
    snap @_phases, 'phase'
    snap @_potofs, 'potof'

</script>
