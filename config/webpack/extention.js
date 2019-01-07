
// see https://browserl.ist/?q=>0.5%%25%2c+not+ie+11%2c+not+op_mini+all
const babel = {
  plugins: [
    "@babel/plugin-transform-modules-commonjs",
  ],
  presets: [
    [ "@nuxt/babel-preset-app", {
      targets: {
        node: "6.11.5",
        browsers: [
          ">0.5%",
          "not ie 11",
          "not op_mini all",
        ],
      }
    }]
  ],
}

const loaders = {
  svg: {
    test: /\.svg$/,
    use: [{
      loader: 'html-loader',
      options: {
        minimize: true,
      },
    }]
  },
  coffee: {
    test: /\.coffee$/,
    loader: 'coffee-loader',
    options: {
      sourceMap: true,
      transpile: babel,
    }
  },
  yml: {
    test: /\.yml$/,
    loader: 'json-loader!yaml-loader'
  },
  md: {
    test: /\.md$/,
    loader: 'marked-pre-loader',
    options: {
      appendTsSuffixTo: ['\\.vue$'],
      tag: 'article',
      gfm: true,
      tables: true,
      breaks: true,
      taskLists: true,
      smartLists: true,
      smartypants: true,
      pedantic: false,
      sanitize: false,
      indentCode: false,
    }
  },
}

module.exports = function (options) {
  // Add .coffee extension for store, middleware and more
  // Extend build
  this.extendBuild(config => {
    config.resolve.extensions.push('.coffee', '.yml')
    for ( rule of config.module.rules) {
      console.log(rule.test)
      if ( rule.test.exec(".svg") ){
        rule.test = /\.(png|jpe?g|gif|webp)$/
      }
      if ( rule.test.exec(".js") ){
        console.log(rule.include)
        console.log(rule.exclude.toString())
        const super_call = rule.exclude
        rule.exclude = (file) => {
          if (/node_modules\/parchment/.test( file )) return false
          if (/node_modules\/quill/    .test( file )) return false
          return super_call( file )
        }
      }
    }
    for (const key in loaders) {
      const loader = loaders[key]
      config.module.rules.push(loader)
    }
  })
}
