const loaders = {
  coffee: {
    test: /\.coffee$/,
    loader: 'coffee-loader',
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
