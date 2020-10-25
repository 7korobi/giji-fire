Vue = require "vue"

{ Query, State } = require 'memory-orm'
{ url } = require "~/../giji/config/yaml/live.yml"

if window?
  live = require "~/../giji/config/yaml/live.yml"
  firebase = require "firebase/app"
  require 'firebase/auth'
  require 'firebase/firestore'
  require 'firebase/functions'
  require 'firebase/messaging'
  firebase.initializeApp live.firebase

  Toasted = require 'vue-toasted'
  Vue = Vue.default
  Vue.use Toasted.default,
    position: 'top-right'
    duration: 3000
    containerClass: 'toast'
    iconPack: 'mdi'
    theme: 'bubble'
    singleton: false
    fullWidth: false
    closeOnSwipe: true

  Vue.toasted.register 'client_error', (payload)=>
    return payload.message || "Ooops.. Something Went Wrong.."
  ,
    position: 'top-left'

ctx = require.context "~/components", true, ///(.+)\.vue$///
for pathname in ctx.keys()
  fname = pathname.split("/").pop()
  name = fname[.. -(".vue".length + 1)]
  try
    Vue.component name, ctx(pathname).default
  catch e
    console.log e
    true

ctx = require.context "~/app/filters", true, ///(.+)\.coffee$///
for fname in ctx.keys()
  name = fname[2.. -(".coffee".length + 1)]
  Vue.filter name, ctx(fname)

Vue.config.ignoredElements = ['trix-editor', 'trix-toolbar']
Vue.mixin State.mixin

###
# ElementUI section #####
#
#element = (module)->
#  module = module.default
#  Vue.component module.name, module
#
#lang = require 'element-ui/lib/locale/lang/en'
#locale = require 'element-ui/lib/locale'
#locale.use lang

#element require 'element-ui/lib/transitions/collapse-transition'
