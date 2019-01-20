<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
  
  c-post(handle="TSAY")
    fire-oauth(style="white-space: nowrap")

  c-post(handle="SSAY" v-if="user && sign")
    article
      .name
        sup.pull-right {{ sign.sign }}
      hr
      div(v-html="sign.introduction")

  c-post(handle="SSAY" v-if="user")
    nuxt-link(to="/user/edit") 編集

  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<script lang="coffee">
firebase = require "firebase"
{ vuex_readonly } = require "~/plugins/struct"

module.exports =
  data: ->
    {}

  computed: {
    ...vuex_readonly "firebase", ["user", "credential", "sign"]
  }

</script>
