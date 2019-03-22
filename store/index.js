const VueX = require('vuex')

export default function () {
  return new VueX.Store(require('./index.coffee'))
}