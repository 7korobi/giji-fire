{ Set, Model, Query, Rule } = require "memory-orm"

new Rule("marker").schema ->
  @order "write_at", "desc"

  @scope (all)->
    own: ( uid )-> all.where { uid }
