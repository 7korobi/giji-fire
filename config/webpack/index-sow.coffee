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

yml =
  test: /\.yml$/,
  loader: 'json-loader!yaml-loader'

vue =
  test: /\.vue$/,
  loader: 'vue-loader'

coffee =
  test: /\.coffee$/
  use: [
    loader: 'coffee-loader'
    options:
      sourceMap: true
      transpile:
        plugins: [
          "@babel/plugin-transform-modules-commonjs",
          ["@babel/plugin-transform-runtime", { regenerator: true }]
        ],
        presets: [[
          "@nuxt/babel-preset-app",
            targets:
            browsers: [
              ">0.5%",
              "not ie 11",
              "not op_mini all",
            ]
        ]]
  ]

module.exports =
  mode: 'production'
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
