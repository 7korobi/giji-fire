
module.exports =
  extend: (config, { isDev, isClient })->

  extractCSS: true

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
  ]

  loaders: [
  ]

