{ Model, Query, Rule } = require "memory-orm"

new Rule("chat").schema ->
  @path "folder", "book", "part", "phase"
  @belongs_to "section"
  @belongs_to "potof"

  @scope (all)->
    ankers: (book_id, a)->
      ids = a.map (idx)-> book_id + idx
      all.where(_id: ids).sort("write_at", "desc")

    sow_cite: (a)->
      b = a.split('-')
      b[3] = 'AIM' if 'TS' == b[3]
      c = a.split('-')
      c[2]-- if c[2]
      all.find a, b.join('-'), c.join('-')

    now: (hides, words, page_by, mode, part_id)->
      all
      .partition "#{part_id}.#{mode}.set"
      .where (o)-> !(o.potof_id in hides)
      .search words
      .page page_by

  anker =
    belongs_to: 'chats'
    sort: ["count", "desc"]

  @deploy ->
    @mention_ids ?= []
    @q =
      group: [@potof_id, @phase_id].join('+')
      search_words: @log

  class @model extends @model
    make_ankers: (...ids)->
      { book_id } = @
      ids.push @id
      ids = Array.from new Set ids
      [ book_id
        ids.map (id)->
          id[book_id.length ..] 
      ]


    anker: (part_id)->
      { mark, guide } = @phase
      switch
        when ! guide
          ""
        when  mark?
          if part_id == @part_id
            "#{mark}#{@idx}"
          else
            "#{mark}#{@part.idx}:#{@idx}"
        else
          if part_id == @part_id
            @id[ @part_id.length ..]
          else
            @id[ @book_id.length ..]

    @map_partition: (o, emit)->
      { part_id } = o
      it =
        set: o.id
        max: o.write_at + 1
        min: o.write_at

      emit it
      emit part_id, "wiki", it

      return unless o.phase
      { group, handle } = o.phase
      emit "group",  part_id, group,  it
      emit "handle", part_id, handle, it

      if   'M'.includes group
        emit part_id, "memo", it

      if 'SAI'.includes group
        emit part_id, "full", it

        if ['SSAY', 'VSSAY', 'MAKER', 'ADMIN', 'public'].includes handle
          emit part_id, "normal", it

        if ['TSAY', 'private'].includes handle
          emit part_id, "solo", it

        if ! ['SSAY', 'VSSAY', 'MAKER', 'ADMIN', 'dark', 'GSAY', 'TSAY', 'public'].includes handle
          emit part_id, "extra", it

        if ['GSAY'].includes handle
          emit part_id, "rest", it

    @map_reduce: (o, emit)->
      emit "last", o.q.group,
        max: o.write_at

      emit "say",
        max: o.write_at + 1
        min: o.write_at
        count: 1
        all: o.log.length

      if o.phase_id.match(/-[SGV]S?$/)
        all = o.phase_id.split("-")
        all[2] = 'top'
        all_phase_id = all.join("-")
        emit "potof", all_phase_id, o.potof_id,
          count: 1
          all: o.log.length
          max: o.write_at + 1
          min: o.write_at
        emit "potof", o.phase_id, o.potof_id,
          count: 1
          all: o.log.length
          max: o.write_at + 1
          min: o.write_at

      if o.phase_id.match(/-.M?$/)
        emit "side", o.phase_id, o.potof_id,
          max: o.write_at + 1

      for mention_id in o.mention_ids
        emit "mention", mention_id,
          count: 1
        
        emit "mention_to", mention_id, o.id,
          count: 1

    @order: (o, emit)->
      emit "last",
        pluck: "max_is"
        sort: [["max_is.phase.id", "max_is.write_at"], ["desc", "desc"]]
        page: true
      emit "list",
        sort: ["write_at", "asc"]
        page: true
      emit "mention", anker
      for mention_id in o.mention_ids
        emit "mention_to", mention_id, anker
