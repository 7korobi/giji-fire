path = require 'path'
webpack = require 'webpack'
# MiniCssExtractPlugin = require "mini-css-extract-plugin"
#
# stylesheet = new MiniCssExtractPlugin
#   filename: 'css/sow.css'

current = process.cwd()

sass =
  test: /\.sass/,
  use: [
    'css-loader'
    'sass-loader'
  ]

coffee =
  test: /\.coffee$/,
  loader: 'babel-loader!coffee-loader'

yml =
  test: /\.yml$/,
  loader: 'json-loader!yaml-loader'

vue =
  test: /\.vue$/,
  loader: 'vue-loader'

module.exports =
  entry:
    'static/sow/index': './sow/index.coffee'
  output:
    path: current
    filename: '[name].js' # Important

  devtool: 'source-map'
  module:
    rules: [
      sass
      coffee
      yml
      vue
    ]

  resolve:
    extensions: [ '.coffee', '.yml', '.js' ]
    alias:
      '@': current
      '~': current

  plugins: [
    new webpack.DefinePlugin
      'process.env.NODE_ENV': JSON.stringify 'production'
  ]