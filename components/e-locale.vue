<template lang="pug">
c-post(handle="MAKER")
    span(v-if="! is_open")
      span(v-if="locale")
        | 地の文 {{ locale.label }}
      span(v-else)
        | 地の文を選択しましょう。
    btn.pull-right(v-if="is_open" v-model="is_open" :as="false")
      | ▲
    btn.pull-right(v-else v-model="is_open" :as="true")
      | ▼
    dl(v-if="is_open" v-for="loc in locales")
      dt
        btn(:value="value" :as="loc.id" @input="input")
          | {{ loc.label }}
      dd
        | {{ loc.help }}

</template>
<script lang="coffee">
{ Query } = require 'memory-orm'
{ error } = require "~/plugins/form"

module.exports =
  mixins: [
    error 'bans', ( chk )->
    error 'warns', ( chk )->
  ]
  data: ->
    is_open: false
  props: ['value']
      
  computed:
    locale: ->
      Query.locales.find @value
    locales: ->
      Query.locales
      .where (o)=> o.intro
      .list

  methods:
    input: (locale_id)->
      @$emit "input", locale_id
      @is_open = false
</script>
