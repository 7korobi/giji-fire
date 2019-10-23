<template lang="pug">
div
  template(v-for="(head, idx) in intro")
    c-report(handle="MAKER")
      | {{ head }}
    c-report(handle="public" v-if="locale_intro" :log="locale_intro[idx]")
    c-talk(handle="SSAY" v-if="npc" :log="npc.intro[idx]" :face_id="npc.face_id" :head="npc.head")
      .date
        abbr.btn {{ idx }}:0

  c-post(handle="WSAY" v-if="npc")
    | {{ npc.face.name }}に牙を向けた。

</template>
<script lang="coffee">
{ Query } = require 'memory-orm'

module.exports =
  data: ->
    intro: [
      "プロローグ"
      "1日目"
    ]
  props: ['locale_id', 'chr_npc_id']

  computed:
    locale_intro: ->
      Query.locales.find @locale_id
      ?.intro

    npc: ->
      Query.chr_npcs.find @chr_npc_id

</script>
