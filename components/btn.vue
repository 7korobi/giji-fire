<script lang="coffee">
_ = require "lodash"

module.exports =
  props:
    as:
      required: true
    value:
      required: true
    bool:
      default: "equal"

  methods:
    tap: ->
      if @bool_is
        @$emit 'toggle', @as
      else
        @$emit 'input',  @as

  computed:
    bool_is: ->
      switch @bool
        when "equal"
          _.isEqual @as, @value
        when "include"
          for as in @as
            unless as in @value
              return false 
          return true
    btn: ->
      if @bool_is
        ["active"]
      else
        []
</script>

<template lang="pug">
a.btn(:class="btn", @click="tap")
  slot
</template>
