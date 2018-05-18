<style lang="stylus" scoped>
span
  margin: 2px 6px
</style>

<template lang="pug">
.text-editor(@drop="drop")
  textarea(ref="input", @input="input", :value="value", :rows="areaRow", :placeholder="placeholder")
  span.mdi(:class="mark")
    | {{size}}/
    sub {{maxSize}}字
    | {{row}}/
    sub {{maxRow}}行

  span.pull-right
    a.btn(@click="submit") 投稿

  span.pull-right
    a.btn(@click="nDm")
      i.mdi.mdi-dice-3

  span.pull-right
    a.btn(@click='h1')
      i.mdi.mdi-format-header-1
    a.btn(@click='h2')
      i.mdi.mdi-format-header-2
    a.btn(@click='h3')
      i.mdi.mdi-format-header-3
    a.btn(@click='h4')
      i.mdi.mdi-format-header-4
    a.btn(@click='h5')
      i.mdi.mdi-format-header-5
    a.btn(@click='h6')
      i.mdi.mdi-format-header-6

  div
    span
      a.btn(@click='blockquote')
        i.mdi.mdi-format-indent-increase
      a.btn(@click='ul')
        i.mdi.mdi-format-list-bulleted
      a.btn(@click='ol')
        i.mdi.mdi-format-list-numbers
      a.btn(@click='table')
        i.mdi.mdi-table
      a.btn(@click='footnote')
        i.mdi.mdi-tag-text-outline
      a.btn(@click='hr')
        i.mdi.mdi-format-page-break

    span
      a.btn(@click='anker')
        i.mdi.mdi-link-variant
      a.btn(@click='sup')
        i.mdi.mdi-format-superscript
      a.btn(@click='sub')
        i.mdi.mdi-format-subscript
      a.btn(@click='strong')
        i.mdi.mdi-format-bold
      a.btn(@click='ruby')
        i.mdi.mdi-source-commit-end-local
      a.btn(@click='code')
        i.mdi.mdi-code-braces
      a.btn(@click='del')
        i.mdi.mdi-format-strikethrough-variant

</template>

<script lang="coffee">
_ = require "lodash"

caret = (cb)-> (...args)->
  { input } = @$refs
  st = input.selectionStart
  ed = input.selectionEnd
  value = @value
  after = cb value[...st], value[st...ed], value[ed...], ...args
  size = after.length - value.length
  @$emit 'input', after
  @$nextTick ->
    input.selectionStart = input.selectionEnd = ed + size

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
      anker: caret (hd, text, tl)->
        """[#{text}]: <#> "#{text}"
        #{hd}[#{text}]#{tl}"""
      ruby: caret (hd, text, tl)->
        """[#{text}]: ○
        #{hd}[#{text}]#{tl}"""
      hr: caret (hd, text, tl)->
        """#{hd}
        * * *
        #{text}#{tl}"""
      table: caret (hd, text, tl)->
        """#{hd}

        |     |     |
        |:--- |:--- |
        |#{text}||
        #{tl}
        """

      text: caret (hd, _, tl, text)->
        """#{hd}
        * * *
        #{text}
        * * *
        #{tl}"""

      h1: caret (hd, text, tl)->
        """#{hd}#{text}
        =====
        #{tl}"""
      h2: caret (hd, text, tl)->
        """#{hd}#{text}
        -----
        #{tl}"""
      h3: caret (hd, text, tl)->  """#{hd}### #{text}#{tl}"""
      h4: caret (hd, text, tl)->  """#{hd}#### #{text}#{tl}"""
      h5: caret (hd, text, tl)->  """#{hd}##### #{text}#{tl}"""
      h6: caret (hd, text, tl)->  """#{hd}###### #{text}#{tl}"""

      sup: caret (hd, text, tl)-> """#{hd}^#{text}^#{tl}"""
      sub: caret (hd, text, tl)-> """#{hd}~#{text}~#{tl}"""
      del: caret (hd, text, tl)-> """#{hd} ~~#{text}~~ #{tl}"""

      em: caret (hd, text, tl)->     """#{hd} *#{text}* #{tl}"""
      strong: caret (hd, text, tl)-> """#{hd} **#{text}** #{tl}"""
      code: caret (hd, text, tl)->   """#{hd}`#{text}`#{tl}"""

      blockquote: caret (hd, text, tl)-> """#{hd}> #{text}#{tl}"""
      image: caret (hd, text, tl, name, type)->      """#{hd}![#{text || type}](#{name})#{tl}"""
      ul: caret (hd, text, tl)->         """#{hd}* #{text}#{tl}"""
      ol: caret (hd, text, tl)->         """#{hd}1. #{text}#{tl}"""
      footnote: caret (hd, text, tl)->   """#{hd}^[#{text}]#{tl}"""

      nDm:     caret (pre, select, post)-> "#{pre}[[#{select}]]#{post}"

      drop: (e)->
        e.stopPropagation()
        e.preventDefault()
        for item in e.dataTransfer.items
          switch item.kind
            when 'file'
              1
            when 'string'
              item.getAsString (data)=>
                console.log data
            else
              console.log item
        for file in e.dataTransfer.files
          { name, type } = file
          switch
            when file.type.match /// ^text/ ///
              reader = new FileReader()
              reader.onload = ({ target })=>
                @text target.result
              reader.readAsText(file)
            when file.type.match /// ^image/ ///
              @$emit "drop_image", file, (url)=>
                @image url, type

      submit: _.debounce ->
        @$emit 'submit', @value
      , 3000,
        leading: true
        trailing: false

      input: _.debounce (e)->
        @$emit 'input', e.target.value
      , 200

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