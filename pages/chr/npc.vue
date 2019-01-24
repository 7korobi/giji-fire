<template lang="pug">
div
  c-post(handle="footer")
    bread-crumb
  c-report(handle="header" deco="center")
    btn(v-for=" o in chr_sets " v-model="chr_set_id" :as="o.id" :key="o.id")
      | {{ o.label }}
      sup {{ o.chr_npcs.list.length }}

    hr
    sub(style="width: 100%")
      | 「{{ chr_set.label }}」で選択できる、最初の犠牲者を表示しています。

  transition-group.talks(name="list" tag="div")
    div(v-for="o in chr_npcs" :key="o.id")
      c-report(handle="public")
        | {{ o.head }} プロローグ
      c-talk(handle="SSAY" :log="o.say_0" :face_id="o.face_id" :head="o.head")
        .date
          abbr.btn 0:0

      c-report(handle="public")
        | {{ o.head }} １日目
      c-talk(handle="SSAY" :log="o.say_1" :face_id="o.face_id" :head="o.head")
        .date
          abbr.btn 1:0
      c-post(handle="WSAY")
        | {{ o.face.name }}に牙を向けた。
      br


  c-post(handle="footer")
    bread-crumb
</template>
<script lang="coffee">
{ Query } = require "memory-orm"
{ replaceState } = require "~/plugins/browser-store"

module.exports =
  mixins: [
    replaceState "chr_set_id"
    replaceState "search"
  ]
  data: ->
    chr_set_id: "ririnra"
    search: ""

  computed:
    chr_set: ->
      Query.chr_sets.find @chr_set_id
    chr_sets: ->
      Query.chr_sets.sort("chr_npcs.list.length","desc").list
    chr_npcs: ->
      @chr_set.chr_npcs.list

  head: ->
    titleTemplate: "#{ @chr_set.label } - %s"


</script>

<style lang="sass">
</style>
