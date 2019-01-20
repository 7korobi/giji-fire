<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
  
  c-post(handle="TSAY")
    fire-oauth(style="white-space: nowrap")

  c-post(handle="SSAY" v-if="user")
    article
      table(style="width: 100%")
        tbody
          tr
            td.r
              h3
                label(for="label") サイン
            td
              input#label(style="width: 97%" v-model="sign.sign" placeholder="みんなに見せる名前をつけよう！" size="10")
      hr
      quill-editor(v-model="sign.introduction" placeholder="自己紹介をしよう！" v-bind="for_profile" @drop_image="image_post" @submit="submit")

  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<script lang="coffee">
firebase = require "firebase"
{ vuex_readonly } = require "~/plugins/struct"
{ firebase_snap } = require "~/plugins/firebase"

module.exports =
  mixins: [
    firebase_snap "sign", "user.uid", (db)-> db.doc("user/#{ @user.uid }")
    require("~/plugins/for_component")
  ]
  data: ->
    sign:
      sign: ""
      introduction: ""

  computed: {
    ...vuex_readonly "firebase", ["user", "credential"]
    _storage: ->
      firebase.storage()
    _images: ->
      @_storage.ref().child('images')
  }

  methods:
    image_post: ({ id, file }, url)->
      ss = await @_images.child(id).put(file)
      url await ss.ref.getDownloadURL()

    submit: ->
      await @sign_snap.set @sign
      @$router.push "/user/show"

</script>

