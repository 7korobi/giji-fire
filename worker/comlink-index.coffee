Comlink = require 'comlink'

require "../models/index"
{ State, Model, Query, Rule, Set, Finder } = require "~/plugins/memory-record"
{ nation } = require "../yaml/rule.yml"

broadcasts = []

self.onconnect = (e)->
  [port] = e.ports
  Comlink.expose
    add: (cb)->
      broadcasts.push cb
      broadcasts.length - 1
    del: (idx)->
      delete broadcasts[idx]
    
    copy: (...keys)->
      JSON.stringify keys.map (key)->
        Query[key].memory

    fetch: (url)->
      res = await fetch url
      await res.json()

    'sow/progress': (url)->
      data = await @fetch url
      Set.sow_turn.merge    data.events
      Set.sow_village.merge data.stories
      ['sow_villages', 'sow_turns']

    'sow/oldlog': (url)->
      data = await @fetch url
      Set.sow_village.merge data.stories
      console.log { data } unless data.faces
      for { _id, story_ids } in data.faces
        for story_id in story_ids when vil = Query.sow_villages.find story_id
          vil.aggregate.face_ids.push _id.face_id
      Finder.sow_village.clear_cache()
      ['sow_villages']

  , port
