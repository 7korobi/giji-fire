babel =
  plugins: [
    "@babel/plugin-transform-modules-commonjs"
  ]
  presets: [
    [ "@nuxt/babel-preset-app",
      targets:
        node: "6.11.5"
        browsers: [
          ">0.5%",
#          "not ie 11",
#          "not op_mini all",
        ]
    ]
  ]

module.exports =
  extend: (config, { isDev, isClient, isServer, loaders })=>

  extractCSS: true
  loaders:
    yml: {}
    coffee:
      transpile: babel
  babel: babel

