<template lang="pug">
div
  c-report(v-if="! is_open" handle="header" deco="center")
    | 選択： 
    a.btn(@click="is_open = true")
      p(v-if="set && name") {{ value.job }} {{ name }}
      p(v-else) (キャラクターを選ぶ。)
  c-report(v-if="is_open" handle="header" deco="center")
    tags(v-model="value.tag_id")
    sub(style="width: 100%" v-if="set")
      | {{ chrs.length }}人の{{ set.long }}を表示しています。
  .fullframe(v-if="is_open && value.tag_id")
    transition-group.portrates(name="list" tag="div")
      portrate(v-for="chr in chrs", :face_id="chr._id", :key="chr._id" @click="set_face")
        p {{ job(chr._id) }}
        p {{ chr.name }}
</template>
<script lang="coffee">
{ Query } = require "memory-orm"

module.exports =
  data: ->
    is_open: false
  props:
    value:
      required: true
  computed:
    name: ->
      if face = Query.faces.find @value.face_id
        face.name
      else
        ""
    set: ->
      Query.tags
      .find @value.tag_id
    chrs: ->
      Query.faces
      .tag @value.tag_id
      .list

  methods:
    job: (face_id)->
      if @set
        @set.chr_job face_id
        .job
      else
        ""

    set_face: (id)->
      @value.face_id = id
      @value.job = @job id
      @$emit 'input', @value
      @is_open = false
</script>

<style lang="sass">
</style>
