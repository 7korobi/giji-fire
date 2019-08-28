{ poll } = require("vue-petit-store")
{ url } = require "~/config/live.yml"

module.exports =
  namespaced: true
  state: -> {}
  mutations: {}
  actions: {
    ...poll.caches "10m", "1.0.0",
      plan:      -> "#{url.api}/plan/progress"
      progress:  -> "#{url.api}/story/progress"
    ...poll.caches "6h",  "1.0.0",
      oldlog:    -> "#{url.store}/sow/index.json"
    ...poll.caches "10y", "1.0.0",
      story: (id)-> "#{url.store}/sow/#{id}.json"
  }
