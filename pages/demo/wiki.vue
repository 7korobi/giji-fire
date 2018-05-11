<template lang="pug">
div
  .summary(name="list" tag="div" key="summary")
    a-potofs(label="みている")
  c-report(handle="footer" deco="center")
    bread-crumb

  e-potof(v-model="edit_potof")

  chat(:id="edit_chat._id")
  c-report(:handle="edit_chat.handle" head="a")
    text-editor(v-model="edit_chat.log" @submit="chat_post" :maxRow="5" :maxSize="250")
  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<script lang="coffee">

firebase = require "firebase"
{ Query, Set, State } = require "~/plugins/memory-record"

module.exports =
  mixins: [
    require('~/plugins/book')
      loader: true
  ]
  data: ->
    edit_potof =
      _id: ""
      tag_id: ""
      face_id: ""
      sign: "ななころび"

    edit_chat =
      _id: ""
      potof_id: ""
      write_at: 0
      show: "talk"
      deco: "giji"
      to: null
      handle: "SSAY"
      head: "へだー"
      log: "a"

    { edit_chat, edit_potof, tag_ids: [], step: State.step }

  computed:
    user: ->
      @$store.state.firebase.user
    credential: ->
      @$store.state.firebase.credential

    db: ->
      store = firebase.firestore()
      store.settings
        timestampsInSnapshots: true
      store
    collection: ->
      @db.collection(@book_id)

  methods:
    chat_post: (text)->
      console.log text

  mounted: ->
    idx =
      for key, i in ["test","page"]
        @idx[i] || key
    @idx = idx.join("-")

    @edit_chat.potof_id = @edit_potof._id = @book_id + '-1'
    @edit_chat._id = @book_id + '-1-SS-edit'

    Set.phase.add
      _id: @book_id + '-1-SS'
      handle: "SSAY"
    Set.potof.add @edit_potof
    Set.chat.add  @edit_chat

    @collection.onSnapshot (q)=>
      q.docChanges.forEach ({ newIndex, oldIndex, type })=>
        console.log { newIndex, oldIndex, type }
      q.forEach (doc)=>
        console.log doc.data()
        console.log doc.metadata

</script>
