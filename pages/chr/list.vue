<template lang="pug">
div
  c-post(handle="footer")
    bread-crumb
  c-report(handle="header" deco="center")
    tags(v-model="tag_id")

    hr
    search(v-model="search")
    sub(style="width: 100%")
      | {{ chrs.length }}人の{{ set.long }}を表示しています。
  .fullframe
    transition-group.portrates(name="list" tag="div")
      portrate(v-for="chr in chrs", :face_id="chr.face_id", :key="chr.face_id")
        p {{ chr.job }}
        p {{ chr.face.name }}
  c-post(handle="footer")
    bread-crumb
</template>
<script lang="coffee">
{ Query } = require "~/plugins/memory-record"

module.exports =
  mixins: [
    require("~/plugins/browser-store")
      replace:
        tag_id: "giji"
        search: ""
  ]
  computed:
    set: ->
      Query.tags.find @tag_id
    chrs: ->
      Query.chr_jobs
      .tag @tag_id
      .search @search
      .list

</script>

<style lang="sass">
</style>
