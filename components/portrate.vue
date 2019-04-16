<script lang="coffee">
{ Query } = require 'memory-orm'
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
      has_img_src = @img_src && 'external'
      if @hide
        ["hide"]
      else
        [has_img_src]
    undef: ->
      _id: 'undef'
      id: 'undef'
      comment: ""
      name: ""
      order: 0
      tag_ids: []

    image_src: ->
      return @img_src if @img_src

      face = Query.faces.find(@face_id) ? @undef
      "#{url.assets}/images/portrate/#{ face.id }.#{face.format ? 'jpg'}"

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

