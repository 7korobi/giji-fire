module.exports =
  mode: 'spa'
  modern: 'client'
  head:     require "./head.coffee"
  build:    require "./build.coffee"
  generate: require "./generate.coffee"
  router:   require "./router.coffee"
  workbox:  require "./workbox.coffee"

  loading:
    color: '#fff'
  css: []
  plugins: []
  modules: [
    '~/app/config/webpack/extention.js'
    ['@nuxtjs/pwa', { icon: false } ]
    ['@nuxtjs/google-analytics', { id: 'UA-16547346-4' }]
  ]

  manifest:
    name: '人狼議事'
    lang: 'ja'
