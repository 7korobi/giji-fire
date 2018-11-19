#####
# Headers of the page
#
yaml = require 'js-yaml'
fs   = require 'fs'
pkg  = require '../../package'
{ url } = yaml.safeLoad fs.readFileSync "config/live.yml", 'utf8'

module.exports =
  title: pkg.description
  meta: [
    { charset: 'utf-8' }
    { hid: 'description', content: pkg.description }
    { href: pkg.author }
  ]
  link: [
    { rel: 'stylesheet', type: 'text/css', href: '/lib/quill/quill.bubble.css' }
    { rel: 'manifest', href: '/manifest.json'}
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    { href: pkg.author }
  ]
  script: [
    { src: '/lib/quill/quill.min.js', type: 'text/javascript', charset: 'utf8' }
    { src: '/lib/quill/image-resize.min.js', type: 'text/javascript', charset: 'utf8' }
    { src: '/lib/quill/image-drop.min.js', type: 'text/javascript', charset: 'utf8' }
  ]
