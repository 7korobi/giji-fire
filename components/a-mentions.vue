<script lang="coffee">
{ Query } = require "~/plugins/memory-record"

module.exports =
  mixins: [
    require('~/plugins/book')()
  ]
  computed:
    show: ->
      @chat && "mentions" in @$store.state.menu.shows

</script>

<template lang="pug">
.inframe.mentions(v-if="show")
  div.date(:class="chat.handle")
    hr
    span.pull-left
      a(v-if="chat.phase && chat.phase.update") 訂正
      a(v-if="chat.part") {{ chat.part.label }}
      a p{{ 1 + page_idx}}
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
        tr-intro-chat(v-for="o in mentions" @anker="_events.anker", :key="o.id", :id="o.id", :handle="o.phase.handle", :deco="o.deco", :log="o.log")
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
