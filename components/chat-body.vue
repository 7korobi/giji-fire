<template lang="pug">
.chat(:id="id" v-on="markup_event('click')")
  div(v-if="head")
    .name.center(v-if="(!! to)")
      span.pull-right {{ to }}
      | ▷
      span.pull-left {{ head }}
    .name(v-else)
      sup.pull-right(v-if="label") {{ label }}
      | {{ head }}
  hr(v-if="head")
  component.text(v-if="edit" v-bind="for_target" v-on="$listeners" @input="input('log', $event)")
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
  component.text(v-else v-bind="for_target" v-on="$listeners")
  .text(v-if="$slots.default" :class="deco")
    slot
  .date(v-if="anker")
    span.btn {{ anker || "" }}


</template>

<script lang="coffee">
{ Query } = require 'memory-orm'


module.exports =
  mixins: [
    require('~/plugins/markup-event')
  ]
  props:
    id:    String

    label: String
    anker: String

    log:  String
    show: String
    head: String
    deco: String
    to:   String

    phase_id: String

    data: Object
    edit: Object

  methods:
    input: (key, val)->
      val = val?.target?.value ? val
      @$emit 'input', key, val

  computed:
    for_target: ->
      switch @deco
        when 'cast'
          value  = @id
          target = 'cast'

        when 'diagram'
          value = @data
          target = 'diagram'

        when 'sow', 'head', 'mono'
          value  = @log
          target = 'sow'

        else
          value  = @log
          target = 'quill'

      target =
        if @edit
          "#{target}-editor"
        else
          "#{target}-view"

      { value, class: @deco, is: target }

</script>
