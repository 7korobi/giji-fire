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
        i.btn.mdi.mdi-windows(@click="microsoft")
      
    p(v-if="code") {{ code }}
    p(v-if="message") {{ message }}
    slot
</template>
<script lang="coffee">
{ share, firestore_doc } = require "vue-petit-store"

if window?
  firebase = require "firebase/app"

module.exports =
  mixins: [
    share 'user'
    share 'sign'
    share 'credential'
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
        @user = { uid, email, photoURL, displayName, apiKey, authDomain, refreshToken, metadata }

    @auth.onAuthStateChanged (user)=>
      if user
        { uid, email, photoURL, displayName, apiKey, authDomain, refreshToken, metadata } = user
        @user = { uid, email, photoURL, displayName, apiKey, authDomain, refreshToken, metadata }

    @auth.getRedirectResult()
    .then (o)=>
      { operationType, user, additionalUserInfo, credential } = o

      return unless user && credential
      { isNewUser, username, profile } = additionalUserInfo
      { accessToken, providerId, secret, signInMethod } = credential
      { uid, email, photoURL, displayName, apiKey, authDomain, refreshToken, metadata } = user
      console.log "get redirect result success"
      @user = { uid, email, photoURL, displayName, apiKey, authDomain, refreshToken, metadata }
      @credential = { accessToken, providerId, secret, signInMethod }

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
      @user = @credential = null
    facebook: ->
      @auth.signInWithRedirect new firebase.auth.FacebookAuthProvider()
    twitter: ->
      @auth.signInWithRedirect new firebase.auth.TwitterAuthProvider()
    github: ->
      @auth.signInWithRedirect new firebase.auth.GithubAuthProvider()
    google: ->
      @auth.signInWithRedirect new firebase.auth.GoogleAuthProvider()
    microsoft: ->
      @auth.signInWithRedirect new firebase.auth.OAuthProvider('microsoft.com')

</script>

<style lang="sass" scoped>
</style>
