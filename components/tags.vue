<template lang="pug">
p.form
  span.tag
    tag#all
    tag#giji
    tag#travel
    tag#shoji
    tag#stratos
    tag#myth
    tag#fable
    tag#asia
    tag#marchen

  span.tag
    tag#animal
    tag#school

  span.tag
    tag#pair

  span.tag
    tag#kid
    tag#young
    tag#middle
    tag#elder

  span.tag
    tag#river
    tag#road
    tag#immoral

  span.tag
    tag#guild
    tag#elegant
    tag#ecclesia

  span.tag
    tag#medical
    tag#market

  span.tag
    tag#apartment
    tag#servant
    tag#farm
    tag#government

  span.tag
    tag#god
</template>

<script lang="coffee">
{ Query } = require 'memory-orm'
_ = require "lodash"

module.exports =
  props:
    value:
      default: -> "all"

  methods:
    find_tag: (tag_id)->
      Query.tags.find tag_id

    faces: (tag_id)->
      Query.faces.tag tag_id

  components:
    tag:
      functional: true
      props:
        id:
          required: true

      render: (m, ctx)->
        p = ctx.parent
        # p.query
        { id } = ctx.props
        { list } = p.faces id
        { label = "- 全体 -" } = p.find_tag id

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
