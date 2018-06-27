{ vuex_value } = require '~/plugins/vuex-helper'
firebase = require "firebase"

module.exports =
  mounted: ->
    @_messaging.requestPermission()
    .then =>
      @_messaging.getToken()
      .then (@token)=>
        console.log @token
      .catch (e)=>
        console.log e
      console.log "message permission requested."
    .catch (e)=>
      console.log e

    @_messaging.onMessage ( payload )=>
      console.log payload
    @_messaging.onTokenRefresh =>
      @token = await @_messaging.getToken()
      console.log @token

  computed: {
    ...vuex_value 'firebase',['token']
    _messaging: ->
      firebase.messaging()
  }

