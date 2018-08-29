{ State, Model, Query, Rule, Set, Finder } = require "~/plugins/memory-record"
{ nation } = require "../yaml/rule.yml"
{ caches } = require("~/plugins/get-by-mount")
{ url } = require "~/config/live.yml"
_ = require "lodash"

attrs =
  TITLE:  { mark:  '', label: '表題' }
  public:  {           label: '活動' }
  private: {           label: '秘密' }
  SSAY:   { mark:  '', label: '会話' }
  TSAY:   { mark: '-', label: '独言' }
  AIM:    { mark: '-', label: '内緒' }
  MAKER:  { mark: '#', label: '村建' }
  ADMIN:  { mark: '%', label: '管理' }
  VSSAY:  { mark: '@', label: '見物' }
  VGSAY:  { mark: '@', label: '見物' }
  MSAY:   { mark:  '', label: '会話' }
  WSAY:   { mark: '*', label: '人狼' }
  GSAY:   { mark: '+', label: '墓下' }
  PSAY:   { mark: '=', label: '共鳴' }
  XSAY:   { mark: '!', label: '念波' }
phase_attr = (self)->
  if o = attrs[self.handle]
    Object.assign self, o
  self

module.exports =
  namespaced: true
  state: -> {}

  mutations:
    story: (state,{ data })->
      book_id = data.stories[0]._id
      potof_idx = 0
      for o, idx in data.potofs
        csid = o.csid
        csid = 'sf' if csid == 'SF'
        potof_idx = idx
        potof_id = "#{o.story_id}-#{potof_idx}"
        Set.stat.add
          _id: "#{o.event_id}"

        if Query.roles.find o.live
          date = o.deathday
          date = undefined unless 0 < o.deathday
          Set.card.add
            _id: "#{potof_id}-live"
            role_id: o.live
            date: date

        if Query.roles.find o.select
          Set.card.add
            _id: "#{potof_id}-request"
            role_id: o.select

        if Query.roles.find o.role[0]
          Set.card.add
            _id: "#{potof_id}-role"
            role_id: o.role[0]

        if Query.roles.find o.role[1]
          Set.card.add
            _id: "#{potof_id}-gift"
            role_id: o.role[1]

        Set.stat.merge [
          _id: "#{potof_id}-give"
          give: o.point.actaddpt
        ]
        if o.live == "live"
          Set.stat.add
            _id: "#{potof_id}-commit"
            sw: true

        if o.zapcount
          job = ["IR", "R", "O", "Y", "G", "B", "I", "V", "UV"][o.clearance] + "-"
        else
          job = Query.chr_jobs.find("#{csid}_#{o.face_id}")?.job

        Set.potof.add
          _id:       potof_id
          part_id: o.event_id
          job:            job
          pno:          o.pno
          face_id:  o.face_id
          sign: o.sow_auth_id

      potofs = Query.potofs
      .where { book_id }
      .sort "live.date", "desc"

      phases =
        "#{book_id}-top-mA": phase_attr
          handle: "MAKER"
          group:  "A"
          update: false
          guide:  false
        "#{book_id}-top-mS": phase_attr
          handle: "TITLE"
          group:  "A"
          update: false
          guide:  true


      write_at = 0

      data.messages.map (o)->
        o.name = o.name.replace /&#x([0-9A-F]+);/g, (str, code)-> String.fromCharCode parseInt code, 16
          
        { face_id, to, log, date, csid } = o
        write_at = new Date(date) - 0
        csid = 'sf' if csid == 'SF'
        face_id = undefined if face_id in ["maker", "admin", "c06"]
        o.event_id ?= o._id.split("-")[0..2].join("-")
        if "*CAST*" == log
          phase_id = "#{o.event_id}-mS"
          list =
            for [ sign, job, name, live ] in potofs.pluck('sign', 'job', 'face.name', 'live.role_id') when 'leave' != live
              "| #{job} | #{name} | … | #{sign} |"
          log = """
            |   |   |   |   |
            |--:|:--|:-:|:-:|
            #{ list.join("\n") }
          """
          phases[phase_id] ?= phase_attr
            handle: 'TITLE'
            group:  'A'
            update: false
            guide:  true
          Set.chat.add
            _id: phase_id + "-CAST"
            phase_id: phase_id
            write_at: write_at
            show: "report"
            deco: "giji"
            log: log
          return

        guide = true
        handle = o.mestype
        phase_group = o.subid
        phase_type = o.subid + o.mestype
        phase_idx = o.logid[0..1]
        idx = Number o.logid[2..-1]
        if o.story_id && face_id
          potof_id = Query.potofs.where(sign: o.sow_auth_id, face_id: face_id, book_id: o.story_id).list[0]?.id
          unless potof_id
            potof_idx += 1
            Set.card.add
              _id: [o.story_id, potof_idx, "live"].join("-")
              role_id: "leave"
              date: 0
            Set.stat.add
              _id: [o.story_id, potof_idx, "SSAY"].join("-")
              said: 0
            Set.potof.add
              _id: [o.story_id, potof_idx].join("-")
              face_id:  o.face_id
              job: Query.chr_jobs.find([csid, o.face_id].join("_"))?.job
              sign: o.sow_auth_id
              pno:  ""
            

        switch o.logid[0..1]
          when "-S"
            phase_idx  = "iI"
            phase_group = "I"

        switch o.subid
          when "M"
            show = "report"
          when "S"
            switch o.logid[0..1]
              when "II"
                show = "post"
              else
                show = "talk"
          when "I"
            potof_id = undefined
            if log?.match(///。|、///g)?.length > 3
              show = "report"
            else
              show = "post"
            guide = false
          when "A", "B"
            potof_id = undefined
            show = "post"
            log = o.name + "は、" + log
            guide = false

        switch handle
          when "DELETED"
            return
          when "MAKER", "ADMIN"
            potof_id = undefined
            show = "report" if show == "talk"
          when "INFONOM"
            handle = "public"
          when "INFOSP"
            handle = "private"
          when "INFOWOLF"
            handle = "WSAY"
          when "VSAY"
            handle = "VSSAY"
          when "BSAY"
            handle = "XSAY"
          when "SPSAY"
            handle = "PSAY"
          when "SAY"
            handle = "SSAY"
        if to
          phase_idx = "AIM"
          handle = "AIM"

        mention_ids = []
        if log
          log = log.replace ///<mw\ +(..)(\d+),(\d+),(.+?)>///g, (str, _phase_idx, $1, _part_idx, _code)=>
            if _phase_idx == 'MM'
              _phase_idx = phase_idx[-2..][0] + 'M'
            _idx = Number($1)
            mention_ids.push _mention_id = [book_id, _part_idx, _phase_idx, _idx].join("-")
            """<q cite="#{_mention_id}"><b>&gt;&gt;</b>#{_code}</q>"""
        else
          log = "メモをはがした。"
          show = "post"

        phase_id = "#{o.event_id}-#{phase_idx}"
        _id = "#{phase_id}-#{idx}"
        deco = o.style ? "sow"
        head = potof_id && o.name

        phases[phase_id] ?= phase_attr
          handle: handle
          guide: guide
          type:  phase_type
          group: phase_group
          update: false
        Set.chat.add { _id, potof_id, write_at, to, show, deco, log, head, handle, mention_ids }
        o

      Set.phase.merge phases

      Set.part.merge data.events.map (o)->
        _id: o._id
        label: o.name ? "#{o.turn}日目"

      o = data.stories[0]
      sign = o.sow_auth_id.replace(/\./g, '&#2e')
      [[chat_head, ...], ..., [..., chat_foot]] = chats = Query.chats.where(book_id: o._id).list

      Set.book.add
        _id: o._id
        label: o.name
        winner_id: data.events[-1..][0].winner?[4..]
        potof_size: potofs.list.length
        sign: sign
        write_at: chat_head.write_at - 4

      [welcome = "", v_rules] = o.comment.split(/■村のルール<br>/)

      Set.part.add
        _id: o._id + "-top"
        label: "📖タイトル"

      Set.chat.add
        _id: o._id + "-top-mS-title"
        phase_id: o._id + "-top-mS"
        write_at: chat_head.write_at - 4
        show: "report"
        deco: "center"
        sign: sign
        head: "#{ o.folder }-#{ o.vid } by #{ sign }"
        log: """

          ## #{o.name}


        """

      Set.chat.add
        _id: o._id + "-top-mS-welcome"
        phase_id: o._id + "-top-mS"
        write_at: chat_head.write_at - 3
        show: "report"
        deco: "head"
        sign: sign
        log: welcome

      if v_rules
        Set.chat.add
          _id: o._id + "-top-mS-vrule"
          phase_id: o._id + "-top-mS"
          write_at: chat_head.write_at - 2
          show: "report"
          deco: "giji"
          sign: sign
          log: """
            ### 村のルール
            #{v_rules.split("<br>").join("\n")}
          """

      n_rules = for {head}, idx in nation.list
        "#{idx + 1}. #{head}"
      Set.chat.add
        _id: o._id + "-top-mS-nrule"
        phase_id: o._id + "-top-mS"
        write_at: chat_head.write_at - 1
        show: "report"
        deco: "giji"
        sign: sign
        log: """
          ### 国のルール
          #{n_rules.join("\n")}
        """

    progress: (state,{ data })->
      Set.sow_turn.merge    data.events
      Set.sow_village.merge data.stories

    oldlog: (state,{ data })->
      Set.sow_village.merge data.stories
      console.log { data } unless data.faces
      for { _id, story_ids } in data.faces
        for story_id in story_ids when vil = Query.sow_villages.find story_id
          vil.aggregate.face_ids.push _id.face_id
      Finder.sow_village.clear_cache()

  actions: {
    ...caches "1h",
      progress:  -> "#{url.api}/story/progress"
      oldlog:    -> "#{url.store}/sow/index.json"
    ...caches "30d",
      story: (id)-> "#{url.store}/sow/#{id}.json"
  }
