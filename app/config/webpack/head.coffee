#####
# Headers of the page
#
yaml = require 'js-yaml'
fs   = require 'fs'
pkg  = require '../../../package'
{ url } = yaml.safeLoad fs.readFileSync "app/config/live.yml", 'utf8'

module.exports =
  title: pkg.description
  meta: [
    { charset: 'utf-8' }
    { href: pkg.author }
    { hid: 'description', content: pkg.description }
    { name: "google-site-verification", content: "Yrpo5-YleKjRAidW8yT7TXWCfKlgi5gEppIoqc_-xio" }
    { name: "apple-mobile-web-app-title", content: pkg.description }
    { name: "application-name", content: pkg.description }
    { name: "msapplication-TileColor", content: "#c1b57f"}
    { name: "msapplication-config", content: "/browserconfig.xml"}
    { name: "theme-color", content: "#c1b57f"}
  ]
  link: [
    { href: pkg.author }

    { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.materialdesignicons.com/3.4.93/css/materialdesignicons.min.css' }
    { rel: 'stylesheet', type: 'text/css', href: url.style + '/css/index.use.css' }

    { rel: 'manifest', href: '/manifest.json'}
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    { rel: "apple-touch-icon",       sizes: "180x180", href: "/images/icon/apple-touch-icon.png" }
    { rel: "icon", type: "image/png", sizes:  "32x32",  href: "/images/icon/favicon-32x32.png" }
    { rel: "icon", type: "image/png", sizes:  "16x16",  href: "/images/icon/favicon-16x16.png" }
    { rel: "mask-icon", href: "/images/icon/safari-pinned-tab.svg", color: "#c1b57f" }
    { rel: "shortcut icon", href: "/images/icon/favicon.ico" }
  ]
  script: [
  ]
