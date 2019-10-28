<template lang="pug">
c-post(handle="MAKER")
    span(v-if="! is_open")
      span(v-if="options.length")
        | 特殊設定 
        span.btn(v-for="o in options") {{ o.label }}
      span(v-else)
        | 特殊設定を選択しましょう。
    btn.pull-right(v-if="is_open" v-model="is_open" :as="false")
      | ▲
    btn.pull-right(v-else v-model="is_open" :as="true")
      | ▼
    dl(v-if="is_open" v-for="o in all_options")
      dt
        check(:value="value" :as="o.id" @input="input")
          | {{ o.label }}
      dd
        | {{ o.help }}

</template>
<script lang="coffee">
{ Query } = require 'memory-orm'
{ error } = require "~/app/plugins/form"

module.exports =
  mixins: [
    error 'bans', ( chk )->
    error 'warns', ( chk )->
  ]
  data: ->
    is_open: false
  props: ['value']
      
  computed:
    options: ->
      Query.options
      .where id: @value
      .list

    all_options: ->
      Query.options
      .list

  methods:
    input: (option_ids)->
      @$emit "input", option_ids
</script>
