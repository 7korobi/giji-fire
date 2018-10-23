{ caches } = require("~/plugins/get-by-mount")
{ url } = require "~/config/live.yml"

module.exports =
  namespaced: true
  state: -> {}
  mutations: {}
  actions: {
    ...caches "12h",
      faces:    -> "#{url.store}/aggregate/faces/index.json"
      face: (id)-> "#{url.api}/aggregate/faces/#{id}"
  }
