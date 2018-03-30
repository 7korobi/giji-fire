<template lang="pug">
p.form
  span.tag
    tag#all
    tag#giji
    tag#shoji
    tag#travel
    tag#stratos
    tag#myth
    tag#asia
    tag#marchen

  span.tag
    tag#animal
    tag#school

  span.tag
    tag#kid
    tag#young
    tag#middle
    tag#elder

  span.tag
    tag#river
    tag#road
    tag#immoral

  span.tag
    tag#guild
    tag#elegant
    tag#ecclesia

  span.tag
    tag#medical
    tag#market

  span.tag
    tag#apartment
    tag#servant
    tag#farm
    tag#government

  span.tag
    tag#god
</template>

<script lang="coffee">
module.exports =
  default: require("./tag.vue").default.parent

</script>
