<template lang="pug">
div
  .TITLE
    hr
    h6 メモ
    hr
  .swipe
    table
      tbody.tlist(v-for="(chats, idx) in side_contents", :key="idx")
        tr-intro-memo(v-for="o in chats" v-on="$listeners", :key="o.id", :id="o.id", :handle="o.phase.handle", :deco="o.deco", :log="o.log")
</template>

<style lang="sass" scoped>
table
  width: 100%
  border-collapse: collapse

</style>

<script lang="coffee">
module.exports =
  props: ['side_contents']

</script>
