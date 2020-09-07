const path = require('path')

// see https://browserl.ist/?q=>0.5%%25%2c+not+ie+11%2c+not+op_mini+all
const babel = {
  plugins: [
    "@babel/plugin-transform-modules-commonjs",
    ["@babel/plugin-transform-runtime", { regenerator: true }]
  ],
  presets: [
    [
      "@nuxt/babel-preset-app",
      {
        targets: {
          node: "8.15.0",
          browsers: [">1%", "not ie 11", "not op_mini all"]
        }
      }
    ]
  ]
};

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
  ts: {
    test: /\.ts$/,
    loader: 'ts-loader',
    options: {
      transpileOnly: true
    }
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
    type: 'json',
    loader: 'yaml-loader',
    options: {
      merge: true,
      prettyErrors: true,
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
  // Extend build

  this.nuxt.options.extensions.push('ts', 'coffee', 'yml')
  this.nuxt.hook('build:before', (builder)=>{
    builder.supportedExtensions.push("ts", "coffee", "yml");
  })

  this.extendBuild(config => {
    const babel = config.module.rules.find( rule => String(rule.test) == '/\\.jsx?$/i' );
    console.log(babel);

    config.resolve.extensions.push("ts", ".coffee", ".yml");
    for (const key in loaders) {
      const loader = loaders[key]
      config.module.rules.push(loader)
    }
  })
}
