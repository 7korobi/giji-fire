<template lang="pug">
article
  table
    tbody
      tr(v-for="{ sign, job, name, live } in potofs")
        td.r {{ job }}
        td.l {{ name }}
        td.c …
        td.c {{ sign }}
</template>

<script lang="coffee">

module.exports =
  props: ["value"]
  computed:
    potofs: ->
      # where (o)-> 'leave' != o.live
      []

</script>
