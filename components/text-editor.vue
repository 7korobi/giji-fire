
<template lang="pug">
.text-editor
  textarea(ref="input", @input="input", :value="value", :rows="areaRow", :placeholder="placeholder")
  i.mdi(:class="mark")
    | {{size}}/
    span.per {{maxSize}}字
    | {{row}}/
    span.per {{maxRow}}行
  span.pull-right
    a(@click="nDm") [[]]
    a(@click="anker") >>
    a(@click="comment") /**/
    a(@click="submit") 投稿
</template>

<style lang="stylus" scoped>
.per
  vertical-align: -0.2em
  font-size:       0.7em
  margin:  0 0 0  -0.2em
  padding: 0
  display: inline
</style>

<script lang="coffee">
caret = (cb)-> ->
  { input } = @$refs
  st = input.selectionStart
  ed = input.selectionEnd
  value = @value
  after = cb value[...st], value[st...ed], value[ed...]
  size = after.length - value.length
  @$emit 'input', after
  @$nextTick ->
    input.selectionStart = st
    input.selectionEnd = ed + size

module.exports =
  default:
    props:
      value:
        type: String
        required: true
      maxSize:
        type: Number
        default: 100
      maxRow:
        type: Number
        default: 1
      minRow:
        type: Number
        default: 1
      placeholder:
        type: String
        default: ""

    data: ->
      caret: {}

    methods:
      nDm:     caret (pre, select, post)-> "#{pre}[[#{select}]]#{post}"
      anker:   caret (pre, select, post)-> "#{pre}>>#{select}#{post}"
      comment: caret (pre, select, post)-> "#{pre}/*#{select}*/#{post}"

      submit: ->
        console.log @value

      input: (e)->
        @$emit 'input', e.target.value

    computed:
      ban: ->
        ban = false
        ban ||= @maxSize < @size
        ban ||= @row < @minRow
        ban ||= @maxRow < @row
        ban
      warn: ->
        ok = true
        ok &&= ! @value.match ///>>///
        ! ok
      mark: ->
        m = "fa-check"
        m = "fa-warning" if @warn
        m = "fa-ban"     if @ban
        [m]

      size: ->
        @value.length
      row: ->
        @value.split("\n").length
      areaRow: ->
        return @minRow if @row < @minRow
        return @maxRow if @maxRow < @row
        return @row

</script>