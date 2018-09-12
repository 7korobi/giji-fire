<template lang="pug">
check.item(v-model="fcm_topics" :as="topic" :title="title")
  i.mdi.mdi-bell-ring(v-if="enable")
  i.mdi.mdi-bell-off(v-if="! enable")
</template>
<style lang="sass" scoped>
</style>
<script lang="coffee">
{ vuex_value } = require '~/plugins/struct'
firebase = require "firebase"

module.exports =
  mixins: [
    require("~/plugins/browser-store")
      local:
        fcm_topics: []
  ]

  props: ['topic']

  computed: {
    ...vuex_value 'firebase',['fcm_token']
    title: ->
      if @checked
        if @fcm_token
          "通知を受け取ります。"
        else
          "通知を受け取る権限がありません。"
      else
        "通知を受け取りません。"
    checked: ->
      @topic in @fcm_topics
    enable: ->
      @fcm_token and @checked
    _messaging: ->
      firebase.messaging?() 
    _subscribe: ->
      firebase.functions().httpsCallable 'subscribe'
    _unsubscribe: ->
      firebase.functions().httpsCallable 'unsubscribe'
  }

  methods:
    deploy: ->
      await @_messaging.requestPermission()
      @_messaging.onTokenRefresh =>
        @_unsubscribe { @fcm_token, @fcm_topics }
        @fcm_token = await @_messaging.getToken()
        console.log await @_subscribe { @fcm_token, @fcm_topics }
      @fcm_token ?= await @_messaging.getToken()

    stop: ->
      await @_unsubscribe { @fcm_token, fcm_topics: [@topic] }

    start: ->
      await @_subscribe { @fcm_token, fcm_topics: [@topic] }

  mounted: ->
    return unless @_messaging
    if @checked && ! @fcm_token
      await @deploy()

  watch:
    checked: ->
      return unless @_messaging
      try
        await @deploy()
        if @enable
          await @start()
        else
          await @stop()
      catch e
        console.warn e

</script>