{ Model, Query, Rule } = require "~/plugins/memory-record"

attrs =
  TITLE:   { mark: 'T', label: '表題' }
  public:  {            label: '活動' }
  private: {            label: '秘密' }
  SSAY:   { mark:  '', label: '会話' }
  TSAY:   { mark: '-', label: '独言' }
  MAKER:  { mark: '#', label: '村建' }
  ADMIN:  { mark: '%', label: '管理' }
  VSSAY:  { mark: '@', label: '見物' }
  WSAY:   { mark: '*', label: '人狼' }
  GSAY:   { mark: '+', label: '墓下' }
  SPSAY:  { mark: '=', label: '共鳴' }
  XSAY:   { mark: '!', label: '念波' }
  VGSAY:  { mark: '@', label: '見物' }

new Rule("phase").schema ->
  @path "folder", "book", "part"
  @has_many "chats"

  @scope (all)->
    {}

  @deploy ->
    if o = attrs[@handle]
      Object.assign @, o
    unless @guide
      @mark = null

  class @model extends @model
    @map_reduce: (o, emit)->
      emit "group", o.group,
        count: 1
      emit "handle", o.handle,
        count: 1

    @order: (o, emit)->
      emit "list",
        sort: ["write_at"]
      emit "group",
        sort: ["count", "desc"]
      emit "handle",
        sort: ["count", "desc"]
