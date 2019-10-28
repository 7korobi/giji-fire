_ = require 'lodash'

assign = (a, b)->
  Object.assign a, Object.assign b, a

module.exports = (o)->
  assign o.props,
    is_ban:
      type: Boolean
      default: false

    is_warn:
      type: Boolean
      default: false

    maxSize:
      type: Number
      default: 100
    maxWord:
      type: Number
      default: 10
    maxRow:
      type: Number
      default: 1
    minRow:
      type: Number
      default: 1

    disabled:
      type: Boolean
      default: false

  assign o.methods,
    submit: _.debounce ->
      return if @ban

      @$emit 'submit', @value, @meta
    , 3000,
      leading:  true
      trailing: false

  assign o.computed,
    lines: -> @meta.size[0]
    words: -> @meta.size[1]
    chars: -> @meta.size[2]
    meta: ->
      attrs: {}
      size: [0,0,0]

    ban: ->
      ban = false
      ban ||= !(       2 <= @chars <= @maxSize )
      ban ||= !(       1 <= @words <= @maxWord )
      ban ||= !( @minRow <= @lines <= @maxRow )
      ban ||= @is_ban_internal
      ban ||= @is_ban
      ban

    warn: ->
      warn = false
      warn ||= @is_warn_internal
      warn ||= @is_warn
      warn

    mark: ->
      return ["mdi-cancel"] if @ban
      return ["mdi-alert-circle-outline"] if @warn
      return ["mdi-check-circle-outline"]

  o