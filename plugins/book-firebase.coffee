firebase = require "firebase"
RANDOM = require "~/plugins/random"
{ Query, Set, State } = require "memory-orm"
{ vuex_value, path, relative_to } = require "~/plugins/struct"

edit = require '~/models/editor'

module.exports =
  data: ->
    icon =
      _id: ''
      icon: ''
    { edit, icon, tag_ids: [], step: State.step }

  computed: {
    ...vuex_value 'firebase',['user', 'credential']
    my: ->
      return {} unless @book_id
      return {} unless @user
      { uid } = @user
      potof = Query.potofs.my( @book_id, uid )
      { potof }

    is_creating: -> @edit.chat.potof_id == @edit.potof.id
    is_replacing: -> ! @is_creating

    edit_id: ->
      @user && @edit.potof.face_id && @edit.chat.id

    can_move: ->
      @is_replacing && @edit.chat.id != @chat_id

    can_fav: ->
      @phase?.fav
    can_update: ->
      @phase?.update

    _storage: ->
      firebase.storage()
    _images: ->
      @_storage.ref().child('images')

    potof_id: ->
      @book_id + '-' + @edit.potof.face_id
    phase_id: ->
      { list } = Query.phases.where({ @part_id, handle: @edit.phase.handle })
      list[0]?._id
      
    phase: ->
      @chat?.phase
    handle: ->
      @chat?.handle ? @phase?.handle

    phases: ->
      return [] unless @book_id
      Query.phases.where({ @book_id }).list

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
      await @chats_del _id

      @$store.commit "menu/focus",
        query: "#edit-edit-edit-edit-edit"
        mode: 'center'

      return if potof.chats.ids.length
      { _id } = potof
      await @potofs_del _id
      @create_mode()
    
    check_post: (target)->
      console.log target

    image_post: ({ id, file }, next)->
      ss = await @_images.child(id).put(file)
      next await ss.ref.getDownloadURL()

    move: ->
      return if @is_creating
      { _id } = @edit.chat
      { write_at } = @chat
      write_at -= 10
      await @chats_add { _id, write_at }

    chat_post: (log, { attrs, html, text })->
      { _id, show, deco, head, to, random } = @edit.chat

      for key, idx in attrs.random ? []
        { title, text } = random[idx] ?= RANDOM key, { @book_id }


      idx = 0
      log = log.replace /<kbd title="([^"]+)">([^<]+)<\/kbd>/g, (str, t1, v1)->
        { title, text } = random[idx]
        console.log { t1, v1, title, text }
        idx++
        """<kbd title="#{title}">#{text}</kbd>"""

      if @is_creating
        potof_id = @potof_id
        write_at = new Date - 0
        phase = Query.phases.find @phase_id
        idx = phase.chats.reduce?.say?.count ? 0
        _id = [@phase_id, 1 + idx ].join('-')
        await @chats_add { _id, potof_id, write_at, show, deco, head, to, log, random }
      else
        await @chats_add { _id, show, deco, head, to, log, random }
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

      await @potofs_add { _id, face_id, tag_id, job, write_at, sign, uid },
        merge: true
        
      @icon_change icon

    'icon._id': (_id, old_id)->
      return unless Query.potofs.find @icon._id
      await Promise.all [
        await @potofs_add @icon
        await @potofs_add
          _id: old_id
          icon: ""
      ]

    'icon.icon': (icon)->
      return unless Query.potofs.find @icon._id
      await @potofs_add @icon

  beforeDestroy: ->
    @icon.icon = ""
    if Query.potofs.find @icon._id
      await @potofs_add @icon
      console.log "clear icon"
    console.log "unsubscribed"
