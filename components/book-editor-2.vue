<template lang="pug">
.inframe
  br
  c-post.form(handle="MAKER" deco="giji")
    h4 村の説明
    hr
    text-editor(v-model="maker[0]", :maxSize="500", :maxRow="30")

  c-post.form(handle="public" deco="giji")
    h4 村のルール
    hr
    text-editor(v-model="maker[1]", :maxSize="500", :maxRow="30")

  c-post.form(handle="public" deco="giji")
    h4 国のルール
    hr
    ol
      li(v-for="rule in n_rules") {{ rule.head }}

  c-talk.form(handle="SSAY" deco="giji", :head="npc_name", :face_id="npc.face_id")
    text-editor(placeholder="冒頭の発言" v-model="npc.say[0]")

  c-talk.form(handle="SSAY" deco="giji", :head="npc_name", :face_id="npc.face_id")
    text-editor(placeholder="１日目の発言" v-model="npc.say[1]")

  c-report.form(handle="MAKER" deco="giji")
    a.btn(@click="commit")
      slot

</template>
<script lang="coffee">
{ Query } = require "~/plugins/memory-record"
{ nation, village } = require "../yaml/rule.yml"
NPC = require "../yaml/npc.yml"

v_rules = "（村のルールは、自由に編集できるよ！）\n"
v_rules += ( "#{idx + 1}. #{head}" for {head}, idx in village.list )
.join "\n"

module.exports =
  data: ->
    npc:
      face_id: null
      chr_job_id: null
      say: ["", ""]
    maker: ["", v_rules, ""]
  
  methods:
    commit: ->
      @_events.input[0] { @npc, @maker, @chat, @game, @tags, @option, @label }
    tag: (id)->
      Query.tags.find(id)
  computed:
    faces: -> Query.faces.tag @tags
    npc_jobs: -> Query.faces.find(@npc.face_id)?.chr_jobs ? []
    npc_name: ->
      return unless npc_job = Query.chr_jobs.find(@npc.chr_job_id)
      "#{npc_job.job} #{npc_job.face.name}"
       
    user: -> @$store.state.user
    n_rules: -> nation.list
    tags_all: -> Query.tags.ids
    tags_giji: -> Query.tags.nodes("giji", 1).ids

    sides: ->
      [
        "HUMAN"
        "EVIL"
        "WOLF"
        "PIXI"
        "OTHER"
        "EVENT"
        "BIND"
        "LIVE"
        "SPECIAL"
        "TURN"
      ]
    
    roles_by: -> Mem.Query.roles.reduce.group

</script>

<style lang="stylus" scoped>
th.t
  vertical-align: top
label
  white-space: nowrap
</style>
