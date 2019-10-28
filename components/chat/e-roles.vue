<template lang="pug">
c-post.form(handle="MAKER")
  span(v-if="summary.length")
    a(v-for="o in summary" :class="o.win")
      | {{ o.label }}
      sup(v-if="1 < o.count") {{ o.count }}

  span(v-if="! summary.length && ! is_open")
    | ゲームに登場するカードを選びましょう。
  btn.pull-right(v-if="is_open" v-model="is_open" :as="false")
    | ▲
  btn.pull-right(v-else v-model="is_open" :as="true")
    | ▼


  template(v-if="is_open")
    fieldset.center(v-for="(roles, key) in all" :key="key")
      legend {{ labels[key].label }}
      counter(v-for="role in roles.list" :key="role.id" :as="role.id" :handle="role.win" :value="value" multi @input="input")
        | {{ role.label }}
  template(v-if="role_id")
    hr.stripe
    p(v-html="role.help")
    ul
      li(v-for="help in role.ables.pluck('help')" v-html="help")

</template>
<script lang="coffee">
{ Query } = require 'memory-orm'
{ error } = require "~/app/plugins/form"

module.exports =
  mixins: [
    error 'bans', ( chk )->
      has_robber = @value.includes 'robber'

      mains = humans = evils = wolfs = 0
      if o = @uses?.clan
        mains = o.MAIN?.count || 0
        console.warn o

      if o = @uses?.win
        lonewolfs = o.LONEWOLF?.count || 0
        humans    = o.HUMAN?.count || 0
        evils     = o.EVIL?.count || 0
        wolfs     = o.WOLF?.count || 0
        console.warn o

      chk "すでに人狼勝利です。", !( wolfs + lonewolfs < humans + evils )
      chk "枚数が過剰です。", ! has_robber && @potof_max < mains
      chk "枚数がたりません。", mains < @potof_max
    error 'warns', ( chk )->
  ]
  data: ->
    role_id: null
    is_open: false
  props: ['value', 'potof_max']
      
  computed:
    role: ->
      Query.roles.find @role_id
    labels: ->
      {
        EVENT:
          label: "事件"
        GIFT:
          label: "恩恵"
        ... Query.winners.hash
      }
    summary: ->
      @uses?.summary || []
    uses: ->
      Query.roles
      .distinct false
      .where id: @value
      .reduce

    all: ->
      Query.roles
      .where group: ["MOB", "EVIL", "WOLF", "OTHER", "PIXI", "HUMAN", "GIFT", "EVENT"]
      .reduce.group

  methods:
    input: (role_ids, @role_id)->
      @$emit "input", role_ids
</script>
