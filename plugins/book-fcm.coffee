{ vuex_value } = require '~/plugins/vuex-helper'
firebase = require "firebase"

module.exports =
  mounted: ->
    @_messaging.requestPermission()
    .then =>
      @_messaging.getToken()
      .then (@fcm_token)=>
        console.log await @_book_subscribe { @fcm_token, @book_id }
      .catch (e)=>
        console.log e
      console.log "message permission requested."
    .catch (e)=>
      console.log e

    @_messaging.onMessage ( payload )=>
      console.log payload
    @_messaging.onTokenRefresh =>
      @_book_unsubscribe { @fcm_token, @book_id }
      @fcm_token = await @_messaging.getToken()
      console.log await @_book_subscribe { @fcm_token, @book_id }

  computed: {
    ...vuex_value 'firebase',['fcm_token']
    _messaging: ->
      firebase.messaging()
    _book_subscribe: ->
      firebase.functions().httpsCallable 'book_subscribe'
    _book_unsubscribe: ->
      firebase.functions().httpsCallable 'book_unsubscribe'
  }
