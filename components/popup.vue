<template lang="pug">
.outframe.popup(:style="style")
  .contentframe
    .report
      .chat.btns.center
    .inframe
      chat(v-on="$listeners" :current="current" :id="id")
    .report
      .chat.btns.center
</template>
<script lang="coffee">
{ Query, Finder } = require 'memory-orm'

module.exports =
  props: ["id", "current", "adjust", "pageY", "zIndex"]

  data: ->
    height: 0

  computed:
    style: ->
      switch @adjust
        when "top"
          top = "#{ @pageY - 12 - @height }px"
        when "bottom"
          top = "#{ @pageY + 12 }px"
      { top, @zIndex, position: "absolute" }

  mounted: ->
    if rects = @$el.getClientRects()
      { @height } = rects[0]

</script>
