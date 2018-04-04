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

IMG
  display: block

IMG.hide
  filter: sepia(60%) hue-rotate(180deg);

.chrblank
  background: #444844
  color:      #CCF
  margin: 0 auto
  p
    text-align:  center
    white-space: nowrap

.swipe
  .portrate
    max-width: 45px
    width:     45px
    background-color: black

    IMG
      max-height: 65px
      height:     65px
      max-width: 45px
      width:     45px
    IMG + .chrblank
      margin: 0.5px 0.5px 2px 0.5px
      padding: 0

    .chrblank
      max-width:    44px
      width:        44px
      border-radius: 4px

.fullframe,
.contentframe
  .portrate
    max-width: 90px
    width:     90px
    background-color: black

    IMG
      max-height: 130px
      height:     130px
      max-width: 90px
      width:     90px

    IMG + .chrblank
      margin: 1px 1px 3px 1px
      padding: 0

    .chrblank
      max-width:    88px
      width:        88px
      border-radius: 9px


</style>

