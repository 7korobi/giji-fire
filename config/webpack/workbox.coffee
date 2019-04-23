

{ to_sec } = require "vue-petit-store"

asset = (timer, c, u)->
  urlPattern: u
  handler: 'cacheFirst'
  method: 'GET'
  strategyOptions:
    cacheName: c
    cacheExpiration:
      maxAgeSeconds: to_sec timer

api = (timer, c, u)->
  urlPattern: u
  handler: 'staleWhileRevalidate'
  method: 'GET'
  strategyOptions:
    cacheName: c
    cacheExpiration:
      maxAgeSeconds: to_sec timer

module.exports =
  runtimeCaching: [
    asset '10y', '2018-08-29', 'https://giji.f5.si/images/*'
    asset '10y', '2018-08-29', 'https://giji.f5.si/font/*'
    asset '10y', '2019-02-15', 'https://giji.f5.si/css/*'
    asset '10y', '2019-01-20', 'https://giji-db923.firebaseapp.com/images/*'
    asset '10y', '2018-08-29', 'https://giji-db923.firebaseapp.com/font/*'
    asset ' 5m', '2019-04-23', 'https://giji-db923.firebaseapp.com/css/*'
    asset '10y', '2018-08-29', 'https://cdn.materialdesignicons.com/*/*/*'

  ]
  importScripts: [
    'firebase-messaging-sw.js'
  ]
