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
  component.text(v-if="edit" v-bind="for_target" v-on="$listeners" v-model="target[for_target.key]")
    select(v-if="edit.is_creating" v-model="v_phase_id" key="handle")
      option(v-for="phase in edit.phases" :value="phase.id" :class="phase.handle" :key="phase.handle") ∞ {{ phase.label }}

    select(v-model="v_show" key="show")
      option(value="post")   描写
      option(value="talk")   会話
      option(value="report") 看板 
    select(v-model="v_head" key="head")
      option(value="") 無地
      option(:value="edit.potof.head") 記名
    select(v-model="v_deco" key="deco")
      option(value="quill")  文字
      option(value="diagram") 作図
    span.pull-right(v-if="edit.is_replacing")
      a.btn.active(@click="$listeners.remove")
        i.mdi.mdi-comment-remove-outline
  component.text(v-else v-bind="for_target" v-on="$listeners" v-model="target[for_target.key]")
  .text(v-if="$slots.default" :class="deco")
    slot
  .date(v-if="anker")
    span.btn {{ anker || "" }}


</template>

<script lang="coffee">
{ Query } = require 'memory-orm'

v_model = (key)->
  computed:
    "v_#{key}":
      get:    -> @[key]
      set: (o)-> @target[key] = o

module.exports =
  mixins: [
    require('~/plugins/markup-event')
    v_model 'log'
    v_model 'data'
    v_model 'show'
    v_model 'head'
    v_model 'deco'
    v_model 'phase_id'
  ]
  props:
    target: Object
    edit:   Object

    id:    String

    label: String
    anker: String

    log:  String
    data: Object

    show: String
    head: String
    deco: String
    to:   String

    phase_id: String

  computed:
    for_target: ->
      switch @deco
        when 'cast'
          key    = 'id'
          value  = @id
          target = 'cast'

        when 'diagram'
          key    = 'data'
          value  = @data
          target = 'diagram'

        when 'sow', 'head', 'mono'
          key    = 'log'
          value  = @log
          target = 'sow'

        else
          key    = 'log'
          value  = @log
          target = 'quill'

      if @edit
        { options } = @edit
        target = "#{target}-editor"
      else
        options = {}
        target = "#{target}-view"

      { key, class: @deco, is: target, ...options }

</script>
