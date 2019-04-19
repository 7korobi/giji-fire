<script lang="coffee">
{ fullpage } = require '~/plugins/observer'

module.exports =
  directives:
    fullpage: fullpage 'pos'

  props: ["as", "value"]

  data: ->
    pos: 'view'

  computed:
    btn: ->
      if "view" == @pos
        @$nextTick ->
          @$emit 'input', @as
      [@pos]

</script>

<template lang="pug">
a(:class="btn" v-fullpage)
  slot
</template>
