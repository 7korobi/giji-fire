require "~/models/index"
RANDOM = require "~/plugins/random"
{ Query, Set, State } = require 'memory-orm'
{ vuex, relative_to, firestore_models } = require "vue-petit-store"

if window?
  firebase = require "firebase"


module.exports =
  mixins: [
    vuex "user", on: "firebase"
    vuex "sign", on: "firebase"
    firestore_models "icons",
      -> "icon"
      -> @book_id
      (ref)-> ref.where("book_id","==",@book_id)
  ]
  data: ->
    Set.icon.add icon =
      _id: 'anonymous'
      sign: ""
      mdi: "mdi-account"
      potof_id: 'edit-edit-self'

    Set.potof.add potof = 
      _id: 'edit-edit-self'
      tag_id: ""
      face_id: ""
      job: ""
      sign: "ななころび"

    @create_mode chat =
      potof_id: "edit-edit-self"
      write_at: 0
    Set.chat.add chat

    step: State.step
    edit_base: { icon, potof, chat }

  computed:
    _storage: ->
      firebase.storage()
    _images: ->
      @_storage.ref().child('images')

    edit: ->
      if 'edit-edit-self' == @my_potof_id
        is_entry = 'anonymous' != @my_icon_id
        is_creating = is_replacing = false
      else
        is_entry = true
        is_creating = 'edit-edit-edit-edit-edit' == @my_chat_id
        is_replacing = ! is_creating

      is_moving = is_replacing && @chat_id != @my_chat_id
      can_update = @chat?.phase?.update
      can_fav = @my_phase?.fav

      { ...@edit_base
        is_entry
        is_creating
        is_replacing
        is_moving
        can_update
        can_fav
        @phases
      }

    my_icon:  -> Query.icons.find  @my_icon_id
    my_potof: -> Query.potofs.find @my_potof_id
    my_chat:  -> Query.chats.find  @my_chat_id
    my_phase: -> Query.phases.find @my_phase_id

    my_handle:   -> @my_phase?.handle || 'SSAY'
    my_mdi:      -> @my_icon?.mdi || 'mdi-account'
    my_icon_id:  -> @user?.uid || @edit_base.icon._id
    my_potof_id: -> @my_icon?.potof_id || @edit_base.potof._id
    my_chat_id:  -> @edit_base.chat._id
    my_phase_id: -> @edit_base.chat.phase_id

    handle: ->
      @chat?.handle || @phase?.handle

    phases: ->
      return [] unless @book_id
      Query.phases.where({ @book_id }).list

  methods:
    _func: (name, o)->
      firebase.functions().httpsCallable( name )( o )

    my_icon_change: (options)->
      return unless @user
      return unless @sign

      o = Object.assign {
        @book_id
        _id:  @user.uid
        sign: @sign.sign
        mdi:  @my_mdi
        potof_id: @my_potof_id
        write_at: new Date - 0
      }, options

      return unless o.book_id
      return unless o.potof_id
      @icons_add o

    my_potof_change: (o)->
      _id = "#{@book_id}-#{o.face_id}"
      { uid } = @user
      Object.assign o, { _id, uid, @book_id }
      @potofs_add o
      @my_icon_change
        _id: uid
        mdi: "mdi-account"
        potof_id: _id

    selection: (range)->
      if range
        @my_icon_change { mdi: "mdi-pen" }
      else
        @my_icon_change { mdi: "mdi-account" }

    create_mode: (tgt = @edit_base.chat)->
      console.log tgt
      Object.assign tgt,
        _id: 'edit-edit-edit-edit-edit'
        show: "talk"
        deco: "quill"
        to: null
        head: ""
        log: ""
        data:
          icons: [
            { v: "t10", label: "御尊顔", roll: 0, x:   10, y:  10 }
            { v: "t20", label: "御尊顔", roll: 0, x:  710, y: 210 }
            { v: "t30", label: "御尊顔", roll: 0, x:  210, y: 410 }
            { v: "t40", label: "御尊顔", roll: 0, x:  510, y: 610 }
          ]
          lines: [
            { v: "t10", w: "t20", line: "o=o", vpos:  90, wpos: 270, label: '同志' }
            { v: "t10", w: "t30", line: "<.>", vpos: 180, wpos:   0, label: '師匠' }
            { v: "t20", w: "t40", line: "x-x", vpos: 180, wpos:   0, label: 'ライヴァル' }
            { v: "t30", w: "t40", line: "   ", vpos:  90, wpos: 270, label: '' }
          ]
          clusters: [
            { vs: ["t10", "t20"], label: "ふじょし" }
          ]
          random: []

    replace_mode: ->
      Object.assign @edit_base.chat, @chat

    fav: ->

    remove: ->
      { _id, potof } = @edit.chat
      return unless confirm "編集中の #{_id} を削除しますか？"
      await @chats_del _id

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
      { _id, show, deco, head, to, data } = @edit.chat
      { random, clusters, icons, lines } = data

      for key, idx in attrs.random ? []
        { title, text } = random[idx] ?= RANDOM key, { @book_id }
        console.log { key, title, text }

      log = log.replace /<kbd title="([^"]+)">([^<]+)<\/kbd>/g, (str, t1, v1)->
        { title, text } = random[idx]
        console.log { t1, v1, title, text }
        """<kbd title="#{title}">#{text}</kbd>"""

      data = { random, clusters, icons, lines }
      if @is_creating
        potof_id = @potof_id
        write_at = new Date - 0
        phase = Query.phases.find @phase_id
        idx = phase.chats.reduce?.say?.count ? 0
        _id = [@phase_id, 1 + idx ].join('-')
        await @chats_add { _id, potof_id, write_at, show, deco, head, to, log, data }
      else
        await @chats_add { _id, show, deco, head, to, log, data }
      @create_mode()
    
    chat_input: (key, val)->
      @edit_base.chat[key] = val
      @$forceUpdate()

  watch:
    'user.uid':
      immediate: true
      handler: (uid, oldVal)->
        @my_icon_change { mdi: "mdi-account" }
        return unless oldVal
        @my_icon_change { _id: oldVal, mdi: "" }

    'sign.sign':
      immediate: true
      handler: (sign)->
        @my_icon_change {}

    'my_potof_id':
      immediate: true
      handler: (id)->
        @edit_base.chat.potof_id = id
        Object.assign @edit_base.potof, @my_potof
        @my_icon_change {}
        @create_mode()

    'my_potof.head':
      immediate: true
      handler: (head)->
        @edit_base.chat.head = head

    'phases':
      immediate: true
      handler: (phases)->
        for phase in phases when phase.handle == @my_handle
          @edit_base.chat.phase_id = phase.id
          return

  beforeDestroy: ->
    return unless @user
    @my_icon_change { mdi: "" }
