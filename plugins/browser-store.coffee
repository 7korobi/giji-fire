_ = require "lodash"
{ types, relative_to } = require "~/plugins/struct"

browser_store = bs = (method, browser_key)->
  db: db = bs[method]
  pack: (computed, {to_str}, key, val)->
    computed[key] =
      get: ->
        @$data[browser_key][key]

      set: (newVal)->
        if newVal?
          db.setItem key, to_str newVal
        else
          db.removeItem key
        @$data[browser_key][key] = newVal

get_value_by_store = (db, by_str, key, val)->
  o = by_str db.getItem key
  o ? val

get_value_by_route = (src, by_url, key, val)->
  value = src.params[key] || src.query[key]
  if value
    by_url value
  else
    val

router_store = (method, browser_key)->
  pack: (computed, {by_url}, key, val)->
    computed[key] =
      get: ->
        @$data[browser_key][key]

      set: (newVal)->
        return if @[key] == newVal
        o = {}
        o[key] = newVal
        { location, href } = @$router.resolve relative_to @$route, o, true
        @$data[browser_key][key] = newVal
        history?["#{method}State"] null, null, href
        @$route = { ...@$route, ...location }

try
  test = '__vue-localstorage-test__'
  Cookie = require 'tiny-cookie'

  bs.cookie =
    getItem:    (key)->     Cookie.get(key) ? null
    setItem:    (key, s)->  Cookie.set key, s, expires: '1M'
    removeItem: (key)->     Cookie.remove key
  bs.cookie.setItem test, test
  bs.cookie.removeItem test

  bs.local = window.localStorage
  bs.local.setItem test, test
  bs.local.removeItem test

  bs.session = window.sessionStorage
  bs.session.setItem test, test
  bs.session.removeItem test
  history || throw new Error "can't use history API."
catch e
  console.error 'Local storage not supported by this browser'
  bs.cookie = bs.local = bs.session =
    _data: {}
    getItem:    (key)->    @_data[key] ? null
    setItem:    (key, s)-> @_data[key] = s
    removeItem: (key)->    delete @_data[key]


idx = 0
module.exports = (args1)->
  browser_key = "$browser#{++idx}"
  $browser = {}
  stores = {}
  routes = {}

  computed = {}
  methods = {}
  watch = {}

  if args1.watch
    unless args1.watch.call
      watch = args1.watch


  beforeRouteUpdate = (newRoute, oldRoute, next)->
    next()
    for key, { by_url, value } of routes
      newVal = get_value_by_route newRoute, by_url, key, value
      $browser[key] = newVal

  pack = (method, key, value)->
    type = types[value.constructor]

    switch method
      when "watch"
        return

      when "replace", "push"
        setter = router_store method, browser_key
        routes[key] =
          by_url: type.by_url
          value:  value

      when "cookie", "local", "session"
        setter = browser_store method, browser_key
        stores[key] =
          db: setter.db
          by_str: type.by_str
          value: value

    $browser[key] = value
    setter.pack computed, type, key, value
    if args1.watch?.call
      watch[key] = args1.watch

  for method, args2 of args1
    for key, val of args2
      pack method, key, val

  data = ->
    oldVals =
      for key of watch
        [key, _.get($browser, key) ]

    for key, { db, by_str, value } of stores
      oldVal = $browser[key]
      $browser[key] = newVal = get_value_by_store db, by_str, key, value

    for key, { by_url, value } of routes
      oldVal = $browser[key]
      $browser[key] = newVal = get_value_by_route @$route, by_url, key, value

    @$nextTick =>
      for [key, oldVal] in oldVals
        newVal = _.get $browser, key
        watch[key].call @, newVal, oldVal, key
    o = {}
    o[browser_key] = $browser
    o

  { watch, computed, methods, beforeRouteUpdate, data }

module.exports.capture = (req)->
  { cookie } = req.headers
  if cookie
    for s in cookie.split /; */
      bs.cookie.setItem ...s.split /=/
