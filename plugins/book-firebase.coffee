firebase = require "firebase"
{ Query, Set, State } = require "~/plugins/memory-record"
{ vuex_value } = require '~/plugins/vuex-helper'
{ path, relative_to } = require "~/plugins/struct"

edit = require '~/models/editor'

snap = (collection, target)->
  collection.onSnapshot (q)=>
    q.docChanges().forEach ({ newIndex, oldIndex, type, doc })=>
      switch type
        when 'added', 'modified'
          Set[target].add doc.data()
        when 'removed'
          Set[target].remove doc.data()

post = (target, doc)->
  { _id } = doc
  return unless _id
  target.doc(_id).set doc,
    merge: true

remove = (target, doc)->
  { _id } = doc
  return unless _id
  target.doc(_id).delete()

module.exports = (folder_id)->
  data: ->
    icon =
      _id: ''
      icon: ''
    { edit, icon, tag_ids: [], step: State.step }

  computed: {
    ...vuex_value 'firebase',['user', 'credential', 'fcm_token']
    my: ->
      return {} unless @user
      { uid } = @user
      potof = Query.potofs.my( @book_id, uid )
      { potof }

    is_creating: -> @edit.chat.potof_id == @edit.potof.id
    is_replacing: -> ! @is_creating

    is_ban: ->
      ban = false
      ban

    is_warn: ->
      warn = false
      warn

    can_move: ->
      @is_replacing && @edit.chat.id != @chat_id

    can_fav: ->
      @phase?.fav
    can_update: ->
      @phase?.update

    at_zero: ->
      @page_all_contents[0]?[0]?.write_at ? 0

    _firestore: ->
      db = firebase.firestore()
      db.settings
        timestampsInSnapshots: true
      db
    _storage: ->
      firebase.storage()
    _images: ->
      @_storage.ref().child('images').child @part_id

    potof_id: -> @book_id + '-' + @edit.potof.face_id
    phase_id: ->
      { _id } = Query.phases.where({ @part_id, handle: @edit.phase.handle }).list[0]
      _id

    phase: ->
      @chat?.phase
    handle: ->
      @chat?.handle ? @phase?.handle

    phases: ->
      Query.phases.where({ @book_id }).list

    _book:   -> @_firestore.doc "#{folder_id}/#{@book_id}"
    _potof:  -> @_book.doc "potofs/#{@potof_id}"

    _part:   -> @_book.doc "parts/#{@part_id}"
    _phase:  -> @_book.doc "phases/#{@phase_id}"
    _chat:   -> @_book.doc "chats/#{@chat_id}"

    _parts:  -> @_book.collection "parts"
    _potofs: -> @_book.collection "potofs"
    _phases: -> @_book.collection "phases"
    _chats:  -> @_book.collection "chats"
  }

  methods:
    _func: (name, o)->
      firebase.functions().httpsCallable( name )( o )

    icon_change: (icon)->
      @icon = { icon, _id: @potof_id }

    focus: (@idx)->
      @icon_change 'mdi-access-point'

    anker: (book_id, a)->
      console.log book_id, a
    
    fav: ->
    create_mode: ->
      @edit.chat = Query.chats.find @edit.phase.id + '-edit'
    replace_mode: ->
      @edit.chat = Query.chats.find @chat_id

    remove: ->
      { _id, potof } = @edit.chat
      return unless confirm "編集中の #{_id} を削除しますか？"
      await @_func 'wiki_chat_delete', { _id }

      return if potof.chats.ids.length
      { _id } = potof
      await @_func 'wiki_potof_delete', { _id }
      @create_mode()
    
    check_post: (target)->
      console.log target

    image_post: (file, next)->
      ss = await @_images.child(file.name).put(file)
      next await ss.ref.getDownloadURL()

    move: ->
      return if @is_creating
      { _id } = @edit.chat
      { write_at } = @chat
      write_at -= 10
      await @_func 'wiki_chat', { _id, write_at }

    chat_post: (log)->
      { _id, show, deco, to } = @edit.chat
      if @is_creating
        potof_id = @potof_id
        write_at = new Date - 0
        _id = [@phase_id, @edit.chat.new_idx(@at_zero)].join('-')
        await @_func 'wiki_chat', { _id, potof_id, write_at, show, deco, to, log }
      else
        await @_func 'wiki_chat', { _id, show, deco, to, log }
      @create_mode()
      @edit.chat.log = ''

  watch:
    user: ->
      if @user
        { displayName, uid } = @user
      else
        displayName = null
        uid = null
        @icon_change ""
      @edit.potof.sign = displayName
      @edit.potof.uid = uid

    'my.potof.face_id': ->
      return unless @my.potof
      { face_id, tag_id, job, sign, uid } = @my.potof
      Object.assign @edit.potof, { face_id, tag_id, job, sign, uid }

    'edit.potof.face_id': ->
      return unless @edit.potof
      { face_id, tag_id, head, job, sign, uid } = @edit.potof
      @edit.chat.head = head
      _id = @potof_id
      icon = 'mdi-access-point'
      write_at = new Date - 0

      await @_func 'wiki_potof', { _id, face_id, tag_id, job, write_at, sign, uid }
      @icon_change icon

    'icon._id': (_id, old_id)->
      return unless Query.potofs.find _id
      await Promise.all [
        @_func 'wiki_potof', @icon
        post @_potofs,
          _id: old_id
          icon: ""
      ]

    'icon.icon': (icon)->
      return unless Query.potofs.find @icon._id
      await @_func 'wiki_potof', @icon

  mounted: ->
    snap @_chats,  'chat'
    snap @_phases, 'phase'
    snap @_potofs, 'potof'

  beforeDestroy: ->
    @icon.icon = ""
    return unless Query.potofs.find @icon._id
    await @_func 'wiki_potof', @icon
