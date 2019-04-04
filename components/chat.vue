<script lang="coffee">
{ Query } = require 'memory-orm'

module.exports =
  functional: true
  props:
    id:
      type: String
      required: true
    show: String
    current: Object
    edit: Object

  render: (m, ctx)->
    { id, show, current, edit } = ctx.props

    chat = Query.chats.find id
    return [] unless chat

    if id && edit && id == edit.chat.id
      chat = edit.chat
    else
      edit = undefined

    if o = chat.phase
      { handle } = o

    if o = chat.potof
      if o.hide
        show = "hide"
      { face_id, head, sign } = o
    
    key = id
    { face_id = face_id, show = show, handle = handle, head = head,
      write_at, phase_id, deco, log, to
    } = chat

    attrs = { current, show, id, phase_id, face_id, write_at, sign, handle, deco, head, log, to, edit }
    m "c-" + attrs.show, { attrs, key, on: ctx.data.on }, ctx.children
</script>