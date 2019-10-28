<template lang="pug">
.chat(:id="id" v-on="markup_event('click')")
  template(v-if="head")
    .name.center(v-if="(!! to)")
      span.pull-right {{ to }}
      | ▷
      span.pull-left {{ head }}
    .name(v-else)
      sup.pull-right(v-if="label") {{ label }}
      | {{ head }}
  hr(v-if="head")
  component.text(v-bind="for_target" v-on="$listeners" v-model="v_value" v-if="v_value && $listeners.submit")
    select(v-model="v_phase_id" key="handle" v-if="edit.is_creating && $listeners['update:handle']")
      option(v-for="phase in edit.phases" :value="phase.id" :class="phase.handle" :key="phase.handle") ∞ {{ phase.label }}

    select(v-model="v_show" key="show" v-if="$listeners['update:show']")
      option(value="post")   描写
      option(value="talk")   会話
      option(value="report") 看板 
    select(v-model="v_head" key="head" v-if="$listeners['update:head']")
      option(value="") 無地
      option(:value="edit.head") 記名
    select(v-model="v_deco" key="deco" v-if="$listeners['update:deco']")
      option(value="slate")  文字
      option(value="diagram") 作図
    span.pull-right(v-if="edit.is_replacing")
      a.btn.active(@click="$listeners.remove")
        i.mdi.mdi-comment-remove-outline
  component.text(v-bind="for_target" v-on="$listeners" :value="v_value" v-if="v_value && ! $listeners.submit")
  .text(v-if="$slots.default" :class="deco")
    slot
  .date(v-if="anker")
    check(v-model="shows" as="mention") {{ anker || "" }}

</template>

<script lang="coffee">
{ Query } = require 'memory-orm'
{ localStorage, path_by } = require "vue-petit-store"

v_model = (key)->
  computed:
    "v_#{key}":
      get:    -> @[key]
      set: (o)-> @$emit "update:#{key}", o

module.exports =
  mixins: [
    require('~/plugins/markup-event')
    localStorage "shows"
    path_by "id", [null, null, null, null, 'chat']
    v_model 'log'
    v_model 'data'
    v_model 'show'
    v_model 'head'
    v_model 'deco'
    v_model 'phase_id'
  ]

  props:
    current: Object

    id:      String
    face_id: String

    handle:  String

    log:  String
    data: Object
    book: Object

    show: String
    head: String
    deco: String
    to:   String

  data: ->
    shows: []

  computed:
    edit: ->
      phases: Query.phases.list
      head: 'test'
      is_creating: false
      is_replacing: false

    anker: ->
      @chat?.anker @current?.part_id

    label: ->
      ""

    v_value:
      get: ->
        @[@for_target.key]
      set: (o)->
        @$emit "update:#{@for_target.key}", o

    for_target: ->
      switch @deco
        when 'logo', 'cast'
          key = 'book'
          component = @deco

        when 'diagram'
          key = 'data'
          component = 'diagram'

        when 'sow', 'head', 'mono'
          key = 'log'
          component = 'sow'

        else
          key = 'log'
          component = 'slate'

      id = "#{key}-#{ @id }"
      if @$listeners.submit
        component = "#{component}-edit"
      else
        component = "#{component}-view"

      { id, @handle, key, class: @deco, is: component }

</script>
