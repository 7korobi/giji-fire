<style lang="sass" scoped>
span
  margin: 2px 6px

.mention
  overflow: hidden
  white-space: nowrap
</style>

<template lang="pug">
.text-editor(@drop="drop")
  textarea(ref="input" :value="value" :rows="areaRow" :placeholder="placeholder" @input="input" @focus="focus" @blur="blur" @keydown.ctrl.90="history_back" @keydown.ctrl.89="history_forward")
  div.form
    button(@click="submit" :class="{ ban, warn }")
      i.mdi(:class="mark" v-if="$listeners.submit")
      span
        | {{size}}/
        sub {{maxSize}}字
        | {{row}}/
        sub {{maxRow}}行
    slot
    
  div
    span
      check(v-model="shows" as="history")
        i.mdi.mdi-history
        sup(v-if="history.length") {{ history.length }}

    span(v-if="is_svg")
      a.btn(@click='edge_solid')
        | ↔
      a.btn(@click='edge_wide')
        | ⇔
      a.btn(@click='edge_dotted')
        | ↭

    span(v-if="is_svg")
      a.btn(@click='template_diagram')
        i.mdi.mdi-sitemap

    span(v-if="is_giji")
      a.btn(@click='h2')
        i.mdi.mdi-format-header-2
      a.btn(@click='h3')
        i.mdi.mdi-format-header-3
      a.btn(@click='h4')
        i.mdi.mdi-format-header-4

    span(v-if="is_giji")
      label.btn
        input.btn(type="file" :accept="accept" @change="upload_btn" style="display: none")
        i.mdi.mdi-image

    span(v-if="is_giji")
      a.btn(@click="nDm")
        i.mdi.mdi-dice-3

    span(v-if="is_giji")
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

    span(v-if="is_giji")
      a.btn(@click='left')
        i.mdi.mdi-format-align-left
      a.btn(@click='center')
        i.mdi.mdi-format-align-center
      a.btn(@click='right')
        i.mdi.mdi-format-align-right

    span(v-if="is_giji")
      a.btn(@click='hr')
        i.mdi.mdi-format-page-break
      a.btn(@click='footnote')
        i.mdi.mdi-tag-text-outline
      a.btn(@click='anker')
        i.mdi.mdi-link-variant

    span(v-if="is_unicode")
      a.btn(@click='cnv_kana') あア
      a.btn(@click='set_voice_none') あ
      a.btn(@click='set_voice_full') あ゙
      a.btn(@click='set_voice_half') あ゚


    span(v-if="is_giji")
      a.btn(@click='sup')
        i.mdi.mdi-format-superscript
      a.btn(@click='sub')
        i.mdi.mdi-format-subscript
      a.btn(@click='s')
        s あ
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
  div(v-if="is_show.history")
    hr
    p.mention.fine(v-for="o in history_obj" @click="set_value(o.text)")
      timeago(:since="o.write_at")
      | 　{{ o.chrs }}字 {{ o.lines }}行 {{ o.head }}…{{ o.tail }}

</template>

<script lang="coffee">
_ = require "lodash"
{ localStorage } = require "vue-petit-store"

voice_chrs   = "がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゔゞガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴヷヸヹヺヾ"
devoice_chrs = "かきくけこさしすせそたちつてとはひふへほはひふへほうゝカキクケコサシスセソタチツテトハヒフヘホハヒフヘホウワヰヱヲヽ"
devoice = {}
for voice_chr, idx in voice_chrs
  devoice_chr = devoice_chrs[idx]
  devoice[voice_chr] = devoice_chr

caret = (cb)-> (...args)->
  { input } = @$refs
  st  = input.selectionStart
  ed  = input.selectionEnd
  dir = input.selectionDirection
  value = @value
  after = cb value[...st], value[st...ed], value[ed...], ...args
  size = after.length - value.length
  @set_value after
  @$nextTick ->
    input.setSelectionRange ed + size, ed + size, dir
    input.focus()

module.exports =
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

  mixins: [
    localStorage "history_giji"
    localStorage "history_sow"
    localStorage "history_diagram"
  ]

  data: ->
    history_giji:    [[1,""]]
    history_sow:     [[1,""]]
    history_diagram: [[1,""]]
    forward_history:
      giji:    []
      sow:     []
      diagram: []
    shows: []
    accept: [
      "image/png"
      "image/jpeg"
      "image/gif"
    ]

  methods:
    edge_solid: caret (hd, text, tl)->
      text = " o--><--o "
      """#{hd}#{text}#{tl}"""
    edge_wide: caret (hd, text, tl)->
      text = " o==><==o "
      """#{hd}#{text}#{tl}"""
    edge_dotted: caret (hd, text, tl)->
      text = " o..><..o "
      """#{hd}#{text}#{tl}"""

    template_diagram: caret (hd, text, tl)->
      """
      ## 工作部屋
      ボリス 石

      ボリス --> 石
      """

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
      """《》 #{text.replace(/\s/g, '')}《○》
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
      text = text.replace /([\u3099\u309a])/g, (match, cut)->
        ""
      text = text.replace /([\u3041-\u3096\u309d\309f\u30a1-\u30fa\u30fd\u30fe\u30ff])/g, (match, chr)->
        devoice[chr] ? chr
      """#{hd}#{text}#{tl}"""

    set_voice_half:   caret (hd, text, tl)->
      text = text.replace /([\u3099\u309a])/g, (match, cut)->
        ""
      text = text.replace /([\u3041-\u3096\u309d\309f\u30a1-\u30fa\u30fd\u30fe\u30ff])/g, (match, chr)->
        chr = devoice[chr] ? chr
        chr + "\u309a"
      text = text.replace /([ハヒフヘホ])[\u309a]/g, (match, chr)->
        String.fromCharCode chr.charCodeAt(0) + 2
      """#{hd}#{text}#{tl}"""

    set_voice_full:   caret (hd, text, tl)->
      text = text.replace /([\u3099\u309a])/g, (match, cut)->
        ""
      text = text.replace /([\u3041-\u3096\u309d\309f\u30a1-\u30fa\u30fd\u30fe\u30ff])/g, (match, chr)->
        chr = devoice[chr] ? chr
        chr + "\u3099"
      text = text.replace /([カキクケコサシスセソタチツテトハヒフヘホ])[\u3099]/g, (match, chr)->
        String.fromCharCode chr.charCodeAt(0) + 1
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

    nDm: caret (hd, text, tl)-> "#{hd}[[#{text}]]#{tl}"

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
      @forward_history[@deco] = []
      @$emit 'submit', @value
    , 3000,
      leading: true
      trailing: false

    input: _.debounce (e)->
      @set_value e.target.value
    , 1000

    focus: -> @$emit 'icon', 'mdi-pen'
    blur:  -> @$emit 'icon', 'mdi-access-point'

    set_value: (s)->
      @forward_history[@deco] = []
      @$emit 'input', s

    history_forward: ->
      if @forward_history[@deco].length
        [[timestamp, value], ...@forward_history[@deco]] = @forward_history[@deco]
        @history_top = value
        @$emit 'input', value

    history_back: ->
      if @history.length
        [cut, ...@history] = @history
        @forward_history[@deco] = [cut, ...@forward_history[@deco]]
        @$emit 'input', @history_top

  watch:
    value: (value)->
      if value
        @history_top = value

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

    is_svg: ->
      ['diagram'].includes @deco

    is_unicode: ->
      ['giji','sow'].includes @deco

    is_giji: ->
      ['giji'].includes @deco

    is_show: ->
      history: 'history' in @shows

    history:
      get:    ->  @["history_#{@deco}"] || []
      set: (a)->  @["history_#{@deco}"] = a

    history_obj: ->
      for [write_at, s] in @history when s
        text:  s
        chrs:  s.length
        lines: 1 + ( s.match(/\n/g)?.length || 0 ) 
        head: s[  0 ..  9]
        tail: s[-10 .. -1]
        write_at: write_at

    history_top:
      get: ->
        @history[0][1] || ""
      set: (s)->
        list = [[new Date - 0, s]]
        for item, idx in @history when item && item[1] != s
          list.push item
          if 99 <= list.length
            break
        @history = list


</script>