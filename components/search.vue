<template lang="pug">
p.form
  label.mdi.mdi-magnify(for="search")
  input.search#search(size="30" :value="value" @input="input" @focus="focus")
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

module.exports =
  props: ["value"]

  methods:
    clear: ->
      @$emit 'input', ''

    focus: ->
      @$emit 'focus'

    input: _.debounce (e)->
      @$emit 'input', e.target.value
    , 1000
</script>
