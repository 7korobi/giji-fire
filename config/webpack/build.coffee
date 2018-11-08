
module.exports =
  extend: (config, { isDev, isClient })->


  extractCSS: true

  babel:
    plugins: [
      "@babel/plugin-transform-modules-commonjs"
    ]
    presets: [
      [ "@nuxtjs/babel-preset-app",
        targets:
          browsers: [
            "last 1 versions"
          ]
      ]
    ]

  vendor: [
  ]

  loaders: [
  ]

