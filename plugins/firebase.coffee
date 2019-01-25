firebase = require "firebase"
{ Set } = require "memory-orm"
_ = require "lodash"

firestore = ->
  store = firebase.firestore()
  store.settings
    timestampsInSnapshots: true
  store

joinSnapshot = (shot)->
  eject = ->
  (query)->
    eject()
    eject =
      if query
        query.onSnapshot shot.bind @
      else
        ->

firestore_base = (id, path, chk, query, { del, add, snap, shot })->
  default_id = "#{id}_default"

  query_id = "#{id}_query"
  snap_id  = "#{id}_snap"
  path_id  = "#{id}_path"
  chk_id   = "#{id}_chk"

  join_id = "#{id}_join"
  add_id  = "#{id}_add"
  del_id  = "#{id}_del"

  snapshot =
    if query
      query_id
    else
      snap_id
  join = joinSnapshot shot

  data: ->

  mounted: ->
    @[default_id] = @[id]
    @[join_id] @[snapshot]

  beforeDestroy: ->
    @[join_id] undefined

  methods:
    [join_id]: join
    [add_id]: add
    [del_id]: del

  computed:
    if chk && query
      _firestore: firestore
      [path_id]: path
      [chk_id]: chk
      [snap_id]: ->
        if @[path_id]
          snap.call @, @[path_id]
      [query_id]: ->
        if @[chk_id] && @[snap_id]
          query.call @, @[snap_id]
    else
      _firestore: firestore
      [path_id]: path
      [snap_id]: ->
        if @[path_id]
          snap.call @, @[path_id]

  watch:
    [snapshot]: join


module.exports = m =
  firestore_models: (id, path, chk, query)->
    snap_id = "#{id}_snap"
    set = Set[id[..-2]]
    firestore_base id, path, chk, query,
      del: (_id)->
        return unless _id
        @[snap_id]?.doc(_id).delete()
      add: (doc)->
        { _id } = doc
        return unless _id
        @[snap_id]?.doc(_id).set doc,
          merge: true
      snap: (path)->
        @_firestore.collection path
      shot: (qs)->
        qs.docChanges().forEach ({ newIndex, oldIndex, type, doc })=>
          switch type
            when 'added', 'modified'
              set.add doc.data()
            when 'removed'
              set.remove doc.id

  firestore_model: (id, path)->
    snap_id = "#{id}_snap"
    set = Set[id]
    firestore_base id, path, null, null,
      del: ->
        @[snap_id]?.delete()
      add: (doc)->
        @[snap_id]?.set doc,
          merge: true
      snap: (path)->
        @_firestore.doc path
      shot: (doc)->
        if o = doc.data()
          set.add o
        else
          set.remove doc.id

  firestore_collection: (id, path, chk, query)->
    snap_id = "#{id}_snap"
    firestore_base id, path, chk, query,
      del: (_id)->
        return unless _id
        @[snap_id]?.doc(_id).delete()
      add: (doc)->
        { _id } = doc
        return unless _id
        @[snap_id]?.doc(_id).set doc,
          merge: true
      snap: (path)->
        @_firestore.collection path
      shot: (qs)->
        qs.docChanges().forEach ({ newIndex, oldIndex, type, doc })=>
          switch type
            when 'added', 'modified'
              @[id][doc.id] = doc.data()
            when 'removed'
              console.log doc.data()
              delete @[id][doc.id]

  firestore_doc: (id, path)->
    snap_id = "#{id}_snap"
    default_id = "#{id}_default"
    firestore_base id, path, null, null,
      del: ->
        @[snap_id]?.delete()
      add: (doc)->
        @[snap_id]?.set doc,
          merge: true
      snap: (path)->
        @_firestore.doc path
      shot: (doc)->
        @[id] =
          if doc.exists
            doc.data()
          else
            @[default_id]
