<template lang="pug">
article
  .name
    | {{ book.id }} by {{ book.sign }}
    img.mark.pull-right(:src="o.path" v-for="o in use_marks")
  hr
  br
  center
    h2 {{ book.label }}
    br

</template>

<script lang="coffee">
{ Query } = require 'memory-orm'
{ path_by } = require "vue-petit-store"

module.exports =
  mixins: [
    path_by "value", [null, 'book']
  ]
  props: ["value"]
  computed:
    use_marks: ->
      console.warn @book
      Query.marks.finds @book.mark_ids
</script>
