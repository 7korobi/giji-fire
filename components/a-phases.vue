<script lang="coffee">
{ Query } = require "~/plugins/memory-record"

module.exports =
  default:
    props: ["value", "part_id"]
    methods:
      tap: (value)->
        @$emit 'input', value

      phase_at: (xk, yk)->
        Query.phases.where(part_id: @part_id, handle: xk, group: yk).list
    computed:
      group_calcs: ->
        list = Query.phases.where(part_id: @part_id).reduce?.group.summary ? []
        for o in list
          o.phases ?= Query.phases.where(part_id: @part_id, group: o.id)
          o.chats ?= Query.chats.where(part_id: @part_id, "phase.group": o.id)
        list
      handle_calcs: ->
        list = Query.phases.where(part_id: @part_id).reduce?.handle.summary ? []
        for o in list
          o.phases ?= Query.phases.where(part_id: @part_id, handle: o.id)
          o.chats ?= Query.chats.where(part_id: @part_id, "phase.handle": o.id)
        list

</script>

<template lang="pug">
div
  table
    thead
      tr
        th
        th(v-for="xo in handle_calcs")
          btn(@input="tap", :value="value", :as="xo.phases.pluck('id')")
            | {{ xo.id }}
            sup {{ xo.chats.list.length }}
    tbody
      tr(v-for="yo in group_calcs", :key="yo.id")
        th
          btn(@input="tap", :value="value", :as="yo.phases.pluck('id')")
            | {{ yo.id }}
            sup {{ yo.chats.list.length }}

        td(v-for="xo in handle_calcs")
          check(v-for="o in phase_at(xo.id, yo.id)" @input="tap", :value="value", :as="o.id", :key="o.id")
            | {{ o.chats.list.length }}

</template>
