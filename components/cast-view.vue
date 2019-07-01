<template lang="pug">
article
  table
    tbody
      tr(v-for="{ sign, job, face, live } in potofs")
        td.r {{ job }}
        td.l {{ face && face.name }}
        td.c …
        td.c {{ sign }}
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
    potofs: ->
      Query.potofs
      .cast @book_id
      .list

</script>
