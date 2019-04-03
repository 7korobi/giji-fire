<template lang="pug">
div
  c-report(v-if="! is_open" handle="header" deco="center")
    | 選択： 
    a.btn(@click="is_open = true")
      p(v-if="set && name") {{ value.job }} {{ name }}
      p(v-else) (キャラクターを選ぶ。)
  
  c-report(v-if="is_open" handle="header" deco="center")
    tags(v-model="tag_id")
    sub(style="width: 100%" v-if="set")
      | {{ chrs.length }}人の{{ set.long }}を表示しています。
  .fullframe(v-if="is_open && tag_id")
    transition-group.portrates(name="list" tag="div")
      portrate(v-for="chr in chrs", :face_id="chr._id", :key="chr._id" @click="set_face")
        p {{ job(chr._id) }}
        p {{ chr.name }}
</template>
<script lang="coffee">
{ Query } = require 'memory-orm'

module.exports =
  data: ->
    tag_id: ""
    is_open: false
  props: ['value', 'potofs']
      
  computed:
    name: ->
      if face = Query.faces.find @value.face_id
        face.name
      else
        ""
    set: ->
      Query.tags
      .find @tag_id || @value.tag_id
    chrs: ->
      Query.faces
      .tag @tag_id
      .list

  methods:
    job: (face_id)->
      
      if @set
        @set
        .chr_job face_id
        .job
      else
        ""

    set_face: (face_id)->
      job = @job face_id
      o = { @tag_id, job, face_id }
      @$emit 'input', o

      @is_open = false
      @tag_id = ""

</script>

<style lang="sass">
</style>
