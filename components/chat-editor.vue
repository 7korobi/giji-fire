<template lang="pug">
div
  e-potof(v-if="is_creating" v-model="edit.potof")
  c-report(v-if="is_replacing" handle="header" deco="center") 編集中

  chat(v-if="edit.potof.face_id" :id="edit.chat._id" :current="current" :edit="true")
    quill-editor(v-model="edit.chat.log" v-bind="for_editor" v-on="$listeners")
      select(v-if="is_creating" v-model="edit.phase.handle" key="handle")
        option(v-for="phase in phases" :value="phase.handle" :class="phase.handle" :key="phase.handle") ∞ {{ phase.label }}

      select(v-model="edit.chat.show" key="show")
        option(value="post")   描写
        option(value="talk")   会話
        option(value="report") 看板 
      select(v-model="edit.chat.head" key="head")
        option(value="") 無地
        option(:value="edit.potof.head") 記名
      select(v-model="edit.chat.deco" key="deco")
        option(value="quill")  文字
        option(value="diagram") 作図
      span.pull-right(v-if="is_replacing")
        a.btn.active(@click="$listeners.create_mode")
          i.mdi.mdi-open-in-new
        a.btn.active(@click="$listeners.remove")
          i.mdi.mdi-comment-remove-outline

</template>

<script lang="coffee">
{ Query } = require "memory-orm"
{ vuex_value } = require '~/plugins/struct'
edit = require '~/models/editor'

module.exports =
  mixins: [
    require("~/plugins/for_component")
  ]
  props: ["part_id", "phases", "current"]
  data: ->
    edit.org_chat.part_id = @part_id
    { edit }

  watch:
    part_id: ->
      @edit.org_chat.part_id = @part_id

  computed:
    is_creating: -> @edit.chat.potof_id == @edit.potof.id
    is_replacing: -> ! @is_creating

</script>

