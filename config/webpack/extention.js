const loaders = {
  coffee: {
    test: /\.coffee$/,
    loader: 'coffee-loader'
  },
  yml: {
    test: /\.yml$/,
    loader: 'json-loader!yaml-loader'
  },
  pug: {
    test: /\.pug$/,
    loader: 'pug-html-loader',
    query: {
      pretty: true
    }
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
  this.nuxt.options.extensions.push('coffee', 'yml')

  // Extend build
  this.extendBuild(config => {
    config.resolve.extensions.push('.coffee', '.yml')
    for(const rule of config.module.rules) {
      if ('vue-loader' === rule.loader) {
        Object.assign( rule.options.loaders, loaders )
      }
    }
    for (const key in loaders) {
      const loader = loaders[key]
      config.module.rules.push(loader)
    }
  })
}
