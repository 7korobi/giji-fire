

{ to_sec } = require "../../plugins/to.coffee"

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
  dev: true
  runtimeCaching: [
    asset '10y', '2018-08-29', 'https://giji.f5.si/images/*'
    asset '10y', '2018-08-29', 'https://giji.f5.si/font/*'
    api   '10y', '2019-01-30', 'https://giji.f5.si/css/*'
    asset '10y', '2019-01-20', 'https://giji-db923.firebaseapp.com/images/*'
    api   '10y', '2019-01-30', 'https://giji-db923.firebaseapp.com/css/*'
    asset '10y', '2018-08-29', 'https://cdn.materialdesignicons.com/*/*/*'

  ]
  importScripts: [
    'firebase-messaging-sw.js'
  ]
