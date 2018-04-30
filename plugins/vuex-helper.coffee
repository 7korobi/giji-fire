_ = require 'lodash'

state_value = (mutation, getter, setter)->
  get: ->
    _.get @$store.state, getter
  set: (val)->
    o = _.set {}, setter, val
    @$store.commit mutation, o


module.exports =
  vuex_value: (path, keys)->
    dir = path.split('.')
    o = {}
    for key in keys
      mutation = "#{dir[0]}/update"
      getter = [...dir[0..-1], key].join('.')
      setter = [...dir[1..-1], key].join('.')
      o[key] = state_value mutation, getter, setter
    o

