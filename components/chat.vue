<script lang="coffee">
{ Query } = require "~/plugins/memory-record"

module.exports =
  functional: true
  props:
    id:
      type: String
      required: true
    show: String
    current: Object

  render: (m, ctx)->
    { id, show, current } = ctx.props
    chat = Query.chats.find id
    return [] unless chat

    key = id
    attrs =
      id: id
      current: current
      show: show ? chat.show

      write_at: chat.write_at
      handle: chat.handle
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

    m "c-" + attrs.show, { attrs, key, on: ctx.data.on }, ctx.children
</script>