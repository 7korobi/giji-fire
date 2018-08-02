
<template lang="pug">
#tools
  hr
  h6 クリップボード
  hr
  .chat.form
    textarea(v-model="clipboard" rows="6")

  hr
  h6 ピックアップ
  hr
  .chat.form
    check(v-model="clips_f" as="bm") 栞
    check(v-model="clips_f" as="anchor") >>
    check(v-model="clips" as="●") ●
    check(v-model="clips" as="▼") ▼
    check(v-model="clips" as="■") ■
    check(v-model="clips" as="【") 【】
    input(v-model="cliptext" type="text" size="5")
  div(v-for="o in cliplist")
    a(:href="o.href") {{ o.name }}
    a(v-for="item in o.items" :href="item.href") {{ item.item }}
</template>

<script lang="coffee">

regDEL = /(\/\*)(.*?)(\*\/|$)/g

zIndex = 10000
deploy = (o, events)->
  { id } = o
  if a = o.querySelector(".name a[name]")
    name = a.innerText.split(" ").pop()
  else
    name = "？"

  if (b = o.querySelector(".date")) && (ank = b.innerText.match(/\((.?\d+)\)/)?[1])
    turn = b.getAttribute("turn")
    text = "\n(>>#{turn}:#{ank} #{name})"
  else
    text = "\n(#{name})"

  if events
    if b
      b.appendChild span = document.createElement("span")
      span.classList.add("btn")
      span.innerText = "o"
      [span].forEach (e)->
        e.addEventListener 'click', ({ pageY })->
          ++zIndex
          top = pageY + 16
          left = o.offsetLeft
          html = o.innerHTML
          events.click_anker { html, top, left, zIndex, position: "absolute" }
        

    if c = o.querySelector("th img")
      c.addEventListener 'click', ->
        events.click_img id

    if d = o.querySelector("article")
      src  = d.innerHTML
      pure = src.replace(regDEL, '').trim()
      d.innerHTML = src.replace regDEL, '<del>$1$2$3</del>'
      unless pure
        o.setAttribute("can", "del")

    o.querySelectorAll(".mes_text a[href]").forEach (e)->
      text = e.innerText
      if ">>" == text[0..1] && ! e.getAttribute("title")
        e.addEventListener 'click', ({ pageY })->
          ++zIndex
          top = pageY + 16
          left = o.offsetLeft
          href = e.href
          .replace "#","&logid="
          .replace "&move=page",""

          res  = await fetch href
          body = await res.text()
          parser = document.createElement("article")
          parser.innerHTML = body
          html = parser.querySelector(".message_filter").innerHTML
          events.click_anker { html, top, left, zIndex, position: "absolute" }

  if events
  else
    text


module.exports =
  mixins: [
    require("~/plugins/browser-store")
      local:
        clipboard: ""
  ]
  data: ->
    clips_f: ["bm", "anchor"]
    clips: ["●","▼","■","【"]
    cliptext: ""

  mounted: ->
    console.log @$el
    for o in document.querySelectorAll('.message_filter')
      deploy o,
        click_img: (id)=>
          @clipboard += deploy window[id]
        click_anker: (o)=>
          vm = window.vue.floats
          if vm.floats[o.html]
            vm.floats = {}
          else
            vm.floats[o.html] = o
          vm.$forceUpdate()

  computed:
    cliplist: ->
      list = []
      for o in document.querySelectorAll('.message_filter')
        continue unless dom = o.querySelector("article")
        text = dom.innerText
        items = []

        for item in @clips
          if text.match item
            if '【' == item
              item = '【】'
            items.push { item }

        for item in @cliptext.split(" ") when item
          if text.match item
            items.push { item }

        for fk in @clips_f
          if 'bm' == fk && o.querySelector(".post") && o.querySelector(".TSAY")
            name = o.querySelector("[name]")?.innerText
            item = text.replace name, ""
            items.push { item }

          if 'anchor' == fk
            for cite in o.querySelectorAll("article .res_anchor")
              item = cite.innerText
              href = cite.href
              if ">>" == item[0..1]
                href = href.replace("#","&logid=").replace("&move=page","")
                items.push { href ,item }

        unless items.length
          continue
        if dom = o.querySelector(".name a[name]")
          name = dom.innerText.split(" ").pop() ? "？"
          href = "##{dom.getAttribute("name")}"
        else
          name = "？"
        list.push { href, name, items }
      list
</script>
