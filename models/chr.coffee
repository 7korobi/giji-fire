{ Set, Model, Query, Rule } = require "~/plugins/memory-record"

order = [
  "ririnra"
  "wa"
  "time"
  "sf"
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
  @model_property.chr_job =
    value: (face_id)->
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
    aggregate: (tag_id, order)->
      asc =
        switch order
          when "order", "date_min"
            "asc"
          else
            "desc"
      all.tag(tag_id).sort(order, asc)

    tag: (tag_id)->
      switch tag_id
        when "all"
          all
        else
          all.in tag_ids: tag_id

    name_blank: ->
      for idx in ["ア".charCodeAt(0) .. "ン".charCodeAt(0)]
        key = String.fromCharCode idx
        continue if all.reduce.name_head.from[key]
        key

    name_head: (tag_id = "all")->
      all.tag(tag_id).reduce.name_head

  @deploy ->
    @aggregate =
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
    @summary_url = "/summary/faces/#{@_id}"

  map =
    count: 1
  class @model extends @model
    @order: (o, emit)->
      emit "list",
        sort: ["order"]
      emit "name_head",
        sort: ["id"]
        index: "set.length"

    @map_reduce: (o, emit)->
      head = o.name[0]
      head = o.name[1] if head in ["†"]
      emit "all", "all", map
      emit "name_head", head,
        set: o.name
      for tag in o.tag_ids
        emit "tag", tag, map

  Object.assign @model_property,
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
  @belongs_to "face"
  @deploy ->
    @_id = "#{@chr_set_id}_#{@face_id}"
    @chr_set_idx = order.indexOf @chr_set_id

new Rule("chr_job").schema ->
  @order "face.order"
  @belongs_to "chr_set"
  @belongs_to "face"

  @deploy ->
    @_id = "#{@chr_set_id}_#{@face_id}"
    @chr_set_idx = order.indexOf @chr_set_id


Set.tag.set  require "../yaml/chr_tag.yml"
Set.face.set require "../yaml/chr_face.yml"
for { face_id, say } in require "../yaml/npc.yml"
  Query.faces.find(face_id).npc = { say }


for key in order
  o = require "../yaml/cs_#{key}.yml"

  Set.chr_set.append o.chr_set
  { chr_set_id } = o.chr_set
  cs_key = { chr_set_id }

  Set.chr_npc.merge o.chr_npc, cs_key
  Set.chr_job.merge o.chr_job, cs_key

list =
  for face in Query.faces.list
    chr_set_id = "all"
    face_id = face._id
    job = face.chr_jobs.list.sort("chr_set_idx")[0]?.job
    continue unless job?
    { chr_set_id, face_id, job }

Set.chr_job.merge list
