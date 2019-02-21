{ Set, Model, Query, Rule, State } = require "memory-orm"

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

new Rule("face").schema ->
  @habtm "tags"
  @has_many "chr_jobs"
  @has_many "chr_npcs"

  @scope (all)->
    tag: (tag_id)->
      all.partition "tag.#{tag_id}.set"

    name_blank: ->
      for idx in ["ア".charCodeAt(0) .. "ン".charCodeAt(0)]
        key = String.fromCharCode idx
        continue if all.reduce.name_head.from[key]
        key

    name_head: (tag_id = "all")->
      all.tag(tag_id).reduce.name_head

  @deploy ->

  map =
    count: 1
  class @model extends @model
    @order: (o, emit)->
      emit "list",
        sort: ["order"]
      emit "name_head",
        sort: ["id"]
        index: "set.length"

    @map_partition: (o, emit)->
      it =
        set: o.id
        count: 1
      emit it
      emit "tag","all", it

      for tag_id in o.tag_ids
        emit "tag", tag_id, it

    @map_reduce: (o, emit)->
      head = o.name[0]
      head = o.name[1] if ["†"].includes o.name[0]
      head = o.name[2] if ["D."].includes o.name[0..1]
      head = head.replace /[\u3041-\u3096]/g, (hira)->
        String.fromCharCode hira.charCodeAt(0) + 0x60

      emit "name_head", head,
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

new Rule("chr_set").schema ->
  @order "label"
  @has_many "chr_jobs"
  @has_many "chr_npcs"

new Rule("chr_npc").schema ->
  @order "label"
  @belongs_to "chr_set"
  @belongs_to "chr_job"
  @belongs_to "face"
  @deploy ->
    @chr_job_id = "#{@chr_set_id}_#{@face_id}"
    @_id ?= @chr_job_id
    @chr_set_idx = order.indexOf @chr_set_id

  @property 'model',
    head:
      get: ->
        "#{@chr_job.job} #{@face.name}"

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
      { chr_set_id } = Query.tags.find tag_id
      switch tag_id
        when "all"
          all
          .where { chr_set_id }
        else
          all
          .where { chr_set_id }
          .in 'face.tag_ids': tag_id

  class @model extends @model
    @order: (o, emit)->
      emit "list",
        sort: ["face.order"]

  @property 'model',
    chr_npc:
      get: ->
        Query.chr_npcs.find @id

State.transaction ->
  Set.tag.set  require "../yaml/chr_tag.yml"

  Set.face.set faces = require "../yaml/chr_face.yml"
  for o in faces
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

  for { face_id, say } in require "../yaml/npc.yml"
    Set.face.find(face_id).npc = { say }


  for key in order
    o = require "../yaml/cs_#{key}.yml"

    Set.chr_set.append o.chr_set
    { chr_set_id } = o.chr_set
    cs_key = { chr_set_id }

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
