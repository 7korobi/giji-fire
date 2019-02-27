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
{ localStorage } = require "vue-petit-store"
{ vuex } = require "vue-petit-store"

store =
  fcm_topics: []
  fcm_subscribes: []

module.exports =
  mixins: [
    vuex 'firebase', ['fcm_token']
    localStorage "fcm_topics"
    localStorage "fcm_subscribes"
  ]

  props: ['topic']

  data: ->
    store

  computed:
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

  methods:
    deploy: ->
      await @_messaging.requestPermission()
      @_messaging.onTokenRefresh =>
        @_unsubscribe { @fcm_token, @fcm_topics }
        @fcm_token = await @_messaging.getToken()
        @$toasted.info "FCM refresh"
        console.log await @_subscribe { @fcm_token, @fcm_topics }
      @fcm_token ?= await @_messaging.getToken()

    merge: ->
      add = _.difference @fcm_topics, @fcm_subscribes
      del = _.difference @fcm_subscribes, @fcm_topics
      if add.length
        await @_subscribe { @fcm_token, fcm_topics: add }
        for topic in add
          @$toasted.success "#{topic} を購読します"
      if del.length
        await @_unsubscribe { @fcm_token, fcm_topics: del }
        for topic in del
          @$toasted.success "#{@topic} は購読しません"
      @fcm_subscribes = @fcm_topics

  mounted: ->
    if @checked
      await @deploy()

  watch:
    checked: ->
      return unless @_messaging
      try
        await @deploy()
        if (!! @enable) == (! @can)
          await @merge()
      catch e
        console.warn e

</script>