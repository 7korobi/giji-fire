
{ Set, Model, Query, Rule } = require "~/plugins/memory-record"

new Rule("potof").schema ->
  @order "write_at"
  @path "folder", "book", "part"
  @belongs_to "face"
  @belongs_to "winner"
  @has_many "cards"
  @has_many "stats"
  @has_many "chats"
  @habtm "roles"
  @habtm "ables"

  @scope (all)->
    catalog: (book_id, part_id, sort, order)->
      [a1, a2] = sort.split(".")
      if "say" == a1
        sort = (o)-> o.say(part_id)[a2]
      Query.books.find(book_id).potofs.sort(sort, order)


  @deploy ->
    if @face?
      { job, name } = @face

    @head = [
      @job  || job
      @name || name
    ].join(" ")

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

    @role_labels = @roles.list.map (o)=>
      stat = @stats.find("#{@_id}-#{o._id}")
      head = stat?.label ? ""
      "#{head}#{o.label}"

    @live    = @cards.find("#{@_id}-live") ?
    @request = @cards.find("#{@_id}-request")
    @commit  = @stats.find("#{@_id}-commit")
    @give    = @stats.find("#{@_id}-give")

    @winner_id = @find @cards, ["bond", "gift", "role", "live"], (o)-> o.role.win

    if @live
      @live_class = @live.role_id
      @live.date ?= Infinity
      switch @live.role_id
        when "suddendead", "leave"
          @win = ""
        else
          if @book?.winner_id
            if @book.winner_id == @winner_id
              @win = "勝利"
            else
              @win = "敗北"
          else
            @win = "参加"

    @winner_id ?=  "NONE"

  class @model extends @model
    say: (part_id)->
      for idx in ["SS", "GS", "VS"] when o = @book.chats.reduce.potof["#{part_id}-#{idx}"]?[@id]
        return o
      count: 0
      all:   0
      max: null
      min: null

    say_id: (part_id)->
      { max_is } = @say(part_id)
      max_is?.phase?.handle ? "TSAY"
    
    find: (q, keys, cb = (o)-> o )->
      for key in keys
        o = q.find("#{@_id}-#{key}")
        continue unless o
        o = cb o
        continue unless o
        return o

    @map_reduce: (o, emit)->

    @order: (o, emit)->
