<script lang="coffee">
_ = require "lodash"

module.exports =
  props: ["as", "value", "set", "handle", "multi"]
  methods:
    del: ->
      @$emit 'input', @del_value
    tap: ->
      @$emit 'input', @tap_value

  computed:
    is_multi: ->
      @multi?

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
        if @has && ! @is_multi
          @del_value
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
  width: 1em

</style>
<template lang="pug">
a.btn(:class="btn" @click.stop="tap")
  slot
  sup(v-if="1 < size") {{ size }}
  span.btn.plus(v-if="0 < size && is_multi" :class="handle" @click.stop="del") ×
</template>
