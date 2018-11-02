nodeExternals = require 'webpack-node-externals'
path = require 'path'
current = process.cwd()

coffee =
  test: /\.coffee$/
  loader: 'coffee-loader'
  options:
    transpile:
      presets: [
        "vue-app",
        [ "env",
          targets:
            node: "6.11.5"
          forceAllTransforms: true
        ]
      ]

yml =
  test: /\.yml$/,
  loader: 'json-loader!yaml-loader'

vue =
  test: /\.vue$/,
  loader: 'vue-loader'

module.exports =
  mode: 'production'
  entry:
    'functions/index': './functions/api/index.coffee'
    'static/comlink':                './worker/comlink-index.coffee'
    'static/firebase-messaging-sw':  './worker/firebase-messaging-index.coffee'
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
