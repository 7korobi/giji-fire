{ Model, Query, Rule, Set, State } = require 'memory-orm'
{ to_tempo, to_msec } = require "vue-petit-store"
format = require 'date-fns/format'
locale = require "date-fns/locale/ja"

{ game } = require "~/../giji/config/yaml/live.yml"

if window?
  format = format.default 
  locale = locale.default

new Rule("book").schema ->
  @path "folder"
  @has_many "parts"
  @has_many "phases"
  @has_many "chats"
  @has_many "potofs"

  @habtm "options"
  @habtm "roles"
  @habtm "marks"
  @habtm "tags"

  @belongs_to "winner"
  @belongs_to "say"
  @belongs_to "locale"

  @property 'model',
    head:
      get: ->
        "#{@idx}: #{@label}"
  
  @scope (all)->
    in_folder: (folder_id)->
      all
      .partition "#{folder_id}.set"
      .where { folder_id }
      .page 25
      .order
        sort: ["write_at", "desc"]
        page: true

  @deploy ->
    in_month = format @write_at, 'MM月', { locale }
    yeary = format @write_at, 'yyyy年', { locale }
    monthry = yeary + in_month
    @q = {
      yeary
      monthry
      in_month
      search_words: @label
    }

    if @is_epilogue && @is_finish
      @mode = "oldlog"
    else
      if @parts.list[0]
        @mode = "progress"
      else
        @mode = "prologue"
    
    @aggregate =
      face_ids: []

  @order "list", sort: ['write_at', 'desc']
  class @model extends @model
    @map_reduce: (o, emit)->
      emit "idx",
        max: parseInt o.idx
      it =
        set: o.id
      emit it
      emit "all", it
      emit o.folder_id, it

  @property 'model',
    timer:
      get: ->
        to_tempo @range, "#{gap_days}#{@gap}"


new Rule("winner").schema ->
  @scope (all)->

new Rule("option").schema ->
  @scope (all)->

new Rule("say").schema ->
  @scope (all)->
    active: all.in for: game.folder_id
  @deploy ->
    @for ?= []

new Rule("game").schema ->
  @scope (all)->

new Rule("locale").schema ->
  @scope (all)->

new Rule("mark").schema ->
  @scope (all)->

State.transaction (m)->
  Set.locale.set require "../../../giji/app/yaml/set_locale.yml"
  Set.option.set require '../../../giji/app/yaml/set_option.yml'
  Set.winner.set require '../../../giji/app/yaml/set_winner.yml'
  Set.say.set    require '../../../giji/app/yaml/set_says.yml'
  Set.mark.set   require '../../../giji/app/yaml/set_mark.yml'
  Set.game.set   require "../../../giji/app/yaml/sow_game.yml"
, Query.static.meta
