<template lang="pug">
log-wiki
  template(slot="summary")
    d-mentions.inframe.mentions(key="1" :page_idx="0" :chat_id="chat_id" @anker="anker")
    a-potofs(key="3" :part='part' v-if="is_show_potofs")

  template(slot="icons")
    .item
      i.c.mdi(:class="icon.icon")
    h6.c(:class="edit.chat.phase.handle" v-if="user && is_replacing") 編集中
    a.btn.item(:class="handle" @click="move" v-if="can_move")
      i.mdi.mdi-table-column-plus-before
    a.btn.item(:class="handle" @click="replace_mode" v-if="can_update")
      i.mdi.mdi-square-edit-outline
    a.btn.item(:class="handle" @click="fav"  v-if="can_fav")
      i.mdi.mdi-heart-outline(v-if="true")
      i.mdi.mdi-heart(v-if="false")
    hr
    nuxt-link.item.active(replace :class="handle" :to="back_url")
      i.mdi.mdi-map-marker
    check.item(v-model="shows" as="magnify")
      i.mdi.mdi-magnify
    check.item(v-model="shows" as="potof")
      i.mdi.mdi-account-multiple
    hr

  c-report(handle="footer" deco="center")
    bread-crumb

  div(v-for="(chats, idx) in page_contents", :key="idx")
    chat(v-for="o in chats" @anker="anker" @focus="focus" :current="chat" :id="o.id", :key="o.id")

  div(v-if="! page_contents.length")
    c-post(handle="VSAY")
      article
        blockquote.
          現在、この名前の項目はありません。
          誰でも編集できます。
        hr
        br
        h3 項目を新しく書くには
        ol
          li 下のアイコンから、ログインに使うサービスを選択。
          li 書き込みに使うキャラクターを選択。
          li 枠形と色味を好みできめたら、
          li
            a(target="blank" href="https://ja.wikipedia.org/wiki/Markdown") Markdown形式
            | で自由に書き込もう。
        ol(style="list-style-type: upper-latin")
          li 画像を書き込みフォームにDrag＆Dropすると、その画像を張り付けるぞ。
        br

  c-post(handle="TSAY")
    fire-oauth(style="white-space: nowrap")
  e-potof(v-if="user && is_creating" v-model="edit.potof")
  c-report(v-if="user && is_replacing" handle="header" deco="center") 編集中

  chat(v-if="user && edit.potof.face_id" :id="edit.chat._id" :current="chat" @check="check_post")
  c-report(v-if="user && edit.potof.face_id" :handle="edit.chat.phase.handle")
    span
      btn.large(v-model="edit.chat.show" as="post")
        i.mdi.mdi-file-document-box
      btn.large(v-model="edit.chat.show" as="talk") 
        i.mdi.mdi-comment-text
      btn.large(v-model="edit.chat.show" as="report")
        i.mdi.mdi-note-text
    | &nbsp;
    span
      btn.large(v-model="edit.chat.deco" as="giji")
        i.mdi.mdi-file-document
      btn.large(v-model="edit.chat.deco" as="dagre")
        i.mdi.mdi-file-image
    span.pull-right(v-if="is_creating")
      btn(v-for="phase in phases" v-model="edit.phase.handle" :class="phase.handle" :key="phase.handle" :as="phase.handle") {{ phase.label }}
    span.pull-right(v-if="is_replacing")
      a.btn.active(@click="create_mode")
        i.mdi.mdi-open-in-new
      a.btn.active(@click="remove")
        i.mdi.mdi-comment-remove-outline
    text-editor(v-model="edit.chat.log" @icon="icon_change" @drop_image="image_post" @submit="chat_post" :deco="edit.chat.deco" :rows="7" :maxRow="20" :maxSize="999" :is_ban="is_ban" :is_warn="is_warn")

  c-report(handle="footer" deco="center")
    bread-crumb
</template>
<style lang="stylus" scoped>
.large
  font-size: 2.5ex
</style>
<script lang="coffee">
firebase = require "firebase"
{ Query, Set, State } = require "~/plugins/memory-record"
{ vuex_value } = require '~/plugins/vuex-helper'

edit = require '~/models/editor'

snap = (collection, target)->
  collection.onSnapshot (q)=>
    console.log target, q.docs.length
    q.docChanges().forEach ({ newIndex, oldIndex, type, doc })=>
      switch type
        when 'added', 'modified'
          Set[target].add doc.data()
        when 'removed'
          Set[target].remove doc.data()

post = (target, doc)->
  { _id } = doc
  target.doc(_id).set doc,
    merge: true

remove = (target, doc)->
  { _id } = doc
  target.doc(_id).delete()

module.exports =
  mixins: [
    require('~/plugins/book')
      loader: true
  ]
  layout: 'blank'
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

    ...vuex_value "menu.side", ["shows"]
    is_show_magnify: ->
      "magnify" in @shows
    is_show_potofs: ->
      "potof" in @shows

    part_id:  -> @book_id + '-1'
    potof_id: -> @book_id + '-' + @edit.potof.face_id
    phase_id: ->
      { _id } = Query.phases.where({ @part_id, handle: @edit.phase.handle }).list[0]
      _id

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

    chat: ->
      Query.chats.find @chat_id
    phase: ->
      @chat?.phase
    handle: ->
      @chat?.handle ? @phase?.handle

    phases: ->
      Query.phases.where({ @part_id }).list

    page_contents: ->
      Query.chats.wiki( @hide_potof_ids, @part_id ).reduce.list

    storage: ->
      firebase.storage()
    image: ->
      @storage.ref().child('images')

    db: ->
      firebase.firestore()

    _book: ->
      @db.settings
        timestampsInSnapshots: true
      @db
      .collection 'wiki'
      .doc @book_id
    _phases: -> @_book.collection 'phases'
    _chats:  -> @_book.collection 'chats'
    _potofs: -> @_book.collection 'potofs'
  }

  methods:
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
      await remove @_chats, { _id }

      return if potof.chats.ids.length
      { _id } = potof
      await remove @_potofs, { _id }
    
    check_post: (target)->
      console.log target

    image_post: (file, next)->
      { state, downloadURL } = await @image.child(file.name).put(file)
      next await downloadURL

    move: ->
      return if @is_creating
      { _id } = @edit.chat
      { write_at } = @chat
      write_at -= 10
      await post @_chats, { _id, write_at }

    chat_post: (log)->
      { _id, show, deco, to } = @edit.chat
      if @is_creating
        potof_id = @potof_id
        write_at = new Date - 0
        _id = [@phase_id, @edit.chat.new_idx()].join('-')
        await post @_chats, { _id, potof_id, write_at, show, deco, to, log }
      else
        await post @_chats, { _id, show, deco, to, log }
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

      await post @_potofs, { _id, face_id, tag_id, job, write_at, sign, uid }
      @icon_change icon

    'icon._id': (_id, old_id)->
      return unless Query.potofs.find _id
      await Promise.all [
        post @_potofs, @icon
        post @_potofs,
          _id: old_id
          icon: ""
      ]

    'icon.icon': (icon)->
      return unless Query.potofs.find @icon._id
      await post @_potofs, @icon

  mounted: ->
    guide = true
    update = true

    Set.book.add
      _id: @book_id
    Set.part.add
      _id: @part_id
      label: 'wiki'
    Set.phase.add { update, guide, _id: @part_id + '-S', handle: 'SSAY',  label: '会話' }
    Set.phase.add { update, guide, _id: @part_id + '-W', handle: 'WSAY',  label: '人狼' }
    Set.phase.add { update, guide, _id: @part_id + '-P', handle: 'PSAY',  label: '結社' }
    Set.phase.add { update, guide, _id: @part_id + '-G', handle: 'GSAY',  label: '墓下' }
    Set.phase.add { update, guide, _id: @part_id + '-F', handle: 'FSAY',  label: '発泡' }
    Set.phase.add { update, guide, _id: @part_id + '-X', handle: 'XSAY',  label: '妖精' }
    Set.phase.add { update, guide, _id: @part_id + '-T', handle: 'TITLE', label: '黒地' }

    snap @_chats,  'chat'
    snap @_phases, 'phase'
    snap @_potofs, 'potof'

  beforeDestroy: ->
    @icon.icon = ""
    return unless Query.potofs.find @icon._id
    await post @_potofs, @icon


</script>
