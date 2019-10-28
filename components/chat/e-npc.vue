<template lang="pug">
div
  c-post(handle="MAKER")
    span(v-if="! is_open")
      span(v-if="job && name")
        | 最初の犠牲者 {{ job }} {{ name }}
      span(v-else)
        | 最初の犠牲者を決めましょう。
    btn.pull-right(v-if="is_open" v-model="is_open" :as="false")
      | ▲
    btn.pull-right(v-else v-model="is_open" :as="true")
      | ▼

  .fullframe(v-if="is_open")
    transition-group.portrates(name="list" tag="div")
      portrate(v-for="npc in npcs" :key="npc.id" :face_id="npc.face_id" @click="set_npc(npc)")
        p {{ npc.chr_job.job }}
        p {{ npc.face.name }}
        p {{ chr_set_ids.includes(npc.chr_set_id) ? "★" : "" }}

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
    is_open: false
  props: ['job', 'face_id', 'chr_npc_id', 'tag_ids']

  computed:
    chr_set_ids: ->
      Query.tags.where id: @tag_ids
      .pluck "chr_set_id"
    face_ids: ->
      Query.faces
      .in { @tag_ids }
      .pluck "id"

    name: ->
      Query.faces.find @face_id
      .name

    npcs: ->
      Query.chr_npcs.list

  methods:
    set_npc: (npc)->
      { job } = npc.chr_job
      { id, face_id } = npc
      @$emit 'update:job', job
      @$emit 'update:face_id', face_id
      @$emit 'update:chr_npc_id', id
      @is_open = false

</script>

<style lang="sass">
</style>
