<template lang="pug">
check.item(v-model="fcm_topics" :as="topic")
  i.mdi.mdi-bell-ring(v-if="enable")
  i.mdi.mdi-bell-off(v-if="! enable")
</template>
<style lang="stylus" scoped>
</style>
<script lang="coffee">
{ vuex_value } = require '~/plugins/vuex-helper'
firebase = require "firebase"

module.exports =
  mixins: [
    require("~/plugins/browser-store")
      local:
        fcm_topics: []

      watch:
        fcm_topics: ->
          try
            @_messaging.onTokenRefresh =>
              @_unsubscribe { @fcm_token, @fcm_topics }
              @fcm_token = await @_messaging.getToken()
              console.log await @_subscribe { @fcm_token, @fcm_topics }

            await @_messaging.requestPermission()
            if @enable
              @start()
            else
              @stop()
          catch e
            console.warn e
  ]

  props: ['topic']

  computed: {
    ...vuex_value 'firebase',['fcm_token']
    enable: ->
      @fcm_token and (@topic in @fcm_topics)
    _messaging: ->
      firebase.messaging()
    _subscribe: ->
      firebase.functions().httpsCallable 'subscribe'
    _unsubscribe: ->
      firebase.functions().httpsCallable 'unsubscribe'
  }
  methods:
    stop: ->
      @fcm_token ?= await @_messaging.getToken()
      if @fcm_token
        await @_unsubscribe { @fcm_token, fcm_topics: [@topic] }

    start: ->
      @fcm_token ?= await @_messaging.getToken()
      if @fcm_token
        await @_subscribe { @fcm_token, fcm_topics: [@topic] }

</script>