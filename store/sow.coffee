{ caches } = require("~/plugins/get-by-mount")
{ url } = require "~/config/live.yml"

module.exports =
  namespaced: true
  state: -> {}
  mutations: {}
  actions: {
    ...caches "1h",
      progress:  -> "#{url.api}/story/progress"
      oldlog:    -> "#{url.store}/sow/index.json"
    ...caches "30d",
      story: (id)-> "#{url.store}/sow/#{id}.json"
  }
