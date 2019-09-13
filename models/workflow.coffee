{ Set, Model, Query, Rule } = require "memory-orm"

new Rule("work_location").schema ->
  @order "list", sort: [["id_ary.length", "name.length", "name"], ["desc", "desc", "asc"]]
  @path '*'
  @scope (all)->
    zip: -> all.where (o)-> o.zipcode
    geo: -> all.where (o)-> o.on
    no_zip: -> all.where (o)-> ! o.zipcode
    no_geo: -> all.where (o)-> ! o.on

  @property 'model',
    id_ary:
      get: ->
        @id.split("-")
    prefecture:
      get: ->
        @id_ary[0]
  class @model extends @model
    @map_reduce: (o, emit)->
      emit "id_tree",
        navi: o.id_ary



drillup = (item)->
  while item
    expect item
    .toMatchSnapshot()
    item = item.work_location

describe "work location", ->
  test 'query size', ->
    expect Query.work_locations.list.length
    .toMatchSnapshot()
    return

  test '埼玉県-さいたま市 navi', ->
    expect Query.work_locations.where(_id: /^埼玉県-さいたま市-/).reduce.id_tree
    .toMatchSnapshot()
    return

  test 'all 宮町 navi', ->
    expect Query.work_locations.where(_id: /-宮町/).reduce.id_tree
    .toMatchSnapshot()
    return

  test 'id longest with zip', ->
    drillup Query.work_locations.where((o)-> o.zipcode).sort("id_ary.length","desc").list[0]
    return

  test 'id longest no zip', ->
    drillup Query.work_locations.where((o)-> ! o.zipcode ).sort("id_ary.length","desc").list[0]
    return

  test 'drill-down UI query', ->
    q = Query.work_locations.where((o)-> ! o.work_location_id)
    expect( q.pluck("label") ).toMatchSnapshot()
    item = q.where(idx: '埼玉県').list[0]
    expect( item ).toMatchSnapshot()

    q = item.work_locations.sort(["id_ary.length", "name.length", "name"], ["desc", "desc", "asc"])
    expect( q.pluck("label") ).toMatchSnapshot()
    item = q.where(idx: 'さいたま市').list[0]
    expect( item ).toMatchSnapshot()

    q = item.work_locations.sort(["id_ary.length", "name.length", "name"], ["desc", "desc", "asc"])
    expect( q.pluck("label") ).toMatchSnapshot()
    item = q.where(idx: '北区').list[0]
    expect( item ).toMatchSnapshot()

    q = item.work_locations.sort(["id_ary.length", "name.length", "name"], ["desc", "desc", "asc"])
    expect( q.pluck("label") ).toMatchSnapshot()
    item = q.where(idx: '宮原町').list[0]
    expect( item ).toMatchSnapshot()

    q = item.work_locations.sort(["id_ary.length", "name.length", "name"], ["desc", "desc", "asc"])
    expect( q.pluck("label") ).toMatchSnapshot()
    return


  return





new Rule("work_country").schema ->
  @has_many "work_names"
  @deploy ->
    @q =
      search_words: @country.join(" ")
  @order "list", sort: ["country.length", "desc"]

idx = 0
new Rule("work_name").schema ->
  @belongs_to "work_country"
  @deploy ->
    ascii =
      if @spell
        @spell.normalize('NFKD').replace /[\u0300-\u036F]/g, ''
      else
        ""
    @_id = "#{@key}-#{++idx}"
    @spot = @mark || @key
    @work_country_id = @key
    @q =
      search_words: ["<#{@name}>", "<#{ascii}>"].join(" ")

  @scope (all)->
    by_page: (spot_id, search)->
      q =
        if spot_id != "all"
          all.partition "code.#{spot_id}.set"
        else
          all
      q.search search

  @order "spot_size", sort: ["count", "desc"]
  class @model extends @model
    @map_partition: (o, emit)->
      emit "code", o.key,
        set: o.id
      emit "spot", o.spot,
        set: o.id
        list: true
      emit "spot_size", o.spot,
        count: 1

    @order: (o, emit)->
      emit "spot", o.spot, "list",
        sort: [["side","name"], ["asc","asc"]]
