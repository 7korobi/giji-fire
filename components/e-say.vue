<template lang="pug">
c-post(handle="MAKER")
  span(v-if="! is_open")
    span(v-if="say")
      | 会話量 {{ say.label }}
    span(v-else)
      | 会話の量を選択しましょう。
  btn.pull-right(v-if="is_open" v-model="is_open" :as="false")
    | ▲
  btn.pull-right(v-else v-model="is_open" :as="true")
    | ▼
  dl.left(v-if="is_open" v-for="say in says")
    dt
      btn(:value="value" :as="say.id" @input="input")
        | {{ say.label }}
    dd
      | {{ say.help }}

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
    say: ->
      Query.says.find @value
    says: ->
      Query.says
      .where (o)=> o.max
      .list

  methods:
    input: (say_id)->
      @$emit "input", say_id
      @is_open = false
</script>
