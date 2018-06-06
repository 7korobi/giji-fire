{ Query } = require "~/plugins/memory-record"
{ vuex_value } = require '~/plugins/vuex-helper'
el = require "~/plugins/dom"
markdown = require "~/plugins/markdown"

targets =
  sow:  'g-sow'
  head: 'g-sow'
  mono: 'g-sow'
  dagre: 'g-dagre'
  giji:   'g-marked'
  center: 'g-marked'
  mermaid: 'g-sow'


module.exports = ->
  props:
    current: Object

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
    input: ({ target })->
      { type, value } = target.attributes
      if type && type.value == 'checkbox'
        @$emit "check", target.checked

    click: ({ target })->
      { cite, href, chk, src, alt } = target.attributes
      if cite
        a = cite.value
        b = a.split('-')
        b[3] = 'AIM' if 'TS' == b[3]
        c = a.split('-')
        c[2]-- if c[2]
        chat = Query.chats.find a, b.join('-'), c.join('-')
        if chat
          { book_id } = chat
          ids = Array.from new Set [@id, chat.id]
          @$emit "anker", book_id, ids.map (id)-> id[book_id.length ..]

      if href
        url = href.value
        check = chk?.value
        if check == "confirm" && confirm "open?\n#{url}"
          open url, "_blank"

  computed: {
    ...vuex_value 'menu.side',['shows']
    el_adjust: el.adjust

    full: ->
      false
      # @current?.id == @chat?.id

    anker: ->
      if chat = @chat
        console.log chat unless chat.phase
        { mark, guide } = chat.phase
        switch
          when ! guide
            ""
          when  mark?
            if (current = @current) && current.part_id == chat.part_id
              "#{mark}#{chat.idx}"
            else
              "#{mark}#{chat.part.idx}:#{chat.idx}"
          else
            if (current = @current) && current.part_id == chat.part_id
              chat.id[ chat.part_id.length ..]
            else
              chat.id[ chat.book_id.length ..]

    chat: ->
      if @id
        Query.chats.find @id

    classname: ->
      { id } = @
      if id && "focus" == @el_adjust
        @$emit "focus", id
      [@handle, @el_adjust]

    deco_target: ->
      targets[@deco]

    log_html: ->
      text = @log
      markdown[@deco] @, (html)-> text = html
      text
  }
