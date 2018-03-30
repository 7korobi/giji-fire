<script lang="coffee">
_ = require "lodash"
el = require "~/plugins/dom"

module.exports =
  props: ["as", "value"]

  computed:
    el_adjust: el.adjust
    btn: ->
      if @el_adjust
        @$nextTick ->
          @$emit 'input', @as
      [@el_adjust]

</script>

<template lang="pug">
a(:class="btn")
  slot
</template>
