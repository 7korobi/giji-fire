<template lang="pug">
table(@mouseleave="focus_on('','')")
  tbody(v-if="x && y")
    tr
      td(@mouseover="focus_on('','')")
        a.btn(@click="clear")
          i.mdi.mdi-eraser
      td.r(v-for="xo in x" @mouseover="focus_on(xo.id, '')")
        btn.r.fine(bool="include" @input="xon(xo.id)" @toggle="xoff(xo.id)" :value="value" :as="yall(xo.id)" :key="xo.id")
          sub(v-if="xo.count") {{ xo.count }}
          br
          | {{ xo.id }}
    tr(v-for="yo in y")
      td.r(@mouseover="focus_on('', yo.id)")
        btn.r.fine(bool="include" @input="yon(yo.id)" @toggle="yoff(yo.id)" :value="value" :as="xall(yo.id)" :key="yo.id")
          sub(v-if="yo.count") {{ yo.count }}
          br
          | {{ yo.id }}
      td.r(v-for="xo in x" @mouseover="focus_on(xo.id, yo.id)" :class="{ focus: focus_at.x === xo.id || focus_at.y === yo.id }")
        datum.r(:xo="xo" :yo="yo" :find="find" :data="data" :value="value" v-on="$listeners")

</template>
<style lang="sass" scoped>
table
  border-collapse: collapse
.focus
  border: 2px dotted
</style>

<script lang="coffee">
module.exports =
  props: ['x', 'y', 'data', 'find', 'value']
  data: ->
    focus_at:
      x: ""
      y: ""
  components:
    datum:
      functional: true
      props: ['xo', 'yo', 'data', 'find', 'value']
      render: (m, ctx)->
        { value, find, data, xo, yo } = ctx.props
        id = find xo.id, yo.id
        o = data[ id ]
        if o
          ctx.data.attrs = {
            as:  id
            key: id
            value: value
          }
          m 'check', ctx.data, o.count
        else
          ""

  methods:
    clear: ->
      @$emit 'input', []
    
    focus_on: (x, y)->
      @focus_at = { x, y }

    on: (value, x, y)->
      key = @find x, y
      if o = @data[key]
        unless key in value
          value.push key

    off: (value, x, y)->
      key = @find x, y
      if o = @data[key]
        if 0 <= idx = value.indexOf key
          value.splice idx, 1


    xon: (x)->
      value = [...@value]
      for yo in @y
        y = yo.id
        @on value, x, y
      @$emit 'input', value

    yon: (y)->
      value = [...@value]
      for xo in @x
        x = xo.id
        @on value, x, y
      @$emit 'input', value


    xoff: (x)->
      value = [...@value]
      for yo in @y
        y = yo.id
        @off value, x, y
      @$emit 'input', value

    yoff: (y)->
      value = [...@value]
      for xo in @x
        x = xo.id
        @off value, x, y
      @$emit 'input', value
    
    xall: (y)->
      for xo in @x
        id = @find xo.id, y
        continue unless @data[id]
        id

    yall: (x)->
      for yo in @y
        id = @find x, yo.id
        continue unless @data[id]
        id

</script>
