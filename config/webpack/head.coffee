#####
# Headers of the page
#
yaml = require 'js-yaml'
fs   = require 'fs'
pkg  = require '../../package'
{ url } = yaml.safeLoad fs.readFileSync "config/live.yml", 'utf8'

module.exports =
  title: pkg.name
  meta: [
    { charset: 'utf-8' }
    { name: 'view', content: 'width=device-width, initial-scale=0.5, shrink-to-fit=no' }
    { hid: 'description', content: pkg.description }
    { href: pkg.author }
  ]
  link: [
    { rel: 'manifest', href: '/manifest.json'}
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    { href: pkg.author }
  ]
  script: [
    { src: url.assets + '/lib/monaco-editor/min/vs/loader.js', type: 'text/javascript', charset: 'utf8' }
  ]
