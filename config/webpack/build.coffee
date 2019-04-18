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
          ">0.5%",
          "not ie 11",
          "not op_mini all",
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

