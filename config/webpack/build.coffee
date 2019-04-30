fs = require 'fs'

babel =
  plugins: [
    "@babel/plugin-transform-modules-commonjs"
    ["@babel/plugin-transform-runtime", { regenerator: true }]
  ]
  presets: [
    [ "@nuxt/babel-preset-app",
      targets:
        node: "8.15.0"
        browsers: [
          ">1%",
          "not ie 11",
          "not op_mini all",
        ]
    ]
  ]


_loaders =
  coffee:
    test: /\.coffee$/
    loader: 'coffee-loader'
    options:
      sourceMap: true
      transpile: babel

module.exports =
  extend: (config, { isDev, isClient, isServer, loaders })=>
    config.resolve.extensions.push '.coffee', '.yml'

    ###
    config.entry =
      sow: './sow/index.coffee'
    config.output.filename      =  "[name]-[chunkhash].js"
    config.output.chunkFilename =  "[name]-c-[chunkhash].js"
    config.plugins[0].options.filename      = "[name]-[contenthash].css"
    config.plugins[0].options.chunkFilename = "[name]-c-[contenthash].css"
    ###

    fs.writeFile "./config/webpack/result-#{config.name}-#{config.mode}.json", JSON.stringify(config, null, "  "), (err)->
      console.log err

  parallel: true
  extractCSS: true
  babel: babel
