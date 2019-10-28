<script lang="coffee">
_ = require "lodash"

module.exports =
  props: ["as", "value", "set", "handle"]
  methods:
    del: ->
      @$emit 'input', @del_value, @as
    tap: ->
      @$emit 'input', @tap_value, @as

  computed:
    equal: ->
      ! _.xor(@value, @as).length

    has: ->
      @value.includes @as

    add_value: ->
      [...@value, @as]
    
    del_value: ->
      _.reject @value, (item)=> item == @as

    tap_value: ->
      if @set
        if @equal
          []
        else
          @as
      else
          @add_value

    size: ->
      count = 0
      for value in @value
        if value == @as
          count++
      count

    btn: ->
      bool =
        if @set
          @equal
        else
          @has
      o = []
      o.push @handle  if @handle
      o.push "active" if bool
      o

</script>
<style lang="sass">
.btn.plus
  width: 1.0em

</style>
<template lang="pug">
a.btn(:class="btn" @click.stop="tap")
  slot
  sup(v-if="1 < size") {{ size }}
  span.btn.plus(v-if="0 < size" :class="handle" @click.stop="del") ×
</template>
