{ State, Set, Model, Query, Rule, merge } = require "~/plugins/memory-record"
{ url } = require "~/config/live.yml"

module.exports =
  namespaced: true
  state: ->
    type: "OK"
    message: null
    read_at: {}
    hide_potof_ids: []

  mutations:
    data: (state, o)->
      if o.name && o.message
        state.type = o.name
        state.message = o.message

      if o.book?
        state.read_at[o.book._id] = o.read_at
      merge o

    hide_potof_ids: (state, ids)->
      state.hide_potof_ids = ids

  actions:
    create: ({commit}, { book, potof })->
      res = await axios.post "#{url.api}/books", { book, potof }
      commit "data", res.json()

    update: ({commit}, { book, potof })->
      res = await axios.post "#{url.api}/books/#{book._id}", { book, potof }
      commit "data", res.json()

    my_books: ({commit})->
      res = await fetch "#{url.api}/books", {}
      commit "data", res.json()

    books: ({commit})->
      res = await fetch "#{url.api}/books", {}
      commit "data", res.json()

    book: ({commit, state}, _id)->
      write_at = state.read_at[_id]
      res = await fetch "#{url.api}/books/#{_id}", { write_at }
      commit "data", res.json()

    chats: ({commit, state}, _id)->
      write_at = state.read_at[_id]
      res = await fetch "#{url.api}/books/#{_id}/chats", { write_at }
      commit "data", res.json()
