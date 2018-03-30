{ State, Model, Query, Rule, Set, Finder } = Mem = require "~/plugins/memory-record"
{ url } = require "~/config/live.yml"

module.exports =
  namespaced: true
  state: -> {}

  mutations:
    progress: (state, data)->
      Set.sow_turn.merge    data.events
      Set.sow_village.merge data.stories

    oldlog: (state, data)->
      Set.sow_village.merge data.stories
      console.log { data } unless data.faces
      for { _id, story_ids } in data.faces
        for story_id in story_ids when vil = Query.sow_villages.find story_id
          vil.aggregate.face_ids.push _id.face_id
      Finder.sow_village.clear_cache()

  actions:
    progress: ({state, commit, rootState })->
      res = await fetch "#{url.api}/story/progress"
      commit "progress", await res.json()

    oldlog: ({ state, commit, rootState })->
      res = await fetch "#{url.store}/sow/index.json"
      commit "oldlog", await res.json()
