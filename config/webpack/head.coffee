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
    { href: pkg.author }
    { hid: 'description', content: pkg.description }
    { name: "apple-mobile-web-app-title", content: pkg.description }
    { name: "application-name", content: pkg.description }
    { name: "msapplication-TileColor", content: "#c1b57f"}
    { name: "msapplication-config", content: "/browserconfig.xml"}
    { name: "theme-color", content: "#c1b57f"}
  ]
  link: [
    { href: pkg.author }
    { rel: 'manifest', href: '/manifest.json'}
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    { rel: "apple-touch-icon",       sizes: "180x180", href: "/images/icon/apple-touch-icon.png" }
    { rel: "icon", type: "image/png", sizes:  "32x32",  href: "/images/icon/favicon-32x32.png" }
    { rel: "icon", type: "image/png", sizes:  "16x16",  href: "/images/icon/favicon-16x16.png" }
    { rel: "mask-icon", href: "/images/icon/safari-pinned-tab.svg", color: "#c1b57f" }
    { rel: "shortcut icon", href: "/images/icon/favicon.ico" }


  ]
  script: [
    { src: '/lib/quill/quill.min.js', type: 'text/javascript', charset: 'utf8' }
  ]
