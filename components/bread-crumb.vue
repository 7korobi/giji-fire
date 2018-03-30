<script lang="coffee">
_ = require "lodash"

module.exports =
  mounted: ->
#    console.log @$slots.default

</script>

<template lang="pug">
ol.bread-crumb
  li
    nuxt-link(to="/") Top
  slot
</template>

<style lang="stylus">

.bread-crumb > li + li:before
  content: "/"

.bread-crumb
  li
    display: inline-block

  :first-child
    display: inline-block

</style>
