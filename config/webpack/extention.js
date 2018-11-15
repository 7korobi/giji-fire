const babel = {
  plugins: [
    "@babel/plugin-transform-modules-commonjs",
  ],
  presets: [
    [ "@nuxtjs/babel-preset-app", {
      targets: {
        node: "6.11.5",
        browsers: [
          "last 1 versions"
        ]
      }
    }]
  ]
}


const whitelist = [
  RegExp(`node_modules/quill-`),
  RegExp(`\./nuxt/`),
]
const not_loaders = {
  js: {
    test: /\.js$/,
    loader: 'babel-loader',
    options: Object.assign({
      include: (path)=> {
        if ( whitelist[0].exec(path) ) {
          throw new Error(JSON.stringify(path))
        }
        for ( const rule of whitelist ) {
          if (rule.exec(path)){
            return true
          }
        }
        return false
      },
    }, babel),
  },
}


const loaders = {
  coffee: {
    test: /\.coffee$/,
    loader: 'coffee-loader',
    options: {
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
    for (const key in loaders) {
      const loader = loaders[key]
      config.module.rules.push(loader)
    }
  })
}
