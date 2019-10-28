

<template lang="pug">
c-post(handle="MAKER")
  btn(:value="value" @input="input" :as="[]")
    i.mdi.mdi-eraser
  check(v-for="o in marks" :value="value || []" @input="input" :as="o.id" :key="o.id")
    img.mark(:src="o.path")

</template>
<script lang="coffee">
{ Query } = require 'memory-orm'

module.exports =
  data: ->
    is_open: false
  props: ['value']
      
  computed:
    marks: ->
      console.log @value
      Query.marks.where(enable: true).list

  methods:
    input: (mark_ids)->
      @$emit "input", mark_ids
      @is_open = false
</script>
