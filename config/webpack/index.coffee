module.exports =
  head: require("./head.coffee")

  loading:
    color: '#3B8070'
  css: []
  plugins: []
  modules: ['~/config/webpack/extention.js']

  extensions: ['coffee', 'yml']
  build: require("./build.coffee")

  render: require("./render.coffee")
  router: require("./router.coffee")
