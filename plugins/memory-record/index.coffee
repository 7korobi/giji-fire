Set = {}
Map = {}
Name = {}
Query = {}
Finder = {}

State =
  step: {}

set_deploy = (key, cb)-> Name[key].deploys.push cb
set_depend = (key, cb)-> Name[key].depends.push cb
merge = (o)->
  for key, val of o
    switch
      when Query[key]?
        key = Name[key].base
        Set[key].merge val
      when Set[key]?
        Set[key].append val

module.exports = { Set, Map, Name, State, Finder, Query, set_deploy, set_depend, merge }
