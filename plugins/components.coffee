Vue = require "vue"
Marked = require 'vue-markup/lib/marked.vue'
Dagre = require 'vue-markup/lib/dagre.vue'

{ Query } = require "~/plugins/memory-record"
{ url } = require "~/config/live.yml"

if window?
  Vue = Vue.default
Marked = Marked.default
Dagre = Dagre.default

Marked.options.silent = false

Object.assign Marked.options.renderer,
  url: (href)->
    switch
      when Query.faces.find(href)
        "#{url.assets}/images/portrate/#{ href }.jpg"
      else
        href

  cite_exist: (cite)->
    Query.chats.find(cite)

Object.assign Dagre.options.renderer,
  node: (v, label)->
    console.log { v, label }

  href: (key)->
    "#{url.assets}/images/portrate/#{ key }.jpg"

  dic: (v)->
    job = Query.chr_jobs
    .search v
    .list[0]
    switch
      when !! job?.face
        ["icon", job.face.id, job.face.name]
      else
        ["box", v, v]


Vue.component 'g-dagre',  Dagre
Vue.component 'g-marked', Marked

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
