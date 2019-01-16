<script lang="coffee">
{ Query } = require "memory-orm"

module.exports =
  functional: true
  props:
    id:
      type: String
      required: true
    show: String
    current: Object
    edit:
      type: Boolean
      default: false

  render: (m, ctx)->
    { id, show, current, edit } = ctx.props

    chat = Query.chats.find id
    return [] unless chat

    if o = chat.phase
      { handle } = o

    if o = chat.potof
      if o.hide
        show = "hide"
      { face_id, head, sign } = o
    
    key = id
    { face_id = face_id, show = show, handle = handle, head = head,
      write_at, deco, log, to
    } = chat
    if edit
      log = ""

    attrs = { edit, current, show, id, face_id, write_at, sign, handle, deco, head, log, to }
    m "c-" + attrs.show, { attrs, key, on: ctx.data.on }, ctx.children
</script>