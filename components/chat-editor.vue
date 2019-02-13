<template lang="pug">
chat(v-if="is_editing" :id="id" :current="current" v-on="$listeners")
chat(v-else :id="id" :current="current" :edit="true")
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
      a.btn.active(@click="$listeners.remove")
        i.mdi.mdi-comment-remove-outline

</template>

<script lang="coffee">
edit = require '~/models/editor'

module.exports =
  mixins: [
    require("~/plugins/for_component")
  ]
  props: ["id", "part_id", "phases", "current"]
  data: ->
    edit.org_chat.part_id = @part_id
    { edit }

  watch:
    part_id: ->
      @edit.org_chat.part_id = @part_id

  computed:
    is_creating: -> @edit.chat.potof_id == @edit.potof.id
    is_replacing: -> ! @is_creating
    is_editing: -> @id != @edit.chat.id

</script>

