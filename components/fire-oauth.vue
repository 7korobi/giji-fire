<template lang="pug">
component(v-bind="for_top" v-on="$listeners")
  article.form
    p(v-if="user")
      span.tap.pull-right
        i.btn.mdi.mdi-logout(@click="signout")

      nuxt-link.tap(to="/user/show")
        i(:class="icon") &thinsp;
        | {{ user.displayName }}

    p(v-if=" ! user")
      span.tap
        i.btn.mdi.mdi-facebook-box(@click="facebook")
        i.btn.mdi.mdi-twitter(@click="twitter")
        i.btn.mdi.mdi-google(@click="google")
        i.btn.mdi.mdi-github-face(@click="github")
      
    p(v-if="code") {{ code }}
    p(v-if="message") {{ message }}
    slot
</template>
<script lang="coffee">
{ vuex, firestore_doc } = require "vue-petit-store"

if window?
  firebase = require "firebase"


module.exports =
  mixins: [
    vuex 'user',       on: 'firebase'
    vuex 'credential', on: 'firebase'
    vuex 'sign',       on: 'firebase'
    firestore_doc "sign", -> @user && "user/#{ @user.uid }"
    require("~/plugins/for_component")
  ]
  props: ["id", "handle"]
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

    @auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then ()=>
      console.log "session persistence"
    .catch ({ @code, @message })=>

  computed:
    providerID: ->
      @credential?.providerId

    auth: ->
      firebase.auth()
    
    for_top: ->
      if @user?
        { @id, @handle, is: 'c-talk', img_src: @user.photoURL }
      else
        { @id, @handle, is: 'c-post' }
    
    icon: ->
      switch @credential?.providerId
        when 'twitter.com'
          ['btn','mdi','mdi-twitter']
        when 'facebook.com'
          ['btn','mdi','mdi-facebook-box']
        when 'google.com'
          ['btn','mdi','mdi-google']
        when 'github.com'
          ['btn','mdi','mdi-github-face']
        else
          ['btn']


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
</style>
