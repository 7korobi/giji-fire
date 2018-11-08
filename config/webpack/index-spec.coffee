path = require 'path'
current = process.cwd()

coffee =
  test: /\.coffee$/
  loader: 'coffee-loader'
  options:
    transpile:
      plugins: [
        "@babel/plugin-transform-modules-commonjs",
      ],
      presets: [[
        "@nuxtjs/babel-preset-app",
          targets:
            node: "6.11.5"
      ]]

yml =
  test: /\.yml$/,
  loader: 'json-loader!yaml-loader'

vue =
  test: /\.vue$/,
  loader: 'vue-loader'

module.exports =
  mode: 'production'
  entry:
    model_spec: './__tests__/model-spec.coffee'
  output:
    path: path.join current, '__tests__'
    filename: '[name].js' # Important
    libraryTarget: 'this' # Important

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
