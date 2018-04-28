<template lang="pug">
div
  .summary(name="list" tag="div" key="summary")
    a-potofs(label="みている")
  c-report(handle="footer" deco="center")
    bread-crumb

  e-potof(v-model="edit_potof")

  chat(:id="edit_chat._id")
    hr
    a.btn() 投稿
  c-report(:handle="edit_chat.handle" head="a")
    text-editor(v-model="edit_chat.log" :maxRow="5" :maxSize="250")
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
  
  mounted: ->
    idx =
      for key, i in ["wiki","test","page"]
        @idx[i] || key
    @idx = idx.join("-")
    @edit_chat.potof_id = @edit_potof._id = @book_id + '-1'
    @edit_chat._id = @part_id + '-SS-edit'

    Set.phase.add
      _id: @part_id + '-SS'
      handle: "SSAY"
    Set.potof.add @edit_potof
    Set.chat.add  @edit_chat

</script>
