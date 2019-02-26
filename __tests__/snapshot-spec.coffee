{ mount } = require '@vue/test-utils'
Vue = require 'vue'
Vuex = require 'vuex'
Vue.use Vuex

snap = ({ module, name, propsData, store })->
  describe name, =>
    test 'snapshot', =>
      wrapper = mount module, { propsData, store }
      expect( wrapper.html() ).toMatchSnapshot()

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
  name: 'Btn 1'
  module: require '~/components/btn.vue'
  propsData:
    as: 10
    value: 5

snap
  name: 'Btn 1'
  module: require '~/components/btn.vue'
  propsData:
    as: [10]
    value: [5]
    bool: 'include'

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
