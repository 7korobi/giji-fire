babel =
  plugins: [
    "@babel/plugin-transform-modules-commonjs"
  ]
  presets: [
    [ "@nuxt/babel-preset-app",
      targets:
        node: "6.11.5"
        browsers: [
          "last 1 versions"
        ]
    ]
  ]

module.exports =
  extend: (config, { isDev, isClient, isServer, loaders })=>
    console.log loaders

  extractCSS: true
  loaders:
    yml: {}
    coffee:
      transpile: babel
  babel: babel

