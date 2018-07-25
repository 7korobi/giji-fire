<style lang="stylus" scoped>
span
  margin: 2px 6px
</style>

<template lang="pug">
.text-editor(@drop="drop")
  textarea(ref="input" :value="value" :rows="areaRow" :placeholder="placeholder" @input="input" @focus="focus" @blur="blur")
  div.form
    button(@click="submit" :class="{ ban, warn }")
      i.mdi(:class="mark")
      span
        | {{size}}/
        sub {{maxSize}}字
        | {{row}}/
        sub {{maxRow}}行
    slot

  div
    span(v-if="'giji' == deco")
      a.btn(@click='h2')
        i.mdi.mdi-format-header-2
      a.btn(@click='h3')
        i.mdi.mdi-format-header-3
      a.btn(@click='h4')
        i.mdi.mdi-format-header-4

    span(v-if="'giji' == deco")
      a.btn(@click="nDm")
        i.mdi.mdi-dice-3

      label.btn
        input.btn(type="file" accept="image/*" @change="upload_btn" style="display: none")
        i.mdi.mdi-image

    span(v-if="'giji' == deco")
      a.btn(@click='codeblock')
        i.mdi.mdi-code-braces
      a.btn(@click='blockquote')
        i.mdi.mdi-format-indent-increase
      a.btn(@click='ul')
        i.mdi.mdi-format-list-bulleted
      a.btn(@click='ol')
        i.mdi.mdi-format-list-numbers
      a.btn(@click='table')
        i.mdi.mdi-table

    span(v-if="'giji' == deco")
      a.btn(@click='left')
        i.mdi.mdi-format-align-left
      a.btn(@click='center')
        i.mdi.mdi-format-align-center
      a.btn(@click='right')
        i.mdi.mdi-format-align-right

    span(v-if="'giji' == deco")
      a.btn(@click='hr')
        i.mdi.mdi-format-page-break
      a.btn(@click='footnote')
        i.mdi.mdi-tag-text-outline
      a.btn(@click='anker')
        i.mdi.mdi-link-variant

    span(v-if="'giji' == deco")
      a.btn(@click='cnv_kana') あア
      a.btn(@click='set_voice_none') あ
      a.btn(@click='set_voice_full') あ゙
      a.btn(@click='set_voice_half') あ゚


    span(v-if="'giji' == deco")
      a.btn(@click='sup')
        i.mdi.mdi-format-superscript
      a.btn(@click='sub')
        i.mdi.mdi-format-subscript
      a.btn(@click='s')
        i.mdi.mdi-format-strikethrough-variant
      a.btn(@click='del')
        del あ
      a.btn(@click='ins')
        ins あ
      a.btn(@click='abbr')
        abbr あ
      a.btn(@click='strong')
        strong あ
      a.btn(@click='ruby')
        ruby あ
          rt ○○

</template>

<script lang="coffee">
_ = require "lodash"

voice_chrs   = "がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゔゞガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴヷヸヹヺヾ"
devoice_chrs = "かきくけこさしすせそたちつてとはひふへほはひふへほうゝカキクケコサシスセソタチツテトハヒフヘホハヒフヘホウワヰヱヲヽ"
devoice = {}
for voice_chr, idx in voice_chrs
  devoice_chr = devoice_chrs[idx]
  devoice[voice_chr] = devoice_chr

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
      blockquote:  caret (hd, text, tl)->
        text = text
        .split /\n/g
        .map (line)-> "> #{line}"
        .join "\n"
        """#{hd}#{text}
        #{tl}"""

      anker: caret (hd, text, tl)->
        """[#{text}]: <#> "#{text}"
        #{hd}[#{text}]#{tl}"""
      ruby: caret (hd, text, tl)->
        """*[#{text}]: ○
        #{hd}#{text}#{tl}"""
      hr: caret (hd, text, tl)->
        """#{hd}
        * * *
        #{text}#{tl}"""

      codeblock: caret (hd, text, tl)->
        """#{hd}
        ```
        #{text}
        ```
        #{tl}"""

      left: caret (hd, text, tl)->
        """#{hd}
        ::: left
        #{text}
        :::
        #{tl}"""

      center: caret (hd, text, tl)->
        """#{hd}
        ::: center
        #{text}
        :::
        #{tl}"""

      right: caret (hd, text, tl)->
        """#{hd}
        ::: right
        #{text}
        :::
        #{tl}"""

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
      del: caret (hd, text, tl)-> """#{hd}~~#{text}~~#{tl}"""
      ins: caret (hd, text, tl)-> """#{hd}++#{text}++#{tl}"""
      s:   caret (hd, text, tl)-> """#{hd}--#{text}--#{tl}"""

      ul: caret (hd, text, tl)->  """#{hd}* #{text}#{tl}"""
      ol: caret (hd, text, tl)->  """#{hd}1. #{text}#{tl}"""

      strong: caret (hd, text, tl)-> """#{hd}**#{text}**#{tl}"""
      abbr:   caret (hd, text, tl)-> """#{hd}==#{text}==#{tl}"""
      code:   caret (hd, text, tl)-> """#{hd}``#{text}``#{tl}"""

      footnote:   caret (hd, text, tl)-> """#{hd}^[#{text}]#{tl}"""

      set_voice_none:   caret (hd, text, tl)->
        text = text.replace /([\u3041-\u3096\u309d\309f\u30a1-\u30fa\u30fd\u30fe\u30ff])|([\u3099\u309a])/g, (match, chr, cut)->
          return "" if cut
          chr = devoice[chr] ? chr
          return chr
        """#{hd}#{text}#{tl}"""

      set_voice_half:   caret (hd, text, tl)->
        text = text.replace /([\u3041-\u3096\u309d\309f\u30a1-\u30fa\u30fd\u30fe\u30ff])|([\u3099\u309a])/g, (match, chr, cut)->
          return "" if cut
          chr = devoice[chr] ? chr
          return chr + "\u309a"
        text = text.replace /([ハヒフヘホ])[\u309a]/g, (match, chr)->
          return String.fromCharCode chr.charCodeAt(0) + 2
        """#{hd}#{text}#{tl}"""

      set_voice_full:   caret (hd, text, tl)->
        text = text.replace /([\u3041-\u3096\u309d\309f\u30a1-\u30fa\u30fd\u30fe\u30ff])|([\u3099\u309a])/g, (match, chr, cut)->
          return "" if cut
          chr = devoice[chr] ? chr
          return chr + "\u3099"
        text = text.replace /([カキクケコサシスセソタチツテトハヒフヘホ])[\u309a]/g, (match, chr)->
          return String.fromCharCode chr.charCodeAt(0) + 1
        """#{hd}#{text}#{tl}"""

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

      file: (file)->
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

      upload_btn: (e)->
        for file in e.target.files
          @file file
        e.target.files.length = 0

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
          @file file

      submit: _.debounce ->
        return if @ban
        @$emit 'submit', @value
      , 3000,
        leading: true
        trailing: false

      input: _.debounce (e)->
        @$emit 'input', e.target.value
      , 300

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
        warn ||=  @value.match /-/
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