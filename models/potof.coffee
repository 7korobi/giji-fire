
{ Set, Model, Query, Rule } = require 'memory-orm'

new Rule("potof").schema ->
  @path "folder", "book"
  @belongs_to "part"
  @belongs_to "face"
  @belongs_to "winner"
  @has_many "cards"
  @has_many "stats"
  @has_many "chats"
  @has_many "icons"
  @habtm "roles"
  @habtm "ables"

  @scope (all)->
    by_face: ( book_id, face_id )->
      all.where({ face_id, book_id })

    cast: (book_id)->
      sort = (o)-> o.say("#{book_id}-top").all
      Query.books.find(book_id)
      .potofs
      .where (o)-> 'leave' != o.live
      .sort(sort, "desc")

    catalog: (book_id, part_id, sort, order)->
      [a1, a2] = sort.split(".")
      if "say" == a1
        sort = (o)-> o.say(part_id)[a2]
      Query.books.find(book_id)
      .potofs
      .sort(sort, order)

    sow_id: ( book_id, face_id, sign, is_merge )->
      { list } = all.by_face book_id, face_id
      for o in list when o.sign == sign
        return o.id
      if is_merge
        for o in list when o.cards.list.length
          return o.id
      null

  @deploy ->
    role_id_set = {}
    able_id_set = {}
    for card in @cards.list when card.role
      role_id_set[card.role_id] = true
      switch card.idx
        when "request"
          delete role_id_set[card.role_id]

      for { _id } in card.role.ables.list
        able_id_set[_id] = true
    @role_ids = Object.keys role_id_set
    @able_ids = Object.keys able_id_set

    if @live
      @live.date ?= Infinity

  @property 'model',
    role_labels:
      get: ->
        for o in @roles.list when "LIVE" != o.group
          stat = @stats.find("#{@_id}-#{o._id}")
          head = stat?.label ? ""
          "#{head}#{o.label}"
    win:
      get: ->
        return "" if ["suddendead", "leave"].includes @live?.role_id
        return ""　unless @
        if @book?.winner_id
          if @book.winner_id == @winner_id
            "勝利"
          else
            "敗北"
        else
          "参加"

    live:
      get: ->
        @cards.find("#{@_id}-live")

    request:
      get: ->
        @cards.find("#{@_id}-request")

    commit:
      get: ->
        @stats.find("#{@_id}-commit")

    give:
      get: ->
        @stats.find("#{@_id}-give")

    winner_id:
      get: ->
        @find(@cards, ["bond", "gift", "role", "live"], (o)-> o.role.win ) ? "NONE"

    head:
      get: ->
        if @face?
          { name } = @face
        [
          @job
          @name || name
        ].join(" ")

    icon_mdi:
      get: ->
        @icons.list[0]?.mdi

  @order "list", sort: ['write_at', 'desc']
  class @model extends @model
    side: (part_id)->
      for idx in ["SM", "S", "GM", "G", "VM", "V"] when o = @book.chats.reduce.side?["#{part_id}-#{idx}"]?[@id]
        return o
      max_is: {}
    say: (part_id)->
      for idx in ["SS", "S", "GS", "G", "VS", "V"] when o = @book.chats.reduce.potof?["#{part_id}-#{idx}"]?[@id]
        return o
      count: 0
      all:   0
      max: null
      min: null

    say_handle: (part_id)->
      { max_is } = @say(part_id)
      max_is?.phase?.handle ? "TSAY"
    
    find: (q, keys, cb = (o)-> o )->
      for key in keys
        o = q.find("#{@_id}-#{key}")
        continue unless o
        o = cb o
        continue unless o
        return o

