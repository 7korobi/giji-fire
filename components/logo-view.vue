<template lang="pug">
article
  .name
    | {{ value.id }} by {{ value.sign }}
    img.mark.pull-right(:src="o.path" v-for="o in use_marks")
  hr
  br
  center
    h2 {{ value.label }}
    br

</template>

<script lang="coffee">
{ Query } = require 'memory-orm'
{ path_by } = require "vue-petit-store"

module.exports =
  props: ["value"]
  computed:
    use_marks: ->
      Query.marks.finds @value.mark_ids
</script>
