<template lang="pug">
quill-editor(@input="input('log', $event)" :value="log" v-bind="for_editor" v-on="$listeners")
  select(v-if="edit.is_creating" @input="input('phase_id', $event.target.value)" :value="phase_id" key="handle")
    option(v-for="phase in edit.phases" :value="phase.id" :class="phase.handle" :key="phase.handle") ∞ {{ phase.label }}

  select(@input="input('show', $event)" :value="show" key="show")
    option(value="post")   描写
    option(value="talk")   会話
    option(value="report") 看板 
  select(@input="input('head', $event)" :value="head" key="head")
    option(value="") 無地
    option(:value="edit.potof.head") 記名
  select(@input="input('deco', $event)" :value="deco" key="deco")
    option(value="quill")  文字
    option(value="diagram") 作図
  span.pull-right(v-if="edit.is_replacing")
    a.btn.active(@click="$listeners.remove")
      i.mdi.mdi-comment-remove-outline

</template>

<script lang="coffee">
module.exports =
  mixins: [
    require("~/plugins/for_component")
  ]
  props:
    value: String
    log: String
    show: String
    head: String
    deco: String

    phase_id: String

    edit: Object

  methods:
    input: (key, val)->
      val = val?.target?.value ? val
      @$emit 'input', key, val
  computed: {}

</script>

