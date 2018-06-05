{ Model, Query, Rule } = require "~/plugins/memory-record"

new Rule("chat").schema ->
  @path "folder", "book", "part", "phase"
  @belongs_to "section"
  @belongs_to "potof"

  blank = []
  blank.all = 0
  pages = (group, q)-> (hides, part_id)->
    q.where (o)-> part_id == o.part_id && !(o.potof_id in hides) && o.phase.group in group
  @scope (all)->
    wiki:   (hides, part_id)-> all.where (o)-> part_id == o.part_id && !(o.potof_id in hides)
    memo:   pages 'M',   all

    full:   pages 'SAI', all
    normal: pages 'SAI', all.where (o)-> o.phase.handle in ['SSAY', 'VSSAY', 'MAKER', 'ADMIN', 'public']

    solo:   pages 'SAI', all.where (o)-> o.phase.handle in ['TSAY', 'private']
    extra:  pages 'SAI', all.where (o)-> ! (o.phase.handle in ['SSAY', 'VSSAY', 'MAKER', 'ADMIN', 'dark', 'GSAY', 'TSAY', 'public'])
    rest:   pages 'SAI', all.where (o)-> o.phase.handle in ['GSAY']

    ankers: (book_id, a)->
      ids = a.map (idx)-> book_id + idx
      all.where(_id: ids).sort("write_at", "desc")

    now: (hides)->
      memo:   (part_id)-> all.memo(  hides, part_id).reduce.last ? blank
      memos:  (part_id)-> all.memo(  hides, part_id).reduce.list ? blank
      full:   (part_id)-> all.full(  hides, part_id).reduce.list ? blank
      normal: (part_id)-> all.normal(hides, part_id).reduce.list ? blank
      solo:   (part_id)-> all.solo(  hides, part_id).reduce.list ? blank
      extra:  (part_id)-> all.extra( hides, part_id).reduce.list ? blank
      rest:   (part_id)-> all.rest(  hides, part_id).reduce.list ? blank

  anker =
    belongs_to: 'chats'
    sort: ["count", "desc"]

  @deploy ->
    @mention_ids ?= []

  class @model extends @model
    @map_reduce: (o, emit)->
      emit "last", [o.potof_id, o.phase_id].join('+'),
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

      for mention_id in o.mention_ids
        emit "mention", mention_id,
          count: 1
        
        emit "mention_to", mention_id, o.id,
          count: 1

    @order: (o, emit)->
      emit "last",
        pluck: "max_is"
        sort: ["max_is.write_at", "desc"]
        page_by: 25
      emit "list",
        sort: ["write_at", "asc"]
        page_by: 25
      emit "mention", anker
      for mention_id in o.mention_ids
        emit "mention_to", mention_id, anker
