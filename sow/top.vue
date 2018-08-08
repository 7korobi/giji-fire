<template lang="pug">
a-header(:title="title")
</template>
<script lang="coffee">
{ Query } = require "~/plugins/memory-record"

module.exports =
  computed:
    folder: ->
      Query.folders
      .where (o)-> o.href.includes "#{ location.hostname }#{ location.pathname }"
      .list[0]
    title: ->
      @folder?.title
</script>
