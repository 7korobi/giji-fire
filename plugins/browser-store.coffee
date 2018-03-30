_ = require "lodash"
{ types, relative_to } = require "~/plugins/struct"

browser_store = bs = (method)->
  db: db = bs[method]
  pack: (computed, {to_str}, key, val)->
    computed[key] =
      get: ->
        @$data.$browser[key]

      set: (newVal)->
        if newVal?
          db.setItem key, to_str newVal
        else
          db.removeItem key
        @$data.$browser[key] = newVal

get_value_by_store = (db, by_str, key, val)->
  o = by_str db.getItem key
  o ? val

get_value_by_route = (src, by_url, key, val)->
  value = src.params[key] || src.query[key]
  if value
    by_url value
  else
    val

router = (method)->
  pack: (computed, {by_url}, key, val)->
    computed[key] =
      get: -> get_value_by_route @$route, by_url, key, val
      set: (newVal)->
        @$router[method] relative_to @$route,
          "#{key}": newVal

watcher = (method)->
  pack: (computed, {by_url}, key, val)->
    computed[key] =
      get: ->
        @$data.$browser[key]
      set: (newVal)->
        o = {}
        o[key] = newVal
        { location, href } = @$router.resolve relative_to @$route, o
        @$data.$browser[key] = newVal
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


module.exports = (args1)->
  $browser = {}
  computed = {}
  methods = {}
  watch = {}

  cb = args1.watch

  stores = {}
  watchs = {}
  routes = {}
  beforeRouteUpdate = (newRoute, oldRoute, next)->
    next()
    for key, { by_url, value } of routes
      newVal = get_value_by_route newRoute, by_url, key, value
      oldVal = get_value_by_route oldRoute, by_url, key, value
      unless newVal == oldVal
        console.log "beforeRouteUpdate(#{key}) #{newVal} != #{oldVal}"
        cb?.call @, newVal, oldVal, key

  data = ->
    for key, { db, by_str, value } of stores
      $browser[key] = value = get_value_by_store db, by_str, key, value
    for key, { by_url, value } of watchs
      $browser[key] = get_value_by_route @$route, by_url, key, value
    { $browser }

  pack = (method, key, value)->
    type = types[value.constructor]

    switch method
      when ""
        setter = router(method)
        routes[key] =
          by_url: type.by_url
          value:  value

      when "replace", "push"
        setter = watcher(method)
        $browser[key] = value
        watchs[key] =
          by_url: type.by_url
          value:  value

      when "cookie", "local", "session"
        setter = browser_store(method)
        $browser[key] = value
        stores[key] =
          db: setter.db
          by_str: type.by_str
          value: value

    setter.pack computed, type, key, value
    if cb?
      watch[key] = (newVal, oldVal)->
        return if _.isEqual newVal, oldVal
        cb.call @, newVal, oldVal, key

  for method, args2 of args1
    for key, val of args2
      pack method, key, val

  { data, watch, computed, methods, beforeRouteUpdate }

module.exports.capture = (req)->
  { cookie } = req.headers
  if cookie
    for s in cookie.split /; */
      bs.cookie.setItem ...s.split /=/
