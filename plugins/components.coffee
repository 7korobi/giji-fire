Vue = require "vue"

{ MarkSVG, Marked } = require '~/node_modules/vue-markup/src/index'
# { MarkSVG, Marked } = require 'vue-markup'

{ Query } = require "memory-orm"
{ url } = require "~/config/live.yml"

if window?
  Vue = Vue.default

Object.assign MarkSVG.options.renderer,
  href: (key)->
    "#{url.assets}/images/portrate/#{ key }.jpg"

  dic: (v)->
    job = Query.chr_jobs
    .search v
    .list[0]
    switch
      when !! job?.face
        for key in [ job.face.name, job.job ]
          if key.includes v
            v = key
        ["icon", job.face.id, v]
      else
        ["box", v, v]

Vue.component 'marksvg-view', MarkSVG

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
