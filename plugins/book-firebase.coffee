firebase = require "firebase"
RANDOM = require "~/plugins/random"
{ Query, Set, State } = require "~/plugins/memory-record"
{ vuex_value, path, relative_to } = require "~/plugins/struct"

kbd_r = ///
  \[\[(?:
    [^\]]|[^\]]\]|\][^\]]
  )+\]\](?!\])
///g

edit = require '~/models/editor'

snap = (target, set)->
  target.onSnapshot (q)=>
    q.docChanges().forEach ({ newIndex, oldIndex, type, doc })=>
      switch type
        when 'added', 'modified'
          set.add doc.data()
        when 'removed'
          set.remove doc.data()

post = (target, doc)->
  { _id } = doc
  return unless _id
  target.doc(_id).set doc,
    merge: true

remove = (target, doc)->
  { _id } = doc
  return unless _id
  target.doc(_id).delete()

module.exports = (mode)->
  data: ->
    icon =
      _id: ''
      icon: ''
    { edit, icon, tag_ids: [], step: State.step }

  computed: {
    ...vuex_value 'firebase',['user', 'credential']
    my: ->
      return {} unless @user
      { uid } = @user
      potof = Query.potofs.my( @book_id, uid )
      { potof }

    is_creating: -> @edit.chat.potof_id == @edit.potof.id
    is_replacing: -> ! @is_creating

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

    _book:   -> @_firestore.doc "#{mode}/#{@book_id}"
    _potof:  -> @_book.doc "potofs/#{@potof_id}"

    _part:   -> @_book.doc "parts/#{@part_id}"
    _phase:  -> @_book.doc "phases/#{@phase_id}"
    _chat:   -> @_book.doc "chats/#{@chat_id}"

    _potofs: ->  @_book.collection("potofs")
    _cards: ->   @_book.collection("cards")

    _parts:  ->  @_book.collection("parts")
    _phases: ->  @_book.collection("phases")
    _chats: ->   @_book.collection("chats")
  }

  methods:
    _func: (name, o)->
      firebase.functions().httpsCallable( name )( o )
    
    icon_change: (icon)->
      @icon = { icon, _id: @potof_id }

    focus: (@idx)->
      @icon_change 'mdi-access-point'

    fav: ->
    create_mode: ->
      @edit.chat = Query.chats.find @edit.phase.id + '-edit'
    replace_mode: ->
      @edit.chat = Query.chats.find @chat_id

    remove: ->
      { _id, potof } = @edit.chat
      return unless confirm "編集中の #{_id} を削除しますか？"
      await remove @_chats, { _id }

      return if potof.chats.ids.length
      { _id } = potof
      await remove @_potofs, { _id }
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
      await post @_chats, { _id, write_at }

    chat_post: (log)->
      { _id, show, deco, head, to, random } = @edit.chat

      idx = 0
      log.replace kbd_r, ( str )->
        key = str[2...-2]
        random[idx] ?= RANDOM key, { @book_id }
        idx++
        ''

      if @is_creating
        potof_id = @potof_id
        write_at = new Date - 0
        _id = [@phase_id, @edit.chat.new_idx(@at_zero)].join('-')
        await post @_chats, { _id, potof_id, write_at, show, deco, head, to, log, random }
      else
        await post @_chats, { _id, show, deco, head, to, log, random }
      @create_mode()
      @edit.chat.random = []
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

      await post @_potofs, { _id, face_id, tag_id, job, write_at, sign, uid }
      @icon_change icon

    'icon._id': (_id, old_id)->
      return unless Query.potofs.find @icon._id
      await Promise.all [
        await post @_potofs, @icon
        await post @_potofs,
          _id: old_id
          icon: ""
      ]

    'icon.icon': (icon)->
      return unless Query.potofs.find @icon._id
      await post @_potofs, @icon

  mounted: ->
    @$detaches = [
      snap @_potofs, Set.potof
      snap @_cards,  Set.card

      snap @_parts,  Set.part
      snap @_phases, Set.phase
      snap @_chats,  Set.chat
    ]

  beforeDestroy: ->
    @icon.icon = ""
    if Query.potofs.find @icon._id
      await post @_potofs, @icon
      .then ->
        console.log "clear icon"
    for unsubscribe in @$detaches
      unsubscribe()
    console.log "unsubscribed"