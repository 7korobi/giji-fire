<template lang="pug">
div
  slate-editor(
    :placeholder="placeholder"
    :autoFocus="false"
    :value="data"
    :onChange="change_bare"
    :onPaste="paste_bare"

    :renderBlock="render_block"
    :renderInline="render_inline"

    :renderMark="render_mark"
    :renderDecoration="render_decoration"
    :renderAnnotation="render_annotation"
  )
  div.form.toolbar(:class="handle")
    hr.footnote
    button(@click="submit" :class="{ ban, warn }")
      i.mdi(:class="mark")
      span
        | {{chars}}/
        sub {{maxSize}}字
        | {{words}}/
        sub {{maxWord}}文
        | {{lines}}/
        sub {{maxRow}}行
    slot
    a.btn(@click="" :class="") aaa
    p
      label(:class="type" v-for="[type, label, call] in fixes" @click="call") {{ label }}
</template>
<script lang="coffee">
Html = require 'slate-html-serializer'
{ Value } = require "slate"

{ Editor } = require "slate-react"
{ ReactInVue } = require "vuera"
React = require 'react'

if window?
  Html = Html.default

element = ( type, attrs, children )->
  switch type
    when undefined
      undefined
    when 'HR', 'BR' #, 'IMG', 'AUDIO'
      React.createElement type.toLowerCase(), attrs
    else
      React.createElement type.toLowerCase(), attrs, children

html = new Html
  defaultBlock: 'p'
  rules: [
    deserialize: (el, next)->
      type = el.tagName
      data = {}
      if el.attributes
        for { name, value }, idx in el.attributes
          switch name
            when 'class'
              data.className = value
            else
              data[name] = value

      switch el.nodeName
        when '#text', 'BR'
          undefined

        when 'HR'
          { object: 'block', type, data }

        # when 'IMG', 'AUDIO'
        #   { object: 'inline', type, data }

        when 'BLOCKQUOTE', 'ASIDE', 'P',  'DL', 'DT', 'DD',  'UL', 'OL', 'LI',  'H1', 'H2', 'H3', 'H4', 'H5', 'H6'
          nodes = next el.childNodes
          { object: 'block', type, data, nodes }

        when 'A'
          nodes = next el.childNodes
          { object: 'inline', type, data, nodes }

        when 'ABBR', 'LABEL', 'SUP', 'SUB', 'SAMP', 'CODE', 'KBD', 'VAR', 'RUBY', 'RTC', 'RT', 'RP'
          nodes = next el.childNodes
          { object: 'inline', type, data, nodes }

        when 'MARK', 'STRONG', 'DEL', 'INS', 'EM', 'I', 'B', 'S', 'U'
          nodes = next el.childNodes
          { object: 'mark', type, data, nodes }

        else
          console.warn el, el.tagName, el.nodeName, el.class, el.nodeValue, el.dataset
          undefined

    serialize: ({ object, type, data, nodes }, children)->
      attrs = {}
      if data
        for [key, val] in [...data]
          attrs[key] = val

      element type, attrs, children
  ]

_ = require 'lodash'
{ localStorage } = require "vue-petit-store"

random = require "~/app/plugins/random"

invoke =
  kana: require "~/app/plugins/trix-kana"
  hr: (editor, mode, range, text)->
    hr = new Trix.Attachment
      content: """<hr class="#{mode}">"""
      contentType: "block"
    editor.insertAttachment hr

editor = require './editor'

module.exports = editor
  components:
    'slate-editor': ReactInVue Editor
  mixins: []

  data: ->
    data: html.deserialize ""
    attrs:
      random: []
    fixes: []
    size: [0,0,0]
    log:
      html: ""

  props:
    value: String
    content: String
    handle: String
    id: String

    placeholder:
      type: String
      default: '入力はこちらに。'

  computed:
    is_ban_internal: ->
      for [type] in @fixes
        return true if "ban" == type
      false

    is_warn_internal: ->
      for [type] in @fixes
        return true if "warn" == type
      false

    meta: ->
      { @attrs, @size }

  mounted: ->
    if @value
      @data = html.deserialize @value
    else
      @restore()
    @change()

  beforeDestroy: ->

  methods:
    render_ref: (editor)->
      console.log { editor }

    render_block: ({ isFocused, isSelected, readOnly, parent, node, attributes, children }, @editor, next)->
      for [key, val] in [...node.data]
        attributes[key] = val
      # console.log "BLOCK", node.type, children, {isFocused, isSelected, readOnly, parent}
      element node.type, attributes, children

    render_inline: ({ isFocused, isSelected, readOnly, parent, node, attributes, children }, @editor, next)->
      for [key, val] in [...node.data]
        attributes[key] = val
      # console.log "INLINE", node.type, children, {isFocused, isSelected, readOnly, parent}
      element node.type, attributes, children

    render_mark: ({ mark, marks, attributes, children, offset, text }, @editor, next)->
      for [key, val] in [...mark.data]
        attributes[key] = val
      console.log "MARK", mark.type, marks, children, offset, text
      element mark.type, attributes, children

    render_decoration: ({ decoration, marks, attributes, children, offset, text }, @editor, next)->
      console.log "DECORATION", decoration, children, offset, text
      next()

    render_annotation: ({ annotation, marks, attributes, children, offset, text }, @editor, next)->
      console.log "ANNOTATION", annotation, children, offset, text
      next()

    restore: (backup = window.localStorage[@id])->
      return unless backup
      @data = Value.fromJSON backup

    action_invoke: (e)->
      { actionName } = e
      [..., type, mode] = actionName.split("-")

      range = @editor.getSelectedRange()
      str = @editor.getDocument().getStringAtRange range
      invoke[type] @editor, mode, range, str

    change_bare: ({ operations, value })->
      @data = value
      # @$emit "input", html.serialize value
      @change()

    paste_bare: (e)->
      console.log e, arguments

    change: _.debounce ->
      { fragment, selection, object, document, decorations, blocks } = @data

      if document
        @size = [
          document.nodes.size
          document.text.split(/[\!\?！？「」『』、。．.]+\s*|\s+/).length - 1
          document.text.length - 1
        ]

      @fixes = []

      hash = {}
      @attrs.random = hash.kbd ? []

      for str in @attrs.random
        console.log str.match random.match
        type = 
          if str.match random.match
            "ok"
          else
            "warn"
        @fixes.push [type, str, (->)]

      "".replace /(ftp|https?):\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/ig, (url, protocol, head, src)=>
        console.log "uri: ", head, tail, protocol, url
        return src unless protocol

        tail  = head +     url.length
        tail2 = head + 1 + protocol.length
        result_range = [head + 1, tail2]
        console.log head, tail, tail2, " #{protocol} ", { href: url }
        @fixes.push ["ban", url, ->
          editor.recordUndoEntry "Auto Link"
          editor.setSelectedRange [head, tail]
          editor.insertString " #{protocol} "
          editor.setSelectedRange result_range
          editor.activateAttribute 'href', url
        ]
        return ""

      if @id
        window.localStorage[@id] = @data.toJSON()
      @log.html = html.serialize @data
      @$emit 'input', @log.html
    , 300

    focus: (e)->
      range = @editor.getSelectedRange()
      @$emit 'selection', range

    blur: (e)->
      @$emit 'selection', null

  watch:
    value: _.debounce (newValue, oldValue)->
      return if @log.html == newValue
      console.log "force change.", { newValue, oldValue }
      @data = html.deserialize @value
    , 500

</script>
<style lang="sass">
</style>
