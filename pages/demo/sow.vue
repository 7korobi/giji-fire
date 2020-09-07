<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ

  fire-oauth(handle="TSAY")
  client-only

  c-report(head="Slate TEST" sign="ななころび" :handle="chat.handle" :deco="chat.deco" style="z-index: 10")
    sow-edit#slate-sample(:handle="chat.handle" v-model="text" :max-row="10" @submit="submit" @drop_image="image_post")
      select(v-model="chat.handle" key="handle")
        option(value="SSAY") 発言
      select(v-model="chat.deco" key="deco")
        option(value="text") (通常)
        option(value="mono") 等幅
        option(value="head") 見出し

  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
</template>

<script lang="coffee">
module.exports =
  data: (req)->
    text: ""
</script>

<script lang="coffee">
RANDOM = require "~/app/plugins/random"
if window?
  firebase = require "firebase/app"

module.exports =
  mixins: [
    require('~/app/plugins/markup-event')
  ]
  data: (req)->
    text: ""
    potof:
      head: "てすと"
    chat:
      handle: "SSAY"
      deco: "text"
      part_id: "edit-edit-edit"
      data:
        random: []

  computed:
    _storage: ->
      firebase.storage()
    _images: ->
      @_storage.ref().child('images')

  methods:
    image_post: ({ id, file }, next)->
      ss = await @_images.child(id).put(file)
      next await ss.ref.getDownloadURL()

    submit: ( value, { attrs, size } )->
      { handle, deco, part_id, data } = @chat
      { random, clusters, icons, lines } = data

      for key, idx in attrs.random ? []
        random[idx] ?= RANDOM key, { book_id: "edit-edit" }

      idx = 0
      console.log value
      value = value.replace /<kbd ([^>]+)>([^<]+)<\/kbd>/g, (str, attr, v1)->
        { title, text } = random[idx++]
        console.log { t1, v1, title, text }
        """<kbd title="#{title}">#{text}</kbd>"""

      @text = value

    console: ->
      console.log arguments
</script>
