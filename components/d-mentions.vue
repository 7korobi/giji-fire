<script lang="coffee">
{ Query } = require "~/plugins/memory-record"
{ vuex_value } = require '~/plugins/vuex-helper'

module.exports =
  props: ['chat_id', 'page_idx']
  computed:
    chat: ->
      Query.chats.find @chat_id
    mentions: ->
      Query.chats.reduce?.mention_to?[@chat_id]

    can_update: ->
      @chat?.phase?.update

  methods:
    edit: ->
      @$emit "edit", @chat_id

    remove: ->
      @$emit "remove", @chat_id


</script>

<template lang="pug">
div(v-if="chat")
  .form(:class="chat.phase.handle")
    hr
    a.btn.active(@click="remove" v-if="can_update")
      i.mdi.mdi-comment-remove-outline
    a.btn.active(@click="edit"   v-if="can_update")
      i.mdi.mdi-square-edit-outline
  .date(:class="chat.phase.handle")
    span.pull-left
      a(v-if="chat.part") {{ chat.part.label }}
      a p{{ 1 + page_idx }}
    span
      a(v-if="chat.potof") {{ chat.potof.sign }}
      em(v-if="chat.phase") {{ chat.phase.label }}
    span.pull-right
      timeago(v-if="chat.write_at" :since="chat.write_at")
    hr
    h6 参照されている
    hr
  .swipe
    table
      tbody.tlist
        tr-intro-chat(v-for="o in mentions" v-on="$listeners", :key="o.id", :id="o.id", :handle="o.phase.handle", :deco="o.deco", :log="o.log")
</template>

<style lang="stylus" scoped>

time
  white-space: nowrap

.date
  text-align: center

table
  width: 100%
  border-collapse: collapse;

</style>
