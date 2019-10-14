<template lang="pug">
p.form
  span.tag(v-for="(group, idx) in tag_groups" v-if="group" :key="group.set[0]")
    tag(v-for="o in group.list" v-bind="o" :key="o.id")
</template>

<script lang="coffee">
{ Query } = require 'memory-orm'
_ = require "lodash"

module.exports =
  props:
    tag_ids:
      default: -> Query.tags.pluck "id"
    value:
      default: -> "all"

  computed:
    tag_groups: ->
      Query.tags.where(id: @tag_ids).reduce.group

  components:
    tag:
      functional: true
      props:
        id:
          required: true
          type: String
        label: String
        faces: Object

      render: (m, ctx)->
        p = ctx.parent

        { id, label = "- 全体 -", faces } = ctx.props
        { list } = faces

        attr =
          key: id
          props:
            as: id
            value: p.value
          on: p.$listeners

        if list.length
          m "btn", attr, [
            label
            m "sup", list.length
          ]


</script>
