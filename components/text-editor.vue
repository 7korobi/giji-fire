<style lang="stylus" scoped>
span
  margin: 2px 6px
</style>

<template lang="pug">
.text-editor(@drop="drop")
  textarea(ref="input" :value="value" :rows="areaRow" :placeholder="placeholder" @input="input" @focus="focus" @blur="blur")
  strong.mdi(:class="mark")
  a.
    #[em {{size}}]/#[sub {{maxSize}}字]
    #[em {{row}}]/#[sub {{maxRow}}行]

  span.pull-right
    a.btn(@click="submit") 投稿

  span.pull-right(v-if="'giji' == deco")
    a.btn(@click="nDm")
      i.mdi.mdi-dice-3

  span.pull-right(v-if="'giji' == deco")
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
    span(v-if="'giji' == deco")
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

    span(v-if="'giji' == deco")
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
      a.btn(@click='cnv_kana')
        i.mdi.mdi-gender-male-female
      a.btn(@click='del')
        i.mdi.mdi-format-strikethrough-variant
      a.btn(@click='code')
        i.mdi.mdi-code-braces

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
      deco:
        type: String
      rows:
        type: Number
        default: 0
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
      is_ban:
        type: Boolean
        default: false
      is_warn:
        type: Boolean
        default: false

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

      ul: caret (hd, text, tl)->  """#{hd}* #{text}#{tl}"""
      ol: caret (hd, text, tl)->  """#{hd}1. #{text}#{tl}"""

      em:     caret (hd, text, tl)-> """#{hd} *#{text}* #{tl}"""
      strong: caret (hd, text, tl)-> """#{hd} **#{text}** #{tl}"""
      code:   caret (hd, text, tl)-> """#{hd}`#{text}`#{tl}"""

      blockquote: caret (hd, text, tl)-> """#{hd}> #{text}#{tl}"""
      footnote:   caret (hd, text, tl)-> """#{hd}^[#{text}]#{tl}"""
      cnv_kana:   caret (hd, text, tl)->
        # ひらがなをカタカナに、カタカナをひらがなに
        text = text.replace /([\u3041-\u3096])|([\u30a1-\u30f6])/g, (match, hira, kata)->
          if hira
            return String.fromCharCode hira.charCodeAt(0) + 0x60
          if kata
            return String.fromCharCode kata.charCodeAt(0) - 0x60
        """#{hd}#{text}#{tl}"""

      image: caret (hd, text, tl, name, type)-> """#{hd}![#{text || type}](#{name})#{tl}"""

      nDm: caret (pre, select, post)-> "#{pre}[[#{select}]]#{post}"

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
        return if @ban
        @$emit 'submit', @value
      , 3000,
        leading: true
        trailing: false

      input: _.debounce (e)->
        @$emit 'input', e.target.value
      , 200

      focus: -> @$emit 'icon', 'mdi-pen'
      blur:  -> @$emit 'icon', 'mdi-access-point'

    computed:
      ban: ->
        ban = false
        ban ||= !( 2 <= @size <= @maxSize )
        ban ||= !( @minRow <= @row <= @maxRow )
        ban ||= @is_ban
        ban
      warn: ->
        warn = false
        warn ||=  @value.match ///>>///
        warn ||= @is_warn
        warn

      mark: ->
        m = "mdi-check-circle-outline"
        m = "mdi-alert-circle-outline" if @warn
        m = "mdi-cancel"               if @ban
        [m]

      size: ->
        @value.length
      row: ->
        @value.split("\n").length
      areaRow: ->
        return @rows   if @rows
        return @minRow if @row < @minRow
        return @maxRow if @maxRow < @row
        return @row

</script>