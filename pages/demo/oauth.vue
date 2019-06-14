<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ

  fire-oauth(handle="TSAY")

  c-post(handle="TSAY")
    article
      table
        tbody(v-if="credential")
          tr
            th providerId
            td {{ credential.providerId }}
          tr
            th signInMethod
            td {{ credential.signInMethod }}
          tr
            th accessToken
            td {{ credential.accessToken }}
          tr
            th secret
            td {{ credential.secret }}
          tr
            th(colspan="2")
        tbody(v-if="user")
          tr
            th uid
            td {{ user.uid }}
          tr
            th displayName
            td {{ user.displayName }}
          tr 
            th photoURL
            td
              img(:src="user.photoURL")
          tr(v-if="user.emailVerified")
            th email
            td {{ user.email }}
          tr
            th refreshToken
            td {{ user.refreshToken }}

          tr
            th apiKey
            td {{ user.apiKey }}
          tr
            th authDomain
            td {{ user.authDomain }}
          tr
            th
              | metadata
              | .lastSignInTime
            td
              timeago(:since="user.metadata.lastSignInTime")
          tr
            th
              | metadata
              | .creationTime
            td
              timeago(:since="user.metadata.creationTime")

          tr
            th(colspan="2")
        tbody(v-if="user && user.stsTokenManager")
          tr
            th apiKey
            td {{ user.stsTokenManager.apiKey }}
          tr
            th accessToken
            td {{ user.stsTokenManager.accessToken }}
          tr
            th expirationTime 
            td
              timeago(:since="user.stsTokenManager.expirationTime")
          tr
            th(colspan="2")
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ

</template>
<script lang="coffee">
{ share } = require "vue-petit-store"

if window?
  firebase = require "firebase/app"

module.exports =
  mixins: [
    share 'user'
    share 'credential'
  ]
  data: -> {}
  mounted: ->
    @messaging.requestPermission()
    .then =>
      return
      @messaging.getToken()
      .then (token)=>
        console.log token
      .catch (e)=>
        console.log e
      console.log "message permission requested."
    .catch (e)=>
      console.log e
    
    @messaging.onTokenRefresh =>
      token = await @messaging.getToken()
      console.log token

  computed:
    db: ->
      store = firebase.firestore()
      store.settings {}
      store
    messaging: ->
      firebase.messaging()
    collection: ->
      @db.collection('test')
    doc: ->
      @db.doc('test/user-data')

</script>

<style lang="sass" scoped>
td
  word-break: break-all
.mdi
  padding:   0.5rem 0 
  font-size:   3rem
</style>
