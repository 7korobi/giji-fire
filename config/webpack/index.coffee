module.exports =
  head: require("./head.coffee")

  loading:
    color: '#3B8070'
  css: []
  plugins: []
  modules: [
    '~/config/webpack/extention.js'
    ['@nuxtjs/pwa', { icon: false } ]
  ]

  extensions: ['coffee', 'yml']
  build: require("./build.coffee")
  generate: require("./generate.coffee")

  render: require("./render.coffee")
  router: require("./router.coffee")

  workbox: require("./workbox.coffee")

  manifest:
    name: '人狼議事'
    lang: 'ja'
