path = require 'path'
current = process.cwd()

coffee =
  test: /\.coffee$/
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
            node: "8.15.0"
      ]]

sass =
  test: /\.sass$/
  loader: 'sass-loader'

pug =
  test: /\.pug$/
  loader: 'pug-plain-loader'

yml =
  test: /\.yml$/
  loader: 'json-loader!yaml-loader'

vue =
  test: /\.vue$/
  loader: 'vue-jest'

module.exports =
  transform:
    '^.+\\.coffee$': 
  output:
    path: path.join current, '__tests__'
    filename: '[name].js' # Important
    libraryTarget: 'this' # Important

  devtool: 'source-map'
  module:
    rules: [
      coffee
      yml
      sass
      pug
      vue
    ]

  resolve:
    extensions: [ '.coffee', '.yml', '.js' ]
    alias:
      '@': current
      '~': current

  plugins: []
