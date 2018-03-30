{ State, Model, Query, Rule, Set } = Mem = require "~/plugins/memory-record"
{ nation } = require "../yaml/rule.yml"
{ url } = require "~/config/live.yml"
_ = require "lodash"

module.exports =
  namespaced: true
  state: -> {}

  mutations:
    join: (state, data)->
      book_id = data.stories[0]._id
      potof_idx = 0
      for o, idx in data.potofs
        csid = o.csid
        csid = 'sf' if csid == 'SF'
        potof_idx = idx
        potof_id = "#{o.event_id}-#{potof_idx}"
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
          job:            job
          pno:          o.pno
          face_id:  o.face_id
          sign: o.sow_auth_id

      phases =
        "#{book_id}-0-mA":
          handle: "MAKER"
          group:  "A"
          update: false
        "#{book_id}-0-mS":
          handle: "MAKER"
          group:  "A"
          update: false

      write_at = 0

      data.messages.map (o)->
        { face_id, to, log, date, csid } = o
        write_at = new Date(date) - 0
        csid = 'sf' if csid == 'SF'
        face_id = undefined if face_id in ["maker", "admin", "c06"]
        o.event_id ?= o._id.split("-")[0..2].join("-")
        return if "*CAST*" == log

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
              _id: [o.event_id, potof_idx, "live"].join("-")
              role_id: "leave"
              date: 0
            Set.stat.add
              _id: [o.event_id, potof_idx, "SSAY"].join("-")
              said: 0
            Set.potof.add
              _id: [o.event_id, potof_idx].join("-")
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
            show = "talk"
          when "I"
            potof_id = undefined
            if log?.match(///。|、///g)?.length > 3
              show = "report"
            else
              show = "post"
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
          when "SAY"
            handle = "SSAY"
        if to
          phase_idx = "AIM"
          handle = "AIM"

        unless log
          log = "メモをはがした。"
          show = "post"

        phase_id = "#{o.event_id}-#{phase_idx}"
        _id = "#{phase_id}-#{idx}"
        deco = o.style ? "sow"
        head = potof_id && o.name

        phases[phase_id] ?=
          handle: handle
          guide: guide
          type:  phase_type
          group: phase_group
          update: false
        Set.chat.add { _id, potof_id, phase_id, write_at, to, show, deco, log, head, handle }
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
        potof_size: Query.potofs.where({book_id}).list.length
        sign: sign
        write_at: chat_head.write_at - 4

      [welcome = "", v_rules] = o.comment.split(/■村のルール<br>/)

      Set.chat.add
        _id: o._id + "-0-mS-welcome"
        phase_id: o._id + "-0-mS"
        write_at: chat_head.write_at - 3
        handle: "MAKER"
        show: "report"
        deco: "head"
        sign: sign
        head: "#{o.vid}: #{o.name}"
        log: welcome

      if v_rules
        Set.chat.add
          _id: o._id + "-0-mS-vrule"
          phase_id: o._id + "-0-mS"
          write_at: chat_head.write_at - 2
          handle: "MAKER"
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
        _id: o._id + "-0-mS-nrule"
        phase_id: o._id + "-0-mS"
        write_at: chat_head.write_at - 1
        handle: "MAKER"
        show: "report"
        deco: "giji"
        sign: sign
        log: """
          ### 国のルール
          #{n_rules.join("\n")}
        """

  actions:
    story: ({ state, commit, rootState }, story_id)->
      res = await fetch "#{url.store}/sow/#{story_id}.json"
      commit "join", await res.json()
