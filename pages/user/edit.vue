<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
  
  fire-oauth(handle="TSAY")

  c-post(handle="SSAY" v-if="user && sign")
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
    trix-edit(v-model="sign.introduction" placeholder="自己紹介をしよう！" v-bind="for_profile" @drop_image="image_post" @submit="submit")

  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<script lang="coffee">
{ firestore_doc, vuex_read } = require "vue-petit-store"

if window?
  firebase = require "firebase"


module.exports =
  mixins: [
    vuex_read 'user',       on: "firebase"
    vuex_read 'credential', on: "firebase"
    firestore_doc "sign", -> @user && "user/#{ @user.uid }"
    require("~/plugins/for_component")
  ]
  data: ->
    sign:
      sign: ""
      introduction: ""

  computed:
    _storage: ->
      firebase.storage()
    _images: ->
      @_storage.ref().child('images')

  methods:
    image_post: ({ id, file }, url)->
      ss = await @_images.child(id).put(file)
      url await ss.ref.getDownloadURL()
      @$toasted.success "画像を投稿。"

    submit: ->
      await @sign_add @sign
      @$toasted.success "ユーザー登録を更新。"
      @$router.push "/user/show"

</script>

