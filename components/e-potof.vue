<template lang="pug">
div
  c-report(handle="header" deco="center")
    span(v-if="! is_open")
      span(v-if="value && name")
        | {{ label }} {{ value.job }} {{ name }}
      span(v-else)
        | {{ label }}を決めましょう。
    btn.pull-right(v-if="is_open" v-model="is_open" :as="false")
      | ▲
    btn.pull-right(v-else v-model="is_open" :as="true")
      | ▼

    div(v-if="is_open")
      tags(v-model="tag_id" :tag_ids="tag_ids")
      sub(style="width: 100%" v-if="set")
        | {{ chrs.length }}人の{{ set.long }}を表示しています。

  .fullframe(v-if="is_open && tag_id")
    transition-group.portrates(name="list" tag="div")
      portrate(v-for="chr in chrs" :key="chr._id" :face_id="chr._id" @click="set_face")
        p {{ job(chr._id) }}
        p {{ chr.name }}
</template>
<script lang="coffee">
{ Query } = require 'memory-orm'

module.exports =
  data: ->
    tag_id: ""
    is_open: false
  props: ['value', 'tag_ids', 'face_ids', 'label']

  computed:
    in_tag: ->
      @tag_ids.includes @tag_id

    name: ->
      Query.faces.find @value?.face_id
      ?.name

    set: ->
      Query.tags
      .find @tag_id || @value?.tag_id

    chrs: ->
      if @face_ids
        Query.faces
        .tag @tag_id
        .where id: @face_ids
        .list
      else
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
