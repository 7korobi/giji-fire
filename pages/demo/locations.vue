<template lang="pug">
div
  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ

  c-post.form(handle="SSAY" deco="trix")
    a.btn(v-for="id in id_list" @click="location_tap(id)") {{ label(id) }}

  c-report(handle="footer" deco="center")
    bread-crumb
      li
        nuxt-link(to="/demo") 開発者用ページ
</template>
<script lang="coffee">
{ Set, Query } = require 'memory-orm'
{ pushState, replaceState } = require "vue-petit-store"

#geo = require '~/app/yaml/work_geo_orm.yml'
#Set.work_location.reset geo

module.exports =
  mixins: [
  ]

  data: ->
    ids: []
    options: []
    limit: 100

  methods:
    label: (id)->
      hd =
        if @current
          @current.name.length
        else
          0
      { idx, name } = @location id
      tail = name[ hd .. ]
      if idx.length < tail.length
        tail
      else
        idx

    location: (id)->
      Query.work_locations.find(id)

    location_tap: (id)->
      @ids.push id
      console.log @ids

  computed:
    bases: ->
      [
        Query.work_locations,
        Query.work_locations.zip(),
        Query.work_locations.geo(),
        Query.work_locations.no_zip(),
        Query.work_locations.no_geo(),
      ]
    root: ->
      root = @bases[0].reduce.id_tree.navi
      for id in @ids
        break unless root = root[id]
      root
    
    current: ->
      [..., id] = @ids
      @location id

    id_list: ->
      if @root
        Object.keys @root

</script>
