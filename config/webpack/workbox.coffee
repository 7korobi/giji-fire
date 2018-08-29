

to_sec = (str)->
  timeout = 0
  str.replace /(\d+)(.)|0/g, (_, num, unit)->
    return unless num = Number num
    timeout +=
      switch unit
        when "s"
          num
        when "m"
          60 * num
        when "h"
          3600 * num
        when "d"
          3600 * 24 * num
        when "y"
          3600 * 24 * 365 * num
        else
          throw new Error "#{timestr} at #{num}#{unit}"
  timeout

asset = (c, u)->
  urlPattern: u
  handler: 'cacheFirst'
  method: 'GET'
  strategyOptions:
    cacheName: c
    cacheExpiration:
      maxAgeSeconds: to_sec '100y'

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
    asset       '2018-08-29', 'https://api-project-54633717694.firebaseapp.com/images/portrate/*'
    asset       '2018-08-29', 'https://api-project-54633717694.firebaseapp.com/font/*.woff2'
    asset       '2018-08-29', 'https://api-project-54633717694.firebaseapp.com/css/*.css'
    asset       '2018-08-29', 'https://cdn.materialdesignicons.com/*/fonts/*'

    api  '12h', '2018-08-29', "https://s3-ap-northeast-1.amazonaws.com/giji-assets/aggregate/faces/index.json"
    api  '10y', '2018-08-29', "https://s3-ap-northeast-1.amazonaws.com/giji-assets/sow/*.json"
    api   '6h', '2018-08-29', "https://s3-ap-northeast-1.amazonaws.com/giji-assets/sow/index.json"
    api   '1h', '2018-08-29', "https://giji-api.duckdns.org/api/story/progress"
    api  '12h', '2018-08-29', "https://giji-api.duckdns.org/api/aggregate/faces/*"
  ]
  importScripts: [
    'firebase-messaging-sw.js'
  ]
