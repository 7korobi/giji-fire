fs = require 'fs'

module.exports =
  extend: (config, { isDev, isClient, isServer, loaders })=>
    ###
    config.entry =
      sow: './sow/index.coffee'
    config.output.filename      =  "[name]-[chunkhash].js"
    config.output.chunkFilename =  "[name]-c-[chunkhash].js"
    config.plugins[0].options.filename      = "[name]-[contenthash].css"
    config.plugins[0].options.chunkFilename = "[name]-c-[contenthash].css"
    ###

    fs.writeFile "./config/webpack/result-#{config.name}-#{config.mode}.json", JSON.stringify(config, null, "  "), (err)->
    fs.writeFile "./config/webpack/result-#{config.name}-#{config.mode}-rules.json", JSON.stringify(config.module.rules, null, "  "), (err)->

  parallel: true
  extractCSS: true
  # see .babelrc
