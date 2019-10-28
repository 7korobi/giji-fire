{ Set, Model, Query, Rule, State } = require 'memory-orm'

order = [
  "ririnra"
  "wa"
  "time"
  "sf"
  "fable"
  "mad"
  "ger"
  "changed"
  "animal"
  "school"
  "all"
]


new Rule("tag").schema ->
  @belongs_to "chr_set"
  @habtm "faces", reverse: true
  @tree()

  class @model extends @model
    chr_job: (face_id)->
      Query.chr_jobs.find "#{@chr_set_id}_#{face_id}"
  @scope (all)->
    enable: ->
      all.where (o)->
        ! o.disabled

  @order "list", sort: ["order"]
  class @model extends @model
    @map_reduce: (o, emit)->
      group = o.order // 1000
      emit "group", o.head, group,
        set: o.id
        list: true

    @order: (o, emit)->
      group = o.order // 1000
      emit "group", o.head, group, "list",
        sort: ["order"]
      emit "group",
        sort: ["list.0.order"]

katakanas =
  for idx in ["ア".charCodeAt(0) .. "ン".charCodeAt(0)]
    String.fromCharCode idx

new Rule("face").schema ->
  @habtm "tags"
  @has_many "chr_jobs"
  @has_many "chr_npcs"

  @scope (all)->
    tag: (tag_id)->
      all.partition "tag.#{tag_id}.set"

    name_head: (tag_id)->
      all.tag(tag_id).reduce.name_head

  @deploy ->
    name = @name[0..]
    name = @name[1..] if ["†"].includes @name[0]
    name = @name[2..] if ["D."].includes @name[0..1]
    name = @name[3..] if ["Dr."].includes @name[0..2]
    name = name.replace /[\u3041-\u3096]/g, (hira)->
      String.fromCharCode hira.charCodeAt(0) + 0x60
    head = name[0]
    @q = { head, name }
    @tag_ids.unshift "all"

  map =
    count: 1
  @order "list",
    sort: ["order"]
  @order "name_head",
    sort: ["id"]
    index: "set.length"
    cover: katakanas
  class @model extends @model
    @map_partition: (o, emit)->
      it =
        set: o.id
        count: 1
      emit it
      emit "tag","all", it

      for tag_id in o.tag_ids
        emit "tag", tag_id, it

    @map_reduce: (o, emit)->
      emit "name_head", o.q.head,
        set: o.name

  @property 'model',
    summary_url:
      get: ->
        "/summary/faces/show?id=#{@_id}"
    roles:
      get: ->
        @aggregate.roles
    lives:
      get: ->
        @aggregate.lives
    sow_auths:
      get: ->
        @aggregate.sow_auths
    mestypes:
      get: ->
        @aggregate.mestypes
    folders:
      get: ->
        @aggregate.folders
    story_length:
      get: ->
        @aggregate.log.story_ids.length
    sow_auth_id:
      get: ->
        @aggregate.fav._id.sow_auth_id
    fav_count:
      get: ->
        @aggregate.fav.count
    date_max:
      get: ->
        new Date(@aggregate.log.date_max) - 0
    date_min:
      get: ->
        new Date(@aggregate.log.date_min) - 0
    date_range:
      get: ->
        @date_max - @date_min
    
    jobs:
      get: ->
        @chr_jobs.pluck("job").uniq

  class @list extends @list
    to_json: ->
      JSON.stringify @map (o)=>
        _id:     o.id
        name:    o.name
        comment: o.comment
        order:   o.order
        tag_ids: o.tag_ids

new Rule("chr_set").schema ->
  @has_many "chr_jobs"
  @has_many "chr_npcs"
  @order "list", sort: ['label', 'asc']

new Rule("chr_npc").schema ->
  @belongs_to "chr_set"
  @belongs_to "chr_job"
  @belongs_to "face"

  @deploy ->
    @chr_job_id = "#{@chr_set_id}_#{@face_id}"
    @_id ?= @chr_job_id
    @chr_set_idx = order.indexOf @chr_set_id
    @intro = [@say_0, @say_1]
    @intro.push @say_2 if @say_2

  @property 'model',
    head:
      get: ->
        "#{@chr_job.job} #{@face.name}"

  @order "list", sort: ['label', 'asc']

new Rule("chr_job").schema ->
  @belongs_to "chr_set"
  @belongs_to "face"

  @deploy ->
    @_id = "#{@chr_set_id}_#{@face_id}"
    @chr_set_idx = order.indexOf @chr_set_id
    @q =
      search_words:
        if @face
          if ["animal", "school"].includes @chr_set_id
            @face.name
          else
            "#{@job} #{@face.name}"
        else
          ""

  @scope (all)->
    tag: (tag_id)->
      { chr_set_id, face_sort } = Query.tags.find tag_id
      switch tag_id
        when "all"
          all
          .where { chr_set_id }
          .sort ...face_sort
        else
          all
          .where { chr_set_id }
          .in 'face.tag_ids': tag_id
          .sort ...face_sort

  @property 'model',
    chr_npc:
      get: ->
        Query.chr_npcs.find @id

State.transaction ->
  Set.tag.set  require "../yaml/chr_tag.yml"

  Set.face.set faces = require "../yaml/chr_face.yml"
  for o, idx in faces
    o.yml_idx = idx
    o.aggregate =
      sow_auths: []
      mestypes: []
      folders: []
      roles: []
      lives: []
      log:
        date_min:   0xfffffffffffff
        date_max:  -0xfffffffffffff
        story_ids: []
      fav:
        _id:
          sow_auth_id: null
        count: 0

  for key in order
    o = require "../yaml/cs_#{key}.yml"

    Set.chr_set.append o.chr_set
    { id } = o.chr_set
    cs_key = { chr_set_id: id }

    Set.chr_npc.merge o.chr_npc, cs_key
    Set.chr_job.merge o.chr_job, cs_key

  list =
    for face in faces
      chr_set_id = "all"
      face_id = face._id
      job = face.chr_jobs.list.sort("chr_set_idx")[0]?.job
      continue unless job?
      { chr_set_id, face_id, job }

  Set.chr_job.merge list

  with_tag = (o, id, r)->
    if o.q.head.match r && ! o.tag_ids.includes id
      o.tag_ids.push id

  Query.chr_jobs
  .where (o)=> 'ririnra' == o.chr_set_id && o.face?.q 
  .pluck("face").forEach (o)->
    with_tag o, /[ア-コヴ]/,   'G_a_k'
    with_tag o, /[サ-ト]/,     'G_s_t'
    with_tag o, /[ナ-ホ]/,     'G_n_h'
    with_tag o, /[マ-ンヵ-ヺ]/, 'G_m_w'
    return

  Query.chr_jobs
  .where (o)=> 'time' == o.chr_set_id && o.face?.q 
  .pluck("face").forEach (o)->
    with_tag o, /[ア-コヴ]/,   'T_a_k'
    with_tag o, /[サ-ノ]/,     'T_s_n'
    with_tag o, /[ハ-ンヵ-ヺ]/, 'T_h_w'
    return

, Query.static.meta
