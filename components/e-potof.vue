<template lang="pug">
div
  c-report(v-if="! is_open" handle="header" deco="center")
    | 選択： 
    a.btn(@click="is_open = true")
      span(v-if="set && name") {{ value.job }} {{ name }}
      span(v-else) (キャラクターを選ぶ。)
  
  c-report(v-if="is_open && secret_tag_ids.length" handle="TSAY" deco="center")
    tags(v-model="tag_id" :tag_ids="secret_tag_ids")
    .btn.pull-right(@click="reset_tags")
      | クリア

  c-report(v-if="is_open" handle="header" deco="center")
    tags(v-model="tag_id" :tag_ids="tag_ids")
    btn.pull-right(v-model="is_open" :as="false") ×
    sub(style="width: 100%" v-if="set")
      | {{ chrs.length }}人の{{ set.long }}を表示しています。
  .fullframe(v-if="is_open && tag_id")
    transition-group.portrates(name="list" tag="div")
      .portrate.header(v-if="$listeners.tag_ids" key="hide")
        .btn.form(v-if="in_tag" @click="toggle_tags") 
          | × 外す
        .btn.form(v-else @click="toggle_tags")
          | 〇 追加
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
  props: ['tag_ids', 'value', 'potofs']
      
  computed:
    secret_tag_ids: ->
      if @$listeners.tag_ids
        { tag_ids, tag_id } = @
        Query.tags.pluck("id").filter (id)=> ! tag_ids.includes id
      else
        []

    hide_tag_ids: ->
      { tag_ids, tag_id } = @
      tag = Query.tags.find tag_id
      ret = [tag_id]
      while tag = tag.tag
        ret.push tag.id
      tag_ids.filter (id)=> ! ret.includes id

    show_tag_ids: ->
      { tag_ids, tag_id } = @
      tag = Query.tags.find tag_id
      ret = [tag_id, ...tag_ids]
      while tag = tag.tag
        unless tag.nodes(1).pluck("id").find (id)=> ! ret.includes id
          ret.push tag.id
      ret

    in_tag: ->
      @tag_ids.includes @tag_id

    name: ->
      if face = Query.faces.find @value?.face_id
        face.name
      else
        ""
    set: ->
      Query.tags
      .find @tag_id || @value?.tag_id
    chrs: ->
      Query.faces
      .tag @tag_id
      .list

  methods:
    reset_tags: ->
      @$emit "tag_ids", null
    toggle_tags: ->
      tag_ids =
        if @in_tag
          @hide_tag_ids
        else
          @show_tag_ids
      @$emit "tag_ids", tag_ids

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
