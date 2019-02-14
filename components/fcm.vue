<template lang="pug">
check.item(v-model="fcm_topics" :as="topic" :title="title")
  i.mdi.mdi-bell-ring(v-if="enable")
  i.mdi.mdi-bell-off(v-if="! enable")
</template>
<style lang="sass" scoped>
</style>
<script lang="coffee">
_ = require "lodash"
firebase = require "firebase"
{ vuex_value } = require '~/plugins/struct'
{ localStorage } = require "~/plugins/browser-store"

module.exports =
  mixins: [
    localStorage "fcm_topics"
    localStorage "fcm_subscribes"
  ]

  props: ['topic']

  data: ->
    fcm_topics: []
    fcm_subscribes: []

  computed: {
    ...vuex_value 'firebase', ['fcm_token']
    title: ->
      if @checked
        if @fcm_token
          "通知を受け取ります。"
        else
          "通知を受け取る権限がありません。"
      else
        "通知を受け取りません。"
    checked: ->
      @fcm_topics.includes @topic
    subscribed: ->
      @fcm_subscribes.includes @topic
    enable: ->
      @fcm_token and @checked
    can: ->
      @fcm_token and @subscribed
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
        @$toasted.info "FCM refresh"
        console.log await @_subscribe { @fcm_token, @fcm_topics }
      @fcm_token ?= await @_messaging.getToken()

    stop: ->
      await @_unsubscribe { @fcm_token, fcm_topics: [@topic] }
      @$toasted.success "#{@topic} は購読しません"
      @fcm_subscribes = _.difference @fcm_subscribes, [@topic]

    start: ->
      await @_subscribe { @fcm_token, fcm_topics: [@topic] }
      @$toasted.success "#{@topic} を購読します"
      @fcm_subscribes = _.union @fcm_subscribes, [@topic]

  watch:
    checked: ->
      return unless @_messaging
      try
        await @deploy()
        if @enable
          if ! @can
            await @start()
        else
          if @can
            await @stop()
      catch e
        console.warn e

</script>