{ poll } = require("vue-petit-store")
{ url } = require "~/app/config/live.yml"

module.exports =
  namespaced: true
  state: -> {}
  mutations: {}
  actions: {
    ...poll.caches "6h", "1.0.0",
      faces:    -> "#{url.store}/aggregate/faces/index.json"
      face: (id)-> "#{url.api}/aggregate/faces/#{id}"
  }
