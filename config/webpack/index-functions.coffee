nodeExternals = require 'webpack-node-externals'
path = require 'path'
current = process.cwd()

coffee =
  test: /\.coffee$/,
  loader: 'babel-loader!coffee-loader'

yml =
  test: /\.yml$/,
  loader: 'json-loader!yaml-loader'

module.exports =
  entry:
    index:  './functions/api/index.coffee'
    spec: './spec/index.coffee'
  output:
    path: path.join current, 'functions'
    filename: '[name].js' # Important
    libraryTarget: 'this' # Important

  target: 'node' # Important
  devtool: 'source-map'
  module:
    rules: [
      coffee
      yml
    ]

  resolve:
    extensions: [ '.coffee', '.yml', '.js' ]
    alias:
      '~':  current
      '~~': current

  plugins: []
  externals: [nodeExternals()] # Important
