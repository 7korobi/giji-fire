<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ

  fire-oauth(handle="TSAY")

  no-ssr
    div
      c-report(head="Trix TEST" sign="ななころび" :handle="chat.handle" style="z-index: 10")
        trix-edit#trix-sample(v-model="text" :max-row="10" @submit="console" @drop_image="image_post")
          select(v-model="chat.handle" key="handle")
            option(value="SSAY") 発言
            option(value="WSAY") 囁き
            option(value="TSAY") 独り言

      c-report(head="Trix TEST result" sign="ななころび" :handle="chat.handle" :deco="chat.deco" :log="text")
      c-report(head="Trix TEST result" sign="ななころび" :handle="chat.handle" :deco="chat.deco")
        textarea(v-model="text")

  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
</template>

<script lang="coffee">

if window?
  firebase = require "firebase"

module.exports =
  mixins: [
    require('~/plugins/markup-event')
  ]
  data: (req)->
    text: ""
    potof:
      head: "てすと"
    chat:
      handle: "SSAY"
      deco: "trix"
      part_id: "edit-edit-edit"

  computed:
    _storage: ->
      firebase.storage()
    _images: ->
      @_storage.ref().child('images')

  methods:
    image_post: ({ id, file }, next)->
      ss = await @_images.child(id).put(file)
      next await ss.ref.getDownloadURL()
    console: ->
      console.log arguments
</script>
