{ mount, createLocalVue } = require '@vue/test-utils'
localVue = createLocalVue()
Vuex = require 'vuex'
VueRouter = require 'vue-router'

localVue.use Vuex
localVue.use VueRouter

router = new VueRouter
  mode: 'history'

{ Set } = require 'memory-orm'

snap = ({ module, name, propsData, store })->
  describe name, =>
    test 'snapshot', =>
      wrapper = mount module, { propsData, store, localVue, router }
      expect( wrapper.vm.$el ).toMatchSnapshot()
    undefined
snap
  name: 'AppLogo'
  module: require '~/components/AppLogo.vue'

snap
  name: 'AFooter'
  module: require '~/components/a-footer.vue'

snap
  name: 'AHeader'
  module: require '~/components/a-header.vue'
  propsData:
    title: "人狼議事"

snap
  name: 'BreadCrumb'
  module: require '~/components/bread-crumb.vue'

snap
  name: 'BtnMarker'
  module: require '~/components/btn-marker.vue'
  store: new Vuex.Store
    firebase:
      user:
        uid: "TEST-UID"
  propsData:
    back_url:
      query:
        idx: "test-1-top"
    write_at: 1
    log: {}

snap
  name: 'Btn off'
  module: require '~/components/btn.vue'
  propsData:
    as: 10
    value: 5

snap
  name: 'Btn on'
  module: require '~/components/btn.vue'
  propsData:
    as: 10
    value: 10

snap
  name: 'Btn include off'
  module: require '~/components/btn.vue'
  propsData:
    as: [10]
    value: [5]
    bool: 'include'

snap
  name: 'Btn include on'
  module: require '~/components/btn.vue'
  propsData:
    as: [10,5]
    value: [5]
    bool: 'include'

snap
  name: 'Check off'
  module: require '~/components/check.vue'
  propsData:
    as:    10
    value: [1,2,3]

snap
  name: 'Check on'
  module: require '~/components/check.vue'
  propsData:
    as:    2
    value: [1,2,3]

snap
  name: 'Check set off'
  module: require '~/components/check.vue'
  propsData:
    as:    [1,2]
    value: [1,2,3]
    set: true

snap
  name: 'Check set on'
  module: require '~/components/check.vue'
  propsData:
    as:    [1,2,3]
    value: [1,2,3]
    set: true

snap
  name: 'ChatFoot'
  module: require '~/components/chat-foot.vue'
  store: new Vuex.Store
    menu:
      side:
        shows: []
  propsData:
    anker: "*TEST*"

snap
  name: 'ChatHead sign'
  module: require '~/components/chat-head.vue'
  propsData:
    full: true
    head: "おなまえ"
    sign: "7korobi"

snap
  name: 'ChatHead to'
  module: require '~/components/chat-head.vue'
  propsData:
    head: "おなまえ"
    to:   "おあいて"

snap
  name: 'DMode'
  module: require '~/components/d-mode.vue'
  propsData:
    mode: "memo"
    part_id: "test-1-1"
    chat_id: "test-1-1-ss-1"
    chat_size: -> 10


require '~/models/index'
localVue.component 'c-hide',   require '~/components/c-hide'
localVue.component 'c-post',   require '~/components/c-post'
localVue.component 'c-report', require '~/components/c-report'
localVue.component 'c-talk',   require '~/components/c-talk'

Set.potof.set [
  _id: 'test-1-1'
  face_id: 'c10'
  job: '自由記入'
]

Set.phase.set [
  _id: 'test-1-1-ss'
  handle: 'SSAY'

]

Set.chat.set chats = [
  _id: 'test-1-1-ss-1'
  potof_id: 'test-1-1'
  show: 'talk'
  deco: 'quill'
  log: 'テスト<strong>文字列</strong>'
  to: "宛先"
  write_at: 1
,
  _id: 'test-1-1-ss-2'
  potof_id: 'test-1-1'
  show: 'talk'
  deco: 'quill'
  log: 'テスト<strong>文字列</strong>'
  write_at: 2
,
  _id: 'test-1-1-ss-3'
  potof_id: 'test-1-1'
  show: 'post'
  deco: 'quill'
  log: 'テスト<strong>文字列</strong>'
  write_at: 3
,
  _id: 'test-1-1-ss-4'
  potof_id: 'test-1-1'
  show: 'report'
  deco: 'quill'
  log: 'テスト<strong>文字列</strong>'
  write_at: 4
,
  _id: 'test-1-1-ss-5'
  potof_id: 'test-1-1'
  show: 'hide'
  deco: 'quill'
  log: 'テスト<strong>文字列</strong>'
  write_at: 5
,
  _id: 'test-1-1-ss-6'
  potof_id: 'test-1-1'
  show: 'hide'
  deco: 'diagram'
  data:
    clusters: []
    icons: []
    lines: []
  write_at: 6
]

chat = (chat, opt)->
  snap
    name: "Chat #{chat.idx}"
    module: require '~/components/chat.vue'
    propsData:
      id: chat.id
      current: chat
      phases: []
      edit: opt.edit
    store: new Vuex.Store
      menu:
        top:       0
        horizon:  50
        height:  100

for c in chats
  chat c,
    edit: false
  chat c,
    edit: true
