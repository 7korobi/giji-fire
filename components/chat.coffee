{ Query } = require "~/plugins/memory-record"
el = require "~/plugins/dom"
markdown = require "~/plugins/markdown"

module.exports = ->
  props:
    id: String
    write_at: [Date, Number]

    sign: String
    head: String
    to: String

    face_id: String
    img_src: String

    handle: String
    deco:
      type: String
      default: "giji"
    log:
      type: String
      default: ""

  methods:
    click: ({ target })->
      { cite, href, chk } = target.attributes
      if cite && chat = Query.chats.find cite.value
        { book_id } = chat
        ids = Array.from new Set [@id, chat.id]
        @$emit "anker", book_id, ids.map (id)-> id[book_id.length ..]
        
      if url = href?.value
        if chk?.value == "confirm" && confirm "open?\n#{url}"
          open url, "_blank"

  computed:
    el_adjust: el.adjust

    full: ->
      ! @$store.state.menu.shows.current

    anker: ->
      if chat = @chat
        console.log chat unless chat.phase
        { mark } = chat.phase
        if mark?
          prefix =
            if (current = @current) && current.part_id == chat.part_id
              ""
            else
              "#{chat.part.idx}:"
          "#{mark}#{prefix}#{chat.idx}"
        else
          ""

    current: ->
      { idx } = @$route.params
      if idx
        Query.chats.find idx
    chat: ->
      if @id
        Query.chats.find @id

    classname: ->
      { id } = @
      if id && "focus" == @el_adjust
        @$emit "focus", id
      [@handle, @el_adjust]

    log_html: ->
      text = @log
      markdown[@deco] @, (html)-> text = html
      text
