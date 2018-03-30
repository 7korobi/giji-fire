
<template lang="pug">
div(v-if="self")
  c-report(deco="center", :handle="phase.handle")
    span
      btn(v-for="o in parts", :value="part_id", :as="o._id", :key="o._id") {{ o.label }}
    span
      btn(v-model="handle" as="TITLE") 村の情報
      btn(v-for="o in phases" v-if="can_phase(o.handle)" v-model="handle", :as="o.handle", :key="o.handle") {{ o.label }}
    span
      btn(v-for="o in phases" v-model="show[o.handle]" @toggle="show[o.handle] = ! show[o.handle]", :as="true", :key="o.handle") {{ o.label }}

  div(v-if="sayable")
    c-talk(:sign="self.sign", :face_id="self.face_id" head="monaco editor", :deco="deco", :handle="phase.handle" )
      monaco-editor(v-model="text", :max-row="10")
    c-talk(:sign="self.sign", :face_id="self.face_id" head="発言投稿", :deco="deco", :handle="phase.handle" )
      text-editor(v-model="text", :max-row="10", :max-size="2000")
    c-post(:sign="self.sign", :face_id="self.face_id" head="ト書き投稿", :deco="deco", :handle="phase.handle" )
      text-editor(v-model="text", :max-size="120")
    c-report(:sign="self.sign", :face_id="self.face_id" head="レポート投稿", :deco="deco", :handle="phase.handle" )
      text-editor(v-model="text", :max-row="5", :max-size="2000")
    
  c-report(:handle="self.winner_id", :head="self.role_labels.join('、')")
    div(v-for="o in self.roles.list", v-if="o.help")
      p(v-html="o.help")
    br
    div(v-for="o in self.ables.list", v-if="o.label")
      label {{ o.label }}
      p(v-if="o.help" v-html="o.help")
    br
    div(v-for="o in self.ables.list", v-if="o.target")
      label {{ o.target }}
      p(v-if="o.help" v-html="o.help")
    br
    div(v-for="o in self.ables.list", v-if="o.sw")
      label {{ o.sw }}
      p(v-if="o.help" v-html="o.help")
</template>

<style lang="stylus" scoped>
</style>

<script lang="coffee">
{ Query } = require "~/plugins/memory-record"

module.exports =
  default:
    props: ["self_id"]
    data: ->
      text: ""
      show: "talk"
      deco: "head"
      handle: "SSAY"
      show: {}

    methods:
      can_phase: (handle)->
        Query.stats.find "#{@self_id}-#{handle}"

    computed:
      sayable: ->
        @can_phase @handle
      self: ->
        Query.potofs.find @self_id
      parts: ->
        @$store.state.book.parts
      part: ->
        Query.parts.find @part_id
      part_id: ->
        @$store.state.book.part_id
      phases: ->
        @$store.state.book.phases
      phase: ->
        @show[@handle] = true
        Query.phases.where({ @part_id, @handle }).list.first

</script>