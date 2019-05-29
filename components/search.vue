<template lang="pug">
p.form
  label.mdi.mdi-magnify(for="search")
  input.search#search(size="30" :value="value" list="search_log" @input="input" @focus="focus")
  datalist#search_log
    option(v-for="s in history.search" :value="s")
  label.mdi.mdi-eraser(v-if="value !== ''" @click="clear")
</template>

<style lang="sass" scoped>
.form
  width: 98%
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  align-items: stretch

label
  flex: 0 0 auto
input
  flex: 2 2 auto
  min-width: 0
</style>

<script lang="coffee">
_ = require 'lodash'
{ localStorage } = require "vue-petit-store"

module.exports =
  props: ["value"]
  mixins: [
    localStorage "history.search"
  ]

  watch:
    "history.search": ->
      console.log "history search value:", @history.search

  data: ->
    history:
      search: []

  methods:
    clear: ->
      @$emit 'input', ''

    focus: ->
      @$emit 'focus'

    input: _.debounce (e)->
      @$emit 'input', value = e.target.value
      if value
        @history.search = [
          value
          ... for log in @history.search when ! value.startsWith log
                log
        ]
    , 1000
</script>
