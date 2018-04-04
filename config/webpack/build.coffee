ExtractTextPlugin = require 'extract-text-webpack-plugin'

module.exports =
  extend: (config, { isDev, isClient })->

  # publicPath: 'https://api-project-54633717694.firebaseapp.com/'

  babel:
    presets: [
      "vue-app"
      [ "env"
        targets:
          browsers: [
            "> 5%"
          ]
        forceAllTransforms: true
      ]
    ]

  vendor: [
    'lodash'
    '~/plugins/components.coffee'
    '~/plugins/memory-record.coffee'
  ]

  loaders: [
    test: /\.(png|jpe?g|gif|svg)$/
    loader: 'url-loader'
    query:
      limit: 1000 # 1KO
      name: 'img/[name].[hash:7].[ext]'
  ,
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/
    loader: 'url-loader'
    query:
      limit: 1000 # 1KO
      name: 'fonts/[name].[hash:7].[ext]'
  ]
