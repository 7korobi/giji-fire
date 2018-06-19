<template lang="pug">
div
  c-post(handle="footer")
    bread-crumb
  c-report(handle="header" deco="center")
    tags(v-model="tag_id")
    sub(style="width: 100%")
      | {{ chrs.length }}人の{{ set.long }}を表示しています。
  .fullframe
    transition-group.portrates(name="list" tag="div")
      portrate(v-for="chr in chrs", :face_id="chr._id", :key="chr._id")
        p {{ job(chr._id) }}
        p {{ chr.name }}
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
  ]
  computed:
    set: ->
      Query.tags.find @tag_id
    chrs: ->
      Query.faces.tag(@tag_id).list

  methods:
    job: (face_id)->
      @set
      .chr_job face_id
      .job
</script>

<style lang="stylus">
</style>
