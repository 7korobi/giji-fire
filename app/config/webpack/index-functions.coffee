nodeExternals = require 'webpack-node-externals'
path = require 'path'
current = process.cwd()

babel =
  plugins: [
    "@babel/plugin-transform-modules-commonjs"
    ["@babel/plugin-transform-runtime", { regenerator: true }]
  ]
  presets: [
    [ "@nuxt/babel-preset-app",
      targets:
        node: "8.15.0"
      useBuiltIns: "usage"
    ]
  ]

coffee =
  test: /\.coffee$/
  loader: 'coffee-loader'
  options:
    sourceMap: true
    transpile: babel

yml =
  test: /\.yml$/,
  loader: 'json-loader!yaml-loader'

vue =
  test: /\.vue$/,
  loader: 'vue-loader'

module.exports =
  mode: 'production'
  entry:
    'functions/index':               './functions/api/index.coffee'
    'static/firebase-messaging-sw':  './app/plugins/firebase-messaging-index.coffee'
  output:
    path: current
    filename: '[name].js' # Important
    libraryTarget: 'this' # Important

  target: 'node' # Important
  devtool: 'source-map'
  module:
    rules: [
      coffee
      yml
      vue
    ]

  resolve:
    extensions: [ '.coffee', '.yml', '.js' ]
    alias:
      '@': current
      '~': current

  plugins: []
  externals: [nodeExternals()] # Important
