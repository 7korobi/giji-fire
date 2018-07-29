<template lang="pug">
div
  c-post(handle="footer")
    bread-crumb
  c-report(handle="header" deco="center")
    tags(v-model="tag_id")
    sub(style="width: 100%")
      | {{ chrs.length }}人の{{ set.long }}を表示しています。

  c-post(handle="header" deco="giji")
    article
      ul
        li ページを閉じても、それまでの選択は保存されています。
        li
          a.btn(@click="clear_cache") 選択をクリア
          | すると、やりなおしになります。

  div(v-if="a && b")
    c-post(handle="SSAY" deco="giji")
      article
        | 好きなほうを選んでね。
        progress(:value="done" :max="full") {{ parseInt( 100 * done / full ) }}%
        hr
        transition-group.list
          portrate(@click="choice" :face_id="a" :key="a")
            p {{ a_job.job }}
            p {{ a_job.face.name }}
          portrate(@click="choice" :face_id="b" :key="b")
            p {{ b_job.job }}
            p {{ b_job.face.name }}
        
        ol
          li 好きなほうのアイコンをタップで選択します。
          li 進捗バーが満タンまで貯まると、あなたの選択に従ってキャラクターアイコンを並べます。

  .fullframe(v-else)
    transition-group.portrates(name="list" tag="div")
      portrate(v-for="chr in chrs", :face_id="chr.face_id", :key="chr.face_id")
        p {{ chr.job }}
        p {{ chr.face.name }}

  c-post(handle="footer")
    bread-crumb
</template>
<script lang="coffee">
_ = require "lodash"
{ Query } = require "~/plugins/memory-record"

class Capture
  constructor: (@compare)->

  deploy: (@cache)->
    @args = null
    @route_data = {}
    @compare.bind @

  cached: (...args)->
    ret = @cache[args.join("-")]
    if ret
      @route ...args, true
    else
      @route ...args, false
      @args ?= args
    ret

  route: (...args, value)->
    @route_data[args.join("-")] = @route_data[args.reverse().join("-")] = value

  count: ->
    _.countBy @route_data, (v)-> v

sort_capture = new Capture (a, b)->
  if a == b
    return 0
  @cached a, b


module.exports =
  mixins: [
    require("~/plugins/browser-store")
      replace:
        tag_id: "giji"
      local:
        cache: {}
  ]

  data: ->
    a: null
    b: null
    message: null
    count: {}

  computed:
    set: ->
      Query.tags.find @tag_id

    misaligned_ids: ->
      Query.faces.tag(@tag_id).reduce.set

    full: ->
      @will + @done
    
    will: ->
      @count.false ? 0

    done: ->
      @count.true ? 0

    ids: ->
      @a
      @b
      ids = @misaligned_ids.slice().sort sort_capture.deploy @cache
      @count = sort_capture.count()

      if sort_capture.args
        [@a, @b] = sort_capture.args
        []
      else
        @a = @b = @message = null
        ids

    a_job: ->
      @set.chr_job @a

    b_job: ->
      @set.chr_job @b

    chrs: ->
      @ids.map (face_id)=>
        @set.chr_job face_id

  methods:
    clear_cache: ->
      @cache = {}

    choice: (id)->
      switch id
        when @a
          @cache["#{@a}-#{@b}"] = -1
          @cache["#{@b}-#{@a}"] = +1
        when @b
          @cache["#{@a}-#{@b}"] = +1
          @cache["#{@b}-#{@a}"] = -1
      @cache = @cache
      @a = @b = @message = null

</script>

<style lang="sass">
progress
  width: 100%
.list
  display: flex
  flex-direction:  row
  flex-wrap:       nowrap
  align-items:     center
  align-content:   space-around
  justify-content: flex-start
  .portrate
    margin: 4px 10px

</style>
