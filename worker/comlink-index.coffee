Comlink = require 'comlink'

{ State, Model, Query, Rule, Set, Finder } = require "memory-orm"
FetchApi = require "./fetch-api.coffee"

broadcasts = []

self.onconnect = (e)->
  [port] = e.ports
  Comlink.expose {
    ...FetchApi
    add: (cb)->
      broadcasts.push cb
      broadcasts.length - 1
    del: (idx)->
      delete broadcasts[idx]
    
    copy: (...keys)->
      JSON.stringify keys.map (key)->
        [ Query[key].$sort
          Query[key]._finder.format
          Query[key].memory
        ]
  }, port


