<script lang="coffee">
{ Query } = require "~/plugins/memory-record"
_ = require "lodash"

module.exports =
  parent:
    props:
      value:
        default: -> "all"

    methods:
      find_tag: (tag_id)->
        Query.tags.find tag_id

      faces: (tag_id)->
        Query.faces.tag tag_id

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

