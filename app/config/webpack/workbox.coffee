

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
    asset '10y', '2018-08-29', 'https://cdn.materialdesignicons.com/*/*/*'
    asset '10y', '2018-08-29', 'https://giji.f5.si/images/*'
    asset '10y', '2018-08-29', 'https://giji.f5.si/font/*'
  ]
  importScripts: [
    'firebase-messaging-sw.js'
  ]
