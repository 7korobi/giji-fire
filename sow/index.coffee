require "~/models/index"
require '~/plugins/components'

Mem = require 'memory-orm'

Vue = require 'vue'
Vuex = require 'vuex'
VueRouter = require 'vue-router'
VueMeta = require 'vue-meta'

if window?
  Vue  = Vue.default
  Vuex = Vuex.default
  Vue.use Vuex
  Vue.use VueRouter
  Vue.use VueMeta,
    keyName: 'head'
    attribute: 'data-n-head'
    ssrAttribute: 'data-n-head-server-rendered'
    tagIDKeyName: 'data-hid'

  Vue.component "nuxt-link", require('./nuxt-link.vue').default

  store = new Vuex.Store
    modules:
      menu: require '~/store/menu'

  fit = (name, o)->
    el = "##{name}"
    if document.querySelector el
      window.vue[name] = new Vue Object.assign {}, o.default, { store, el }

  window.Mem = Mem
  window.vue = {}
  fit 'top',        require './top.vue'
  fit 'top2',       require './top2.vue'
  fit 'top3',       require './top3.vue'
  fit 'footer',     require './footer.vue'

  fit 'floats',     require './floats.vue'
  fit 'tools',      require './tools.vue'
  fit 'typefilter', require './typefilter.vue'
  fit 'icons',      require './icons.vue'


window.chrImgChange = ( target, select, prefix, csid, postfix )->
  i     = select.selectedIndex
  value = select.options[i].value + postfix
  path  = prefix + value.replace csid, ""
  target.src = path

window.changeSayDisplays = ->
  for o in document.querySelectorAll('.message_filter')
    { id } = o
    [logno, logpno, mestype] = id.split '_'
    display = "block"
    if pno_hide || type_hide
      display = "none"
    o.style.display = display
