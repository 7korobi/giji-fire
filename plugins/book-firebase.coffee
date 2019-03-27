RANDOM = require "~/plugins/random"
{ Query, Set, State } = require 'memory-orm'
{ vuex, relative_to, firestore_models } = require "vue-petit-store"

edit = require '~/models/editor'

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
    edit_chat = edit.chat
    { edit_chat, tag_ids: [], step: State.step }

      # return {} unless @sign
      # sign.draft sign.introduction

  computed:
    edit: ->
      return edit unless @book_id
      return edit unless @user

      icon = Query.icons.find @user.uid, edit.icon.id
      { chat } = edit
      { phase } = chat
      { potof } = icon
      console.log { potof, phase, chat, icon }
      { potof, phase, chat, icon }

    is_creating: -> true
    is_replacing: -> ! @is_creating

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
      if @book_id && @edit.potof?.face_id
        "#{@book_id}-#{@edit.potof.face_id}"
      else
        edit.potof.id

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

  methods:
    _func: (name, o)->
      firebase.functions().httpsCallable( name )( o )

    icon_change: (mdi = @edit.icon.mdi)->
      return unless @user
      return unless @sign
      o =
        mdi: mdi
        _id:  @user.uid
        sign: @sign.sign
        book_id: @book_id
        potof_id: @potof_id
        write_at: new Date - 0
      @icons_add o

    focus: (@idx)->

    fav: ->
    create_mode: ->
      @edit_chat = edit.chat
    replace_mode: ->
      @edit_chat = Query.chats.find @chat_id

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
    'user.uid': (uid, oldVal)->
      @icon_change ""
      return unless oldVal
      @icons_del oldVal

    'sign.sign': (sign)->
      @icon_change()

    'edit.icon.id': (uid, oldVal)->
      console.log { uid, oldVal }, @edit.icon

    'edit.potof.id': (potof_id)->
      return unless potof_id
      edit.chat.potof_id = potof_id
      @icon_change()

    'edit.potof.face_id': (face_id)->
      mdi =
        if face_id
          'mdi-account'
      @icon_change mdi

    'idx': (idx)->


  beforeDestroy: ->
    return unless @user
    @icon_change ""
