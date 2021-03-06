{ Set, Model, Query, Rule } = Mem = require "memory-orm"
{ url } = require "~/../giji/config/yaml/live.yml"
format = require 'date-fns/format'
locale = require "date-fns/locale/ja"

if window?
  format = format.default 
  locale = locale.default

new Rule("sow_roletable").schema ->
new Rule("sow_village_plan").schema ->


new Rule("sow_turn").schema ->
  @sort "turn", "asc"
  @belongs_to "village", target: "sow_villages", key: "story_id"

new Rule("sow_village").schema ->
  @order "list",        sort: ['write_at','desc'], diff: ['write_at']
  @order "yeary",       sort: ['id','desc']
  @order "in_month",    sort: ['id','asc']
  @order "upd_at",      sort: ['id','asc']
  @order "folder_id",   sort: ['count', 'desc']
  @order "upd_range",   sort: ['count', 'desc']
  @order "sow_auth_id", sort: ['count', 'desc']
  @order "rating",      sort: ['count', 'desc']
  @order "size",        sort: ['count', 'desc']
  @order "say",         sort: ['count', 'desc'], belongs_to: "says"
  @order "game",        sort: ['count', 'desc'], belongs_to: "games"
  @order "mob",         sort: ['count', 'desc'], belongs_to: "roles"
  @order "option",      sort: ['count', 'desc'], belongs_to: "options"
  @order "event",       sort: ['count', 'desc'], belongs_to: "roles"
  @order "discard",     sort: ['count', 'desc'], belongs_to: "roles"
  @order "config",      sort: ['count', 'desc'], belongs_to: "roles"

  @has_many "turns", target: "sow_turns", key: "story_id"

  @habtm "marks"
  @habtm "option_datas", target: "options", key: "options"

  @belongs_to "say",  target: "says",  key: "q.say"
  @belongs_to "mob",  target: "roles", key: "q.mob"
  @belongs_to "game", target: "games", key: "q.game"

  @scope (all)->
    prologue: all.partition("prologue.all.set").sort "timer.nextcommitdt", "desc"
    progress: all.partition("progress.all.set").sort "timer.nextcommitdt", "desc"

    mode: ( mode )->
      all.partition("#{mode}.all.set")

    summary: ( mode, folder_ids, query_in, query_where, search_word )->
      unless folder_ids.length
        folder_ids = ["all"]
      parts = folder_ids.map (folder_id)-> "#{mode}.#{folder_id}.set"
      all
      .partition ...parts
      .in query_in
      .where query_where
      .search search_word

    all_contents: ( mode, folder_ids, query_in, query_where, search_word, order, asc )->
      all
      .summary mode, folder_ids, query_in, query_where, search_word
      .page 25
      .order
        sort: [order, asc]
        page: true

  @deploy ->
    { interval, hour, minute } = @upd
    hour   = "0#{hour}"   if hour   < 10
    minute = "0#{minute}" if minute < 10
    @timer.nextchargedt = new Date @timer.nextchargedt
    @timer.nextcommitdt = new Date @timer.nextcommitdt
    @timer.nextupdatedt = new Date @timer.nextupdatedt
    @timer.scraplimitdt = new Date @timer.scraplimitdt
    @timer.updateddt    = new Date @timer.updateddt
    updated_at          = new Date @timer.updateddt

    @write_at = updated_at - 0

    in_month = format updated_at, 'MM月', { locale }
    yeary = format updated_at, 'yyyy年', { locale }
    monthry = yeary + in_month
    @q = {
      yeary
      monthry
      in_month
      sow_auth_id: @sign
      folder_id: @folder.toUpperCase()
      size: "x" + @vpl[0]
      say:  @type.say
      mob:  @type.mob
      game: @type.game
      upd_at: "#{hour}:#{minute}"
      upd_range: "#{interval * 24}h"
      rating: @rating
      search_words: @name
    }

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

  @property 'model',
    query:
      get: ->
        Query.sow_villages.where({@id})
    roles:
      get: ->
        @query.reduce ? []
    event_length:
      get: ->
        @query.reduce.event?.length ? 0

  cmd =
    count: 1
  class @model extends @model
    @map_partition: (o, emit)->
      { id, part_id } = o
      it =
        set: id
      emit it
      emit o.mode, "all", it
      emit o.mode, o.q.folder_id, it

    @map_reduce: (o, emit)->
      emit "mode", o.mode, o.q.folder_id,  cmd
      emit "in_month", o.q.in_month, cmd
      emit "yeary",    o.q.yeary,    cmd
      emit "monthry",  o.q.monthry,  cmd
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

Set.folder.set        require "../../../giji/app/yaml/sow_folder.yml"
Set.sow_roletable.set require "../../../giji/app/yaml/sow_roletables.yml"

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
