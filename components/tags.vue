<template lang="pug">
p.form
  span.tag(v-for="group in tag_groups" v-if="group")
    tag(v-for="o in group.list" v-bind="o")
</template>

<script lang="coffee">
{ Query } = require 'memory-orm'
_ = require "lodash"

module.exports =
  props:
    value:
      default: -> "all"

  methods:
    faces: (tag_id)->
      Query.faces.tag tag_id

  computed:
    tag_groups: ->
      Query.tags.reduce.group

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
          on:
            input: (as)->
              p.$emit 'input', as

        if list.length
          m "btn", attr, [
            label
            m "sup", list.length
          ]


</script>
