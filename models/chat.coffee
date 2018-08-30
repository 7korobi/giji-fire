{ Model, Query, Rule } = require "~/plugins/memory-record"

new Rule("chat").schema ->
  @path "folder", "book", "part", "phase"
  @belongs_to "section"
  @belongs_to "potof"

  blank = []
  blank.all = 0
  pages = (group, q)-> (hides, words, part_id)->
    q
    .where (o)-> part_id == o.part_id && !(o.potof_id in hides) && o.phase.group in group
    .search words
  @scope (all)->
    wiki: (hides, words, part_id)->
      all
      .where (o)-> part_id == o.part_id && !(o.potof_id in hides)
      .search words
    memo:   pages 'M',   all

    full:   pages 'SAI', all
    normal: pages 'SAI', all.where (o)-> o.phase.handle in ['SSAY', 'VSSAY', 'MAKER', 'ADMIN', 'public']

    solo:   pages 'SAI', all.where (o)-> o.phase.handle in ['TSAY', 'private']
    extra:  pages 'SAI', all.where (o)-> ! (o.phase.handle in ['SSAY', 'VSSAY', 'MAKER', 'ADMIN', 'dark', 'GSAY', 'TSAY', 'public'])
    rest:   pages 'SAI', all.where (o)-> o.phase.handle in ['GSAY']

    ankers: (book_id, a)->
      ids = a.map (idx)-> book_id + idx
      all.where(_id: ids).sort("write_at", "desc")

    sow_cite: (a)->
      b = a.split('-')
      b[3] = 'AIM' if 'TS' == b[3]
      c = a.split('-')
      c[2]-- if c[2]
      all.find a, b.join('-'), c.join('-')

    now: (...args)->
      memo:   (part_id)-> all.memo(  ...args, part_id).reduce?.last ? blank
      memos:  (part_id)-> all.memo(  ...args, part_id).reduce?.list ? blank
      full:   (part_id)-> all.full(  ...args, part_id).reduce?.list ? blank
      normal: (part_id)-> all.normal(...args, part_id).reduce?.list ? blank
      solo:   (part_id)-> all.solo(  ...args, part_id).reduce?.list ? blank
      extra:  (part_id)-> all.extra( ...args, part_id).reduce?.list ? blank
      rest:   (part_id)-> all.rest(  ...args, part_id).reduce?.list ? blank
      wiki:   (part_id)-> all.wiki(  ...args, part_id).reduce?.list ? blank

  anker =
    belongs_to: 'chats'
    sort: ["count", "desc"]

  @deploy ->
    @mention_ids ?= []
    @q =
      group: [@potof_id, @phase_id].join('+')
      search_words: @log

  class @model extends @model
    @page_by = 30

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
        page_by: @page_by
      emit "list",
        sort: ["write_at", "asc"]
        page_by: @page_by
      emit "mention", anker
      for mention_id in o.mention_ids
        emit "mention_to", mention_id, anker
