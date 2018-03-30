<script lang="coffee">
{ Query } = require "~/plugins/memory-record"

module.exports =
  functional: true
  props:
    id:
      type: String
      required: true
    show:
      type: String

  render: (m, ctx)->
    { id, show } = ctx.props
    chat = Query.chats.find id
    return [] unless chat

    key = id
    attrs =
      id: id
      write_at: chat.write_at
      handle: chat.handle
      show: show ? chat.show
      deco: chat.deco
      head: chat.head
      log: chat.log
      to: chat.to

    if o = chat.potof
      if o.hide
        attrs.show = "hide"
      Object.assign attrs,
        face_id: o.face_id
        sign: o.sign

    if o = chat.phase
      Object.assign attrs,
        handle: chat.handle ? o.handle

    m "c-" + attrs.show, { attrs, key, on: ctx.data.on }
</script>