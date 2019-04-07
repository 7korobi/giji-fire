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
    { face_id = face_id, handle = handle, show = show, head = head,
      write_at, log, deco, to, phase_id, data
    } = chat

    attrs = { id, face_id, handle, log, show, head, deco, to, phase_id, current, data, edit }
    m "c-" + attrs.show, { attrs, key, on: ctx.data.on }, ctx.children
</script>
