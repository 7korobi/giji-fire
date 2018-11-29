{ caches } = require("~/plugins/get-by-mount")
{ url } = require "~/config/live.yml"

module.exports =
  namespaced: true
  state: -> {}
  mutations: {}
  actions: {
    ...caches "10m",
      plan:      -> "#{url.api}/plan/progress"
      progress:  -> "#{url.api}/story/progress"
    ...caches "6h",
      oldlog:    -> "#{url.store}/sow/index.json"
    ...caches "10y",
      story: (id)-> "#{url.store}/sow/#{id}.json"
  }
