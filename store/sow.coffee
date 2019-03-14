{ poll } = require("vue-petit-store")
{ url } = require "~/config/live.yml"

module.exports =
  namespaced: true
  state: -> {}
  mutations: {}
  actions: {
    ...poll.caches "10m",
      plan:      -> "#{url.api}/plan/progress"
      progress:  -> "#{url.api}/story/progress"
    ...poll.caches "6h",
      oldlog:    -> "#{url.store}/sow/index.json"
    ...poll.caches "10y",
      story: (id)-> "#{url.store}/sow/#{id}.json"
  }
