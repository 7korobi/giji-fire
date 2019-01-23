<template lang="pug">
div
  p(v-if="user")
    span
      i.btn.mdi.mdi-logout(@click="signout")
    nuxt-link(to="user/show")
      img.oauth_icon(:src="user.photoURL")
      span
        div {{ providerID }}
        div {{ user.displayName }}

  p(v-if=" ! user")
    span
      i.btn.mdi.mdi-facebook-box(@click="facebook")
      i.btn.mdi.mdi-twitter(@click="twitter")
      i.btn.mdi.mdi-google(@click="google")
      i.btn.mdi.mdi-github-face(@click="github")
    
  p(v-if="code") {{ code }}
  p(v-if="message") {{ message }}
</template>
<script lang="coffee">
firebase = require "firebase"
{ vuex_value } = require '~/plugins/struct'
{ firebase_snap } = require "~/plugins/firebase"

module.exports =
  mixins: [
    firebase_snap "sign", "user.uid", (db)-> db.doc("user/#{ @user.uid }")
    require("~/plugins/for_component")
  ]
  data: ->
    code: null
    message: null
  mounted: ->
    @auth.onIdTokenChanged (user)=>
      if user
        { uid, email, photoURL, displayName, apiKey, authDomain, refreshToken, metadata } = user
        user = { uid, email, photoURL, displayName, apiKey, authDomain, refreshToken, metadata }
      @$store.commit 'firebase/replace', { user }

    @auth.onAuthStateChanged (user)=>
      if user
        { uid, email, photoURL, displayName, apiKey, authDomain, refreshToken, metadata } = user
        user = { uid, email, photoURL, displayName, apiKey, authDomain, refreshToken, metadata }
      @$store.commit 'firebase/replace', { user }

    @auth.getRedirectResult()
    .then (o)=>
      { operationType, user, additionalUserInfo, credential } = o

      return unless user && credential
      { isNewUser, username, profile } = additionalUserInfo
      { accessToken, providerId, secret, signInMethod } = credential
      { uid, email, photoURL, displayName, apiKey, authDomain, refreshToken, metadata } = user
      @$store.commit 'firebase/replace',
        user: { uid, email, photoURL, displayName, apiKey, authDomain, refreshToken, metadata }
        credential: { accessToken, providerId, secret, signInMethod }

    .catch ({ @code, @message })=>

    @auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then ()=>
      console.log "session persistence"
    .catch ({ @code, @message })=>

  computed: {
    ...vuex_value 'firebase',['user', 'credential', 'sign']

    providerID: ->
      @credential?.providerId

    auth: ->
      firebase.auth()
  }

  methods:
    signout: ->
      @auth.signOut()
      @$store.commit 'firebase/replace',
        user: null
        credential: null
    facebook: ->
      @auth.signInWithRedirect new firebase.auth.FacebookAuthProvider()
    twitter: ->
      @auth.signInWithRedirect new firebase.auth.TwitterAuthProvider()
    github: ->
      @auth.signInWithRedirect new firebase.auth.GithubAuthProvider()
    google: ->
      @auth.signInWithRedirect new firebase.auth.GoogleAuthProvider()

</script>

<style lang="sass" scoped>
.oauth_icon
  padding:    0 .5rem 0 .5rem
  max-width:  2.50rem
  max-height: 2.50rem

.mdi
  line-height: 4rem
  font-size:   3rem
</style>
