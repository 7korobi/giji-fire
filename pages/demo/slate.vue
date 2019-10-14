<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ

  fire-oauth(handle="TSAY")

  client-only
    div
      c-report(head="Slate TEST" sign="ななころび" :handle="chat.handle" style="z-index: 10")
        slate-edit#slate-sample(:handle="chat.handle" v-model="text" :max-row="10" @submit="submit" @drop_image="image_post")
          select(v-model="chat.handle" key="handle")
            option(value="SSAY") 発言
            option(value="WSAY") 囁き
            option(value="TSAY") 独り言

      c-report(head="Slate TEST result" sign="ななころび" :handle="chat.handle" :deco="chat.deco" :log="text")
      c-report(head="Slate TEST result" sign="ななころび" :handle="chat.handle" :deco="chat.deco")
        textarea(v-model="text")

  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
</template>

<script lang="coffee">
RANDOM = require "~/plugins/random"
if window?
  firebase = require "firebase/app"

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
      deco: "slate"
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
