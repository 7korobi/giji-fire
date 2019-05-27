<template lang="pug">
p.form
  label.mdi.mdi-magnify(for="search")
  input.search#search(size="30" v-model="search" @focus="focus")
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
{ to_msec, types } = require "vue-petit-store"

time_base = (method)-> (id, { times })->
  default_id = "#{id}_default"
  type_id = "#{id}_type"
  tail_ids = "#{id}_tail_ids"
  tail_funcs = "#{id}_tail_funcs"

  data: ->
    o = {}
    times.forEach (time)=>
      tail_id = "#{id}_#{time}"
      _.set o, tail_id, null
    o

  created: ->
    @[tail_ids] = []
    @[tail_funcs] = []

    id_value = _.get @, id

    times.forEach (time)=>
      msec = to_msec time
      tail_id = "#{id}_#{time}"
      _.set @, tail_id, id_value

      @[tail_ids].push tail_id
      @[tail_funcs].push method (value)=>
        _.set @, tail_id, value
      , msec

    @[default_id] = id_value
    @[type_id] = types[id_value.constructor]

  watch:
    [id]: (newValue)->
      for tail_func, idx in @[tail_funcs]
        tail_func newValue

debounces = time_base _.debounce
throttles = time_base _.throttle
delays = time_base (cb, msec)-> (value)->
  setTimeout cb, msec, value

module.exports =
  mixins: [
    debounces "search", times: ["1s"]
  ]
  props: ["value"]
  data: ->
    search: ""

  watch:
    value: (value)->
      @search = value

    search_1s: (search)->
      @$emit 'input', search

  methods:
    clear: ->
      @$emit 'input', ''

    focus: ->
      @$emit 'focus'

</script>
