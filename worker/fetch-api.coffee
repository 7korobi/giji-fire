require "../models/index"
{ State, Model, Query, Rule, Set, Finder } = require 'memory-orm'
{ nation } = require "../yaml/rule.yml"


titles =
  SS: ["SSAY",  "通常の発言"]
  SA: ["SSAY",  "通常ACT"]
  VS: ["VSSAY", "見物人発言"]
  VA: ["VSSAY", "見物人のACT"]
  TS: ["TSAY",  "独り言/内緒話"]
  TA: ["TSAY",  "栞"]
  GS: ["GSAY",  "墓下の発言"]
  GA: ["GSAY",  "墓下のACT"]
  PS: ["PSAY",  "共鳴の会話"]
  PA: ["PSAY",  "共鳴のACT"]
  WS: ["WSAY",  "人狼のささやき"]
  WA: ["WSAY",  "人狼のACT"]
  XS: ["XSAY",  "念話（念波の民）"]
  XA: ["XSAY",  "念act（念波の民）"]
  BS: ["XSAY",  "念話（蝙蝠人間）"]
  BA: ["XSAY",  "念act（蝙蝠人間）"]


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
  fetch: (url, cb)->
    res = await fetch url
    data = await res.json()
    State.transaction ->
      cb data

  'aggregate/faces': (url)->
    @fetch url, (data)->
      for o in data.faces when face = Set.face.find o._id.face_id
        face.aggregate.log = o
      for o in data.m_faces when face = Set.face.find o._id.face_id
        face.aggregate.log.date_min = o.date_min
      for o in data.sow_auths when face = Set.face.find o._id.face_id
        face.aggregate.fav = o

  'aggregate/face': (url, id)->
    @fetch url, (data)->
      return unless face = Set.face.find id

      log = data.faces[0]
      log.date_min = data.m_faces[0].date_min

      sum = 0
      lives = _.sortBy data.lives, (o)-> - o.story_ids.length
      lives = for o in lives
        o.role = Query.roles.find(o._id.live, "mob")
        continue if o._id.live == "leave"
        sum += o.story_ids.length
        o
      lives.sum = sum

      sum = 0
      roles = _.sortBy data.roles, (o)-> - o.story_ids.length
      roles = for o in roles
        o.role = Query.roles.find(o._id.role_id, "mob")
        sum += o.story_ids.length
        o
      roles.sum = sum

      sum =
        handle: "dark"
        title: "－合計－"
        per: log.story_ids.length
        all: 0
        max: 0
        count: 0
      mestypes = _.keyBy data.mestypes, '_id.mestype'
      mestypes =
        for loghd, [handle, title] of titles when o = mestypes[loghd]
          sum.all   += o.all
          sum.count += o.count
          sum.max    = o.max if sum.max < o.max
          per = o.story_ids.length
          _.merge { handle, title, per }, o
      mestypes.push sum

      sow_auths = _.sortBy data.sow_auths, (o)-> - o.story_ids.length

      keys = log.story_ids
      .map (key)-> key.split("-")
      .filter (o)-> o[0] and o[1]

      folders = _.groupBy keys, (o)-> o[0]
      for key, list of folders
        folders[key] = _.sortBy list, (o)-> o[1] - 0
        folders[key].nation = Query.folders.find(key.toUpperCase()).nation
      folders = _.sortBy folders, (list, key)-> - list.length

      face.aggregate = { ...face.aggregate, lives, roles, log, sow_auths, folders, mestypes }

  'sow/plan': (url)->
    @fetch url, (data)->
      Set.sow_village_plan.merge data.plans

  'sow/progress': (url)->
    @fetch url, (data)->
      Set.sow_turn.merge    data.events
      Set.sow_village.merge data.stories

  'sow/oldlog': (url)->
    @fetch url, (data)->
      Set.sow_village.merge data.stories
      for { _id, story_ids } in data.faces
        for story_id in story_ids when vil = Set.sow_village.find story_id
          vil.aggregate.face_ids.push _id.face_id

  'sow/story': (url)->
    @fetch url, (data)->
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
          if o.role[0] && o.live != "mob"
            Set.card.add
              _id: "#{potof_id}-live"
              role_id: o.live
              date: date
          else
            Set.card.add
              _id: "#{potof_id}-live"
              role_id: 'leave'
              date: 0

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
            sw: !! o.commit

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
          text: o.history?.replace /<[^>]+>/g, ""

      potofs = Query.potofs
      .where { book_id }
      .sort "live.date", "desc"

      Set.part.add
        _id: book_id + "-top"
        label: "📖タイトル"

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
          Set.phase.add phase_attr
            _id: phase_id
            handle: 'TITLE'
            group:  'A'
            update: false
            guide:  true
          Set.chat.add
            _id: phase_id + "-CAST"
            phase_id: phase_id
            write_at: write_at
            show: "report"
            deco: "cast"
            log: log
          return

        guide = true
        handle = o.mestype
        phase_group = o.subid
        phase_type = o.subid + o.mestype
        phase_idx = o.logid[0..1]
        idx = Number o.logid[2..-1]
        if o.story_id && face_id
          potof_id = Query.potofs.sow_id o.story_id, face_id, o.sow_auth_id, o.story_id + "-0" != o.event_id
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
              face_id:  face_id
              job: Query.chr_jobs.find([csid, face_id].join("_"))?.job
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
            """<q class="cite-bottom" cite="#{_mention_id}"><b>&gt;&gt;</b>#{_code}</q>"""
        else
          log = "メモをはがした。"
          show = "post"

        phase_id = "#{o.event_id}-#{phase_idx}"
        _id = "#{phase_id}-#{idx}"
        deco = o.style ? "sow"
        head = potof_id && o.name

        unless Set.phase.find phase_id
          Set.phase.add phase_attr
            _id: phase_id
            handle: handle
            guide: guide
            type:  phase_type
            group: phase_group
            update: false
        Set.chat.add { _id, potof_id, write_at, to, show, deco, log, head, handle, mention_ids }
        o

      o = data.stories[0]
      sign = o.sow_auth_id.replace(/\./g, '&#2e')
      [chat_head, ..., chat_foot] = Query.chats.where({ book_id }).list

      Set.book.add
        _id: book_id
        label: o.name
        winner_id: null # data.events[-1..][0].winner?[4..]
        potof_size: potofs.list.length
        sign: sign
        write_at: chat_head.write_at - 4

      [welcome = "", v_rules] = o.comment.split(/■村のルール<br>/)

      Set.part.merge data.events.map (o)->
        _id: o._id
        label: o.name ? "#{o.turn}日目"

      Set.phase.add phase_attr
        _id: "#{book_id}-top-mA"
        handle: "MAKER"
        group:  "A"
        update: false
        guide:  false

      Set.phase.add phase_attr
        _id: "#{book_id}-top-mS"
        handle: "TITLE"
        group:  "A"
        update: false
        guide:  true

      Set.chat.add
        _id: book_id + "-top-mS-title"
        write_at: chat_head.write_at - 4
        show: "report"
        deco: "center"
        sign: sign
        head: "#{ o.folder }-#{ o.vid } by #{ sign }"
        log: """
          <br>
          <h2>#{o.name}</h2>
          <br>
        """

      Set.chat.add
        _id: book_id + "-top-mS-welcome"
        write_at: chat_head.write_at - 3
        show: "report"
        deco: "head"
        sign: sign
        log: welcome

      if v_rules
        Set.chat.add
          _id: book_id + "-top-mS-vrule"
          write_at: chat_head.write_at - 2
          show: "report"
          deco: "quill"
          sign: sign
          log: """
            <h3>村のルール</h3>#{v_rules}
          """

      n_rules = for {head}, idx in nation.list
        "#{idx + 1}. #{head}"
      Set.chat.add
        _id: book_id + "-top-mS-nrule"
        write_at: chat_head.write_at - 1
        show: "report"
        deco: "quill"
        sign: sign
        log: """
          <h3>国のルール</h3>#{n_rules.join("<br>")}
        """
