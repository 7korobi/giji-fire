{ Set, Model, Query, Rule } = require "~/plugins/memory-record"

new Rule("locale").schema ->

Set.locale.set  require "../yaml/locale.yml"
