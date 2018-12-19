<script lang="coffee">
_ = require "lodash"

module.exports =
  mounted: ->
#    console.log @$route.matched[0]?.components.default?.options.bread_crumb
#    console.log @$router.resolve({ path: '.' }).resolved.matched[0]?.components.default?.options.bread_crumb
#    console.log @$router.resolve({ path: '..' }).resolved.matched[0]?.components.default?.options.bread_crumb
#    console.log @$router.resolve({ path: '../..' }).resolved.matched[0]?.components.default?.options.bread_crumb
#    console.log @$slots.default

</script>

<template lang="pug">
ol.bread-crumb
  li
    nuxt-link(to="/") Top
  slot
</template>

<style lang="sass">

.bread-crumb > li + li:before
  content: "/"

.bread-crumb
  li:before
    content: ""
    text-align: center
  li
    display: inline-block

  :first-child
    display: inline-block

</style>
