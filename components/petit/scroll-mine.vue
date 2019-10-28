<script lang="coffee">
{ on_peek } = require "vue-petit-store"

module.exports =
  directives:
    pos: on_peek 'pos'

  props: ["as", "value"]

  data: ->
    pos: 'view'

  computed:
    btn: ->
      if @$el && "view" == @pos
        @$nextTick ->
          @$emit 'input', @as
      [@pos]

</script>

<template lang="pug">
a(:class="btn" v-pos)
  slot
</template>
