

<template lang="pug">
table
  tbody
    tr
      td
        h4 一括
      td
        btn(v-model="pnos", :as="[]") 全示
      td
        btn(v-model="pnos", :as="pno_full") 全断
      td
        btn(v-model="pnos", :as="pno_invert") 反転
      td
        h4 種別
      td
        check(v-model="types" :as="0") 通常
      td
        check(v-model="types" :as="1") 内緒
      td
        check(v-model="types" :as="2") 仲間
      td
        check(v-model="types" :as="3") 死者
      td
        check(v-model="types" :as="4") 見物
      td
        check(v-model="types" :as="5") 背景

    tr
      td(colspan="6")
      td
        a(:href="to_pno(-1)") 注目
      td
        a(:href="to_pno(-2)") 注目
      td
        a(:href="to_pno(-3)") 注目
      td
        a(:href="to_pno(-4)") 注目 
      td
        a(:href="to_pno(-5)") 注目
</template>
<script lang="coffee">
_ = require "lodash"

module.exports =
  mixins: [
    require("~/plugins/browser-store")
      session:
        pnos: []
        types: []
      watch:
        pnos: (news)->
          for pno in @pno_full
            o = window["pnofilter_#{pno}"].classList
            if @pnos.includes pno
              o.add("ban")
            else
              o.remove("ban")
          @message_filter()
        types: (news)->
          @message_filter()
  ]

  data: ->
    pno_full: []
    pnos_by_live:
      mob: []
      leave: []
      live: []
      victim: []
      executed: []
      suddendead: []
  computed: ->
    pno_invert: ->
      _.difference @pno_full, @pnos

  mounted: ->
    for live of @pnos_by_live
      document.querySelectorAll("#sayfilter .#{live} tr").forEach (o)=>
        pno = o.id?.split("_")?[1]
        if pno?
          pno = Number pno
          @pno_full.push pno
          @pnos_by_live[live].push pno
          o.addEventListener 'click', =>
            @pnos = _.xor @pnos, [pno]
        else
          o.classList.add("ban")
          o.addEventListener 'click', =>
            @pnos = _.difference @pnos, @pnos_by_live[live]

  methods:
    message_filter: ->
      display_del = (o)=>
        if @types.includes(5)
          o.style.display = "none"
        else
          o.style.display = ""

      document.querySelectorAll(".message_filter").forEach (o)=>
        [idx, pno, type] = o.id.split("_").map Number
        if @pnos.includes(pno) || @types.includes(type)
          o.style.display = "none"
        else
          o.style.display = ""
        switch o.getAttribute "can"
          when "del"
            display_del o
          else
            o.querySelectorAll("del").forEach display_del

    to_pno: (type)->
      location.href + "&pno=#{type}"

</script>
