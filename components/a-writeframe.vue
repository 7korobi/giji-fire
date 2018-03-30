<script lang="coffee">

module.exports =
  default:
    props: ["top"]
    data: ->
      text: ""

    computed:
      text_rows: ->
        rows = @text.split("\n").length
        if 2 < rows
          rows
        else
          3

      show_write: ->
        @$store.state.menu.target == 'comment'
      show: ->
        @show_write
      style: ->
        position: "absolute"
        transform: "translateY(#{@top}px)"

</script>

<template lang="pug">
.writeframe(v-if="show", :style="style")
  .contentframe(v-if="show_write")
    .inframe
      talk(sign="ななころび" handle="SSAY" face_id="c71")
        text-editor(v-model="text")
      br
</template>
