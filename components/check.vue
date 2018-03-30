<script lang="coffee">
_ = require "lodash"

module.exports =
  props: ["as", "value", "set"]
  methods:
    tap: ->
      @$emit 'input', @tap_value

  computed:
    equal: ->
      ! _.xor(@value, @as).length    

    tap_value: ->
      if @set
        if @equal
          []
        else
          @as
      else
        _.xor @value, [@as]

    btn: ->
      if @set
        bool = @equal
      else
        idx = @value.indexOf(@as)
        bool = !(idx < 0)
      if bool
        ["active"]
      else
        []
</script>

<template lang="pug">
a.btn(:class="btn", @click="tap")
  slot
</template>
