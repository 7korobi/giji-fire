#####
# Headers of the page
#
host = "https://s3-ap-northeast-1.amazonaws.com/giji-assets/nuxt"

module.exports =
  title: '人狼議事'
  meta: [
    { charset: 'utf-8' }
    { name: 'viewport', content: 'width=device-width, initial-scale=0.5, shrink-to-fit=no' }
    { hid: 'description', content: "Nuxt.js project" }
    { href: "mailto:7korobi@gmail.com" }
  ]
  link: [
    { rel: 'manifest', href: '/manifest.json'}
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    { href: "mailto:7korobi@gmail.com" }
  ]
  script: [
    { src: host + '/monaco-editor/vs/loader.js', type: 'text/javascript', charset: 'utf8' }
  ]
