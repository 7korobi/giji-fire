{ vuex_value } = require '~/plugins/vuex-helper'
firebase = require "firebase"

module.exports =
  mounted: ->
    @_messaging.requestPermission()
    .then =>
      @_messaging.getToken()
      .then (@fcm_token)=>
        console.log @fcm_token
      .catch (e)=>
        console.log e
      console.log "message permission requested."
    .catch (e)=>
      console.log e

    @_messaging.onMessage ( payload )=>
      console.log payload
    @_messaging.onTokenRefresh =>
      @fcm_token = await @_messaging.getToken()
      console.log @fcm_token

  computed: {
    ...vuex_value 'firebase',['token']
    _messaging: ->
      firebase.messaging()
  }
