{ Set, Model, Query, Rule } = require "memory-orm"

new Rule("locale").schema ->

Set.locale.set  require "../yaml/locale.yml"
