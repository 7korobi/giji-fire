<template lang="pug">
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
module.exports =
  mixins: [
    require("~/plugins/for_component")
  ]
  props: ["part_id", "phases", "edit"]

  computed:
    is_creating: -> @edit.chat.potof_id == @edit.potof.id
    is_replacing: -> ! @is_creating

</script>

