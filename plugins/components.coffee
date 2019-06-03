Vue = require "vue"

{ Query } = require 'memory-orm'
{ url } = require "~/config/live.yml"

if window?
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
for fname in ctx.keys()
  name = fname[2.. -(".vue".length + 1)]
  try
    Vue.component name, ctx(fname).default
  catch e
    console.log e
    true

ctx = require.context "~/components/filters", true, ///(.+)\.coffee$///
for fname in ctx.keys()
  name = fname[2.. -(".coffee".length + 1)]
  Vue.filter name, ctx(fname)

Vue.config.ignoredElements = ['trix-editor']

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

if window?
  live = require "~/config/live.yml"
  firebase = require "firebase"
  require 'firebase/firestore'

  firebase.initializeApp live.firebase
