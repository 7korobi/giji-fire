<script lang="coffee">
{ Query } = require "~/plugins/memory-record"
{ url } = require "~/config/live.yml"

module.exports =
  props:
    img_src:
      type: String
    face_id:
      type: String
    hide:
      type: Boolean
  computed:
    has_html: ->
      !! @$slots.default
    image_class: ->
      if @hide
        ["hide"]
      else
        []
    image_src: ->
      face = Query.faces.find(@face_id, "all")
      switch
        when @img_src
          @img_src
        when face
          "#{url.assets}/images/portrate/#{ face.id }.jpg"

  methods:
    click: ->
      @$emit 'click', @face_id


</script>

<template lang="pug">
.portrate(@click="click")
  img(:src="image_src", :class="image_class")
  .chrblank(v-if="has_html")
    slot
</template>

<style lang="stylus">
</style>

