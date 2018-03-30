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
    memo:   pages 'M',   all
    title:  pages 'SAI', all.where (o)-> o.phase.handle in ['MAKER', 'ADMIN', 'public']

    full:   pages 'SAI', all
    normal: pages 'SAI', all.where (o)-> o.phase.handle in ['SSAY', 'VSSAY', 'MAKER', 'ADMIN', 'public', 'private']

    solo:   pages 'SAI', all.where (o)-> o.phase.handle in ['TSAY', 'private']
    extra:  pages 'SAI', all.where (o)-> ! (o.phase.handle in ['SSAY', 'VSSAY', 'MAKER', 'ADMIN', 'dark', 'GSAY', 'TSAY', 'public'])
    rest:   pages 'SAI', all.where (o)-> o.phase.handle in ['GSAY']

    ankers: (book_id, a)->
      ids = a.map (idx)-> book_id + idx
      all.where(_id: ids).sort("write_at", "desc")

    now: (hides)->
      memo:   (part_id)-> all.memo(  hides, part_id).reduce.last ? blank
      memos:  (part_id)-> all.memo(  hides, part_id).reduce.list ? blank
      title:  (part_id)-> all.title( hides, part_id).reduce.list ? blank
      full:   (part_id)-> all.full(  hides, part_id).reduce.list ? blank
      normal: (part_id)-> all.normal(hides, part_id).reduce.list ? blank
      solo:   (part_id)-> all.solo(  hides, part_id).reduce.list ? blank
      extra:  (part_id)-> all.extra( hides, part_id).reduce.list ? blank
      rest:   (part_id)-> all.rest(  hides, part_id).reduce.list ? blank

  anker =
    belongs_to: 'chats'
    sort: ["count", "desc"]

  @deploy ->
    @q =
      mention_ids: []
    @log = @log.replace ///<mw\ +(..)(\d+),(\d+),(.+?)>///g, (str, phase_idx, $1, part_idx, code)=>
      if phase_idx == 'MM'
        phase_idx = @phase_id[-2..][0] + 'M'
      idx = Number($1)
      @q.mention_ids.push mention_id = [@book_id, part_idx, phase_idx, idx].join("-")
      """<q cite="#{mention_id}">»#{code}</q>"""

  class @model extends @model
    @map_reduce: (o, emit)->
      emit "last", [o.potof_id, o.phase_id].join('+'),
        max: o.write_at

      emit "say",
        max: o.write_at
        min: o.write_at
        count: 1
        all: o.log.length

      if o.phase_id.match(/-[SGV]S$/)
        emit "potof", o.phase_id, o.potof_id,
          count: 1
          all: o.log.length
          max: o.write_at
          min: o.write_at

      for mention_id in o.q.mention_ids
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
      for mention_id in o.q.mention_ids
        emit "mention_to", mention_id, anker
