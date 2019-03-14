{ poll } = require("vue-petit-store")
{ url } = require "~/config/live.yml"

module.exports =
  namespaced: true
  state: -> {}
  mutations: {}
  actions: {
    ...poll.caches "6h",
      faces:    -> "#{url.store}/aggregate/faces/index.json"
      face: (id)-> "#{url.api}/aggregate/faces/#{id}"
  }
