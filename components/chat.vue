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

    target = Query.chats.find id
    return [] unless target

    if id && edit && id == edit.chat.id
      target = edit.chat
    else
      edit = undefined

    if o = target.phase
      { handle } = o
    if o = target.potof
      if o.hide
        show = "hide"
      { face_id, head, sign } = o
    
    key = id
    { face_id = face_id, handle = handle, show = show, head = head,
      write_at, log, deco, to, phase_id, data
    } = target
    attrs = {
      current, target, edit,
      id, face_id, handle, log, data, show, head, deco, to, phase_id }

    m "c-" + attrs.show, { attrs, key, on: ctx.data.on }, ctx.children
</script>
