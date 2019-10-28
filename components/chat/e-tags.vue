<template lang="pug">
div
  c-post(handle="MAKER")
    span(v-if="! is_open")
      span(v-if="faces.length")
        | キャラクター {{ faces.length }}人
      span(v-else)
        | 選択可能なキャラクターを選びましょう。
    btn.pull-right(v-if="is_open" v-model="is_open" :as="false")
      | ▲
    btn.pull-right(v-else v-model="is_open" :as="true")
      | ▼
    .TSAY.center(v-if="is_open && secret_tag_ids.length")
      tags(v-model="tag_id" :tag_ids="secret_tag_ids")

    .header.center(v-if="is_open")
      tags(v-model="tag_id" :tag_ids="value")
      .btn.pull-right(@click="reset_tags")
        | クリア
      sub(style="width: 100%" v-if="set")
        | {{ chrs.length }}人の{{ set.long }}を表示しています。

  .fullframe(v-if="is_open && tag_id")
    transition-group.portrates(name="list" tag="div")
      .portrate.header.form(key="hide")
        .btn(v-if="in_tag" @click="change_tags('hide_tag_ids')") 
          | × 外す
        .btn(v-else @click="change_tags('show_tag_ids')")
          | 〇 追加
      portrate(v-for="chr in chrs" :key="chr._id" :face_id="chr._id")
        p {{ job(chr._id) }}
        p {{ chr.name }}
</template>
<script lang="coffee">
{ Query } = require 'memory-orm'
{ error } = require "~/app/plugins/form"

module.exports =
  mixins: [
    error 'bans', ( chk )->
    error 'warns', ( chk )->
  ]
  data: ->
    tag_id: ""
    is_open: false
  props: ['value']
      
  computed:
    tag_ids: ->
      @value || @all_tag_ids

    faces: ->
      Query.faces
      .in tag_ids: @tag_ids
      .list

    all_tag_ids: ->
      Query.tags.where(tag_id: ['all', undefined]).pluck("id")

    secret_tag_ids: ->
      { tag_ids, tag_id } = @
      @all_tag_ids.filter (id)=> ! tag_ids.includes id

    hide_up_tag_ids: ->
      { tag_ids, tag_id } = @
      tag = Query.tags.find tag_id
      ret = [tag_id]
      while tag = tag.tag
        ret.push tag.id
      tag_ids.filter (id)=> ! ret.includes id

    hide_tag_ids: ->
      { tag_ids, tag_id } = @
      tag = Query.tags.find tag_id
      ret = [tag_id]
      depth = 1
      while (ids = tag.nodes(depth).ids).length
        for id in ids
          continue if ret.includes id
          ret.push id
        depth++

      while tag = tag.tag
        ret.push tag.id
      tag_ids.filter (id)=> ! ret.includes id

    show_tag_ids: ->
      { tag_ids, tag_id } = @
      tag = Query.tags.find tag_id
      ret = [tag_id, ...tag_ids]
      depth = 1
      while (ids = tag.nodes(depth).ids).length
        for id in ids
          continue if ! @all_tag_ids.includes id
          continue if ret.includes id
          ret.push id
        depth++

      while tag = tag.tag
        { ids } = tag.nodes(1)
        continue if _.without(ids, ...ret).length
        ret.push tag.id
      ret

    in_tag: ->
      @tag_ids.includes @tag_id

    set: ->
      Query.tags
      .find @tag_id
    chrs: ->
      Query.faces
      .tag @tag_id
      .list

  methods:
    reset_tags: ->
      @$emit "input", []

    change_tags: (mode)->
      @$emit "input", @[mode]
      @tag_id = ""

    job: (face_id)->
      if @set
        @set
        .chr_job face_id
        .job
      else
        ""

</script>

<style lang="sass">
</style>
