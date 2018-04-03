{ Set, Model, Query, Rule } = Mem = require "~/plugins/memory-record"
{ url } = require "~/config/live.yml"

monthry = new Intl.DateTimeFormat 'ja-JP',
  year:  "numeric"
  month: "2-digit"

yeary = new Intl.DateTimeFormat 'ja-JP',
  year:  "numeric"

new Rule("sow_roletable").schema ->

new Rule("sow_turn").schema ->
  @order "turn", "asc"
  @belongs_to "village", target: "sow_villages", key: "story_id"

new Rule("sow_village").schema ->
  @has_many "turns", target: "sow_turns", key: "story_id"
  @habtm "option_datas", target: "options", key: "options"
  @belongs_to "say",  target: "says",  key: "q.say"
  @belongs_to "mob",  target: "roles", key: "q.mob"
  @belongs_to "game", target: "games", key: "q.game"

  @scope (all)->
    prologue: all.where(mode: "prologue").sort "timer.nextcommitdt", "desc"
    progress: all.where(mode: "progress").sort "timer.nextcommitdt", "desc"

    mode: ( mode )->
      all.where({ mode })
    search: ( mode, query_in, query_where, order, asc )->
      all.where({ mode }).in(query_in).where(query_where).order
        sort: [order, asc]
        page_by: 25

  @deploy ->
    { interval, hour, minute } = @upd
    hour   = "0#{hour}"   if hour   < 10
    minute = "0#{minute}" if minute < 10
    updated_at = new Date @timer.updateddt

    @write_at = updated_at
    @query = Query.sow_villages.where({@id})
    @q =
      sow_auth_id: @sow_auth_id.replace(/\./g, '&#2e')
      folder_id: @folder.toUpperCase()
      size: "x" + @vpl[0]
      say:  @type.say
      mob:  @type.mob
      game: @type.game
      upd_at: "#{hour}:#{minute}"
      upd_range: "#{interval * 24}h"
      yeary: yeary.format updated_at
      monthry: monthry.format updated_at
      rating: @rating

    @q.rating = "default"  if @rating in [null, 0, "0", "null", "view"]
    @q.rating = "alert"    if @rating in ["R15", "r15", "r18"]
    @q.rating = "violence" if @rating in ["gro"]


    list = Query.sow_roletables.find(@type.roletable).role_ids_list?[@q.size]
    @card.config = list if list?.length && ! @card.config.length
    @card.option = @options

    @folder = Query.folders.find @q.folder_id
    if @is_epilogue && @is_finish
      @href = "#{url.store}/stories/#{@_id}"
      @mode = "oldlog"
    else
      if @turns.list[0]
        @mode = "progress"
      else
        @mode = "prologue"
    
    @aggregate =
      face_ids: []

  Object.assign @model_property,
    roles:
      get: ->
        @query.reduce ? []
    event_length:
      get: ->
        @query.reduce.event?.length ? 0

  sort = ['count', 'desc']
  cmd =
    count: 1
  class @model extends @model
    @order: (o, emit)->
      emit "yeary",       { sort: ['id','asc'] }
      emit "monthry",     { sort: ['id','asc'] }
      emit "folder_id",   { sort }
      emit "upd_range",   { sort }
      emit "upd_at",      { sort: ['id','asc'] }
      emit "sow_auth_id", { sort }
      emit "rating",      { sort }
      emit "size",        { sort }
      emit "say",         { sort, belongs_to: "says"    }
      emit "game",        { sort, belongs_to: "games"   }
      emit "mob",         { sort, belongs_to: "roles"   }
      emit "option",      { sort, belongs_to: "options" }
      emit "event",       { sort, belongs_to: "roles"   }
      emit "discard",     { sort, belongs_to: "roles"   }
      emit "config",      { sort, belongs_to: "roles"   }

    @map_reduce: (o, emit)->
      emit "mode", o.mode, o.q.folder_id, cmd
      emit "yeary",       o.q.yeary,       cmd
      emit "monthry",     o.q.monthry,     cmd
      emit "folder_id",   o.q.folder_id,   cmd
      emit "upd_range",   o.q.upd_range,   cmd
      emit "upd_at",      o.q.upd_at,      cmd
      emit "sow_auth_id", o.q.sow_auth_id, cmd
      emit "rating",      o.q.rating,      cmd
      emit "size",        o.q.size,        cmd
      emit "say",         o.q.say,         cmd
      emit "game",        o.q.game,        cmd
      emit "mob",         o.q.mob,         cmd
      for  opt_id in o.card.option
        emit "option", opt_id,   cmd
      for card_id in o.card.event
        emit "event", card_id,   cmd
      for card_id in o.card.discard
        emit "discard", card_id, cmd
      for card_id in o.card.config
        emit "config", card_id,  cmd

new Rule("folder").schema ->
  @scope (all)->
    enable: all.where (o)-> ! o.disabled
    host: (hostname)->
      all.where { hostname }

  @deploy ->
    if o = @config?.cfg
      @rule     = o.RULE
      @title    = o.NAME_HOME
      @max_vils = o.MAX_VILLAGES
      if @max_vils
        @href = @config.cfg.URL_SW + "/sow.cgi"
        [protocol, _, hostname, path_dir...] = @href.split("/")
        @hostname = hostname
        path = "/" + path_dir.join("/")

    switch @folder
      when "LOBBY"
        @max_vils = 0

    return if @disabled = ! path
    @route = { path, name: @_id }

Set.folder.set        require "../yaml/sow_folder.yml"
Set.sow_roletable.set require "../yaml/sow_roletables.yml"

welcome = (h)->
  chats  = {}
  phases = {}
  potofs = {}
  for key, face_id of h
    potofs[key] =
      write_at: 1484445101000
      face_id: face_id
      job:  "ようこそ！"
      name: ""
    phases[key] =
      write_at: 1484445101000
      name: "通常発言"
      handle: "SSAY"
    chats[key + "-1"] =
      write_at: 1169852700003
      potof_id: key
      show: "post"
      style: "plain"
      log: """
  祝！人狼議事１０周年！
"""

  Set.phase.merge phases
  Set.potof.merge potofs
  Set.chat.merge  chats

welcome
  "LOBBY-top-0-0":   "c20"
  "CIEL-top-0-0":    "c24"
  "BRAID-top-0-0":   "c24"
  "PERJURY-top-0-0": "c25"
  "CABALA-top-0-0":  "c78"
  "top-top-0-0":     "t31"

Set.chat.merge
  "LOBBY-top-0-0-2":
    write_at: 1370662886000
    potof_id: "LOBBY-top-0-0"
    show: "talk"
    style: "plain"
    log: """
みなさまの助けになるよう、ロビーを用意いたしました。
相談や困りごと、ちょっとした疑問などをお持ちでしたら、どうぞ、ごゆっくりなさいませ。
"""

  "CIEL-top-0-0-2":
    write_at: 1379511895000
    potof_id: "CIEL-top-0-0"
    show: "talk"
    style: "plain"
    log: """
<b>勝利を求めないRP村や、勝利も追求するRP村</b>用に、このページは調整してあるよ。
早い者勝ちがよいのだけれど、<a href="http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD">企画村予定表</a>という便利なページも見てみましょうね。
"""

  "BRAID-top-0-0-2":
    write_at: 1484445101002
    potof_id: "BRAID-top-0-0"
    show: "talk"
    style: "plain"
    log: """
こちらのページは<b>（陣営勝利を求めない）完全RP村、勝利追求を含むRP村</b>用に調整してあるよ。
早い者勝ちが原則だけれど、<a href="http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD" ng-href="{{link.plan}}">企画村予定表</a>という便利なページも見てみよう。

以下がおおざっぱな、他州との相違点なんだ。
<ul>
<li><a href="sow.cgi?cmd=rule#mind">参加者の心構え</a>。ガチとは違うのだよ。ガチとは。
</li><li><a href="http://crazy-crazy.sakura.ne.jp/giji/?(List)SayCnt">発言ptの量</a>。
</li><li>村の説明は4000字まで記述できます。
</li><li>他、細かい調整が入っています。<a href="http://crazy-crazy.sakura.ne.jp/giji/">仕様変更</a>を参考にしましょう。
</li></ul>
"""

  "PERJURY-top-0-0-2":
    write_at: 1393597313000
    potof_id: "PERJURY-top-0-0"
    show: "talk"
    style: "plain"
    log: """
<b>勝利を求めないRP村や、勝利も追求するRP村</b>用に、このページは調整してあるのだ。
紳士淑女の諸君には、<a href="http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD">企画村予定表</a>を参考に、譲り合いの精神で調整してほしい。
"""

  "CABALA-top-0-0-2":
    write_at: 1420047938191
    potof_id: "CABALA-top-0-0"
    show: "talk"
    style: "plain"
    log: """
こちらのページは<b>RP村も、勝負も楽しみたい村</b>用に調整してあるよ。
早い者勝ちが原則だけれど、企画村予定表という便利なページも見てみよう。
もし君がRPに没頭したいなら、専用の州でどっぷり楽しもう。きっとそのほうが楽しめる。
"""
