firebase = require "firebase"
{ Set } = require "memory-orm"
_ = require "lodash"

time_limit = 2000

firestore = ->
  store = firebase.firestore()
  store.settings
    timestampsInSnapshots: true
  store

joinSnapshot = (snap_id, shot)->
  eject = ->
  (newVal)->
    eject()
    eject =
      if newVal
        @[snap_id].onSnapshot shot.bind @
      else
        ->

firebase_snap_base = (id, pk, snap, { del, add, shot })->
  snap_id = "#{id}_snap"
  join_id = "#{id}_join"
  add_id  = "#{id}_add"
  del_id  = "#{id}_del"
  pk_id   = "#{id}_pk"
  join = joinSnapshot snap_id, shot

  mounted: ->
    @[join_id] @[pk_id]
  
  beforeDestroy: ->
    @[join_id] undefined

  methods:
    [join_id]: join
    [add_id]: add
    [del_id]: del

  computed:
    _firestore: firestore
    [pk_id]: ->
      if pk
        _.get @, pk
      else
        true
    [snap_id]: ->
      if @[pk_id]
        snap.call @, @_firestore

  watch:
    if pk
      [pk]: join

module.exports = m =
  firebase_snap_to_models: (id, pk, snap)->
    snap_id = "#{id}_snap"
    set = Set[id[..-2]]
    firebase_snap_base id, pk, snap,
      del: _.debounce (_id)->
        return unless _id
        @[snap_id]?.doc(_id).delete()
      , time_limit,
        leading: false
        trailing: true
      add: _.debounce (doc)->
        { _id } = doc
        return unless _id
        @[snap_id]?.doc(_id).set doc,
          merge: true
      , time_limit,
        leading: false
        trailing: true
      shot: (qs)->
        qs.docChanges().forEach ({ newIndex, oldIndex, type, doc })=>
          switch type
            when 'added', 'modified'
              set.add doc.data()
            when 'removed'
              set.remove doc.id

  firebase_snap_to_model: (id, pk, snap)->
    snap_id = "#{id}_snap"
    set = Set[id]
    firebase_snap_base id, pk, snap,
      del: _.debounce ->
        @[snap_id]?.delete()
      , time_limit,
        leading: false
        trailing: true
      add: _.debounce (doc)->
        @[snap_id]?.set doc,
          merge: true
      , time_limit,
        leading: false
        trailing: true
      shot: (doc)->
        if o = doc.data()
          set.add o
        else
          set.remove doc.id

  firebase_snaps: (id, pk, snap)->
    snap_id = "#{id}_snap"
    firebase_snap_base id, pk, snap,
      del: _.debounce (_id)->
        return unless _id
        @[snap_id]?.doc(_id).delete()
      , time_limit,
        leading: false
        trailing: true
      add: _.debounce (doc)->
        { _id } = doc
        return unless _id
        @[snap_id]?.doc(_id).set doc,
          merge: true
      , time_limit,
        leading: false
        trailing: true
      shot: (qs)->
        qs.docChanges().forEach ({ newIndex, oldIndex, type, doc })=>
          switch type
            when 'added', 'modified'
              @[id][doc.id] = doc.data()
            when 'removed'
              console.log doc.data()
              delete @[id][doc.id]

  firebase_snap: (id, pk, snap)->
    snap_id = "#{id}_snap"
    firebase_snap_base id, pk, snap,
      del: _.debounce ->
        @[snap_id]?.delete()
      , time_limit,
        leading: false
        trailing: true
      add: _.debounce (doc)->
        @[snap_id]?.set doc,
          merge: true
      , time_limit,
        leading: false
        trailing: true
      shot: (doc)->
        @[id] = doc.data()

