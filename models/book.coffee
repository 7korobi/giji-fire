{ Model, Query, Rule, Set } = require 'memory-orm'
{ game } = require "~/config/live.yml"
format = require 'date-fns/format'
locale = require "date-fns/locale/ja"

new Rule("book").schema ->
  @order "write_at"
  @path "folder"
  @has_many "parts"
  @has_many "phases"
  @has_many "chats"
  @has_many "potofs"

  @habtm "options"
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
      .where { folder_id }

  @deploy ->
    in_month = format @write_at, 'MM月', { locale }
    yeary = format @write_at, 'YYYY年', { locale }
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

  class @model extends @model
    @map_reduce: (o, emit)->
      emit "idx",
        max: parseInt o.idx

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


Set.locale.set require "../yaml/locale.yml"
Set.option.set require '../yaml/set_option.yml'
Set.winner.set require '../yaml/set_winner.yml'
Set.say.set    require '../yaml/set_says.yml'
Set.game.set   require "../yaml/sow_game.yml"
