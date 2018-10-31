<template lang="pug">
a-header(:title="title")
</template>
<script lang="coffee">
{ Query } = require "memory-orm"

module.exports =
  data: ->
    href: "#{ location.hostname }#{ location.pathname }"
  computed:
    folder: ->
      Query.folders
      .where (o)=> o.href?.includes @href
      .list[0]
    title: ->
      @folder?.title
</script>
