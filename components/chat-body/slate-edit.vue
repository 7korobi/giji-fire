<template lang="pug">
div
  slate-editor(
    ref="slate"
    :placeholder="placeholder"
    :autoFocus="true"
    :value="data"
    :onChange="change_bare"
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
    p
      label(:class="type" v-for="[type, label, call] in fixes" @click="call") {{ label }}
</template>
<script lang="coffee">
{ Editor } = require "slate-react"
{ Value } = require "slate"
{ ReactInVue } = require "vuera"

initialData = Value.fromJSON
  document:
    nodes: [
      object: "block"
      type: "paragraph"
      nodes: [
        object: "text"
        leaves: [ text: "Hello Slate.js!!!" ]
      ]
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
    data: initialData
    attrs:
      random: []
    fixes: []
    log:
      text: ""
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
      size = [
        @log.text.split("\n").length - 1
        @log.text.split(/[\!\?！？「」『』、。．.]+\s*|\s+/).length - 1
        @log.text.length - 1
      ]
      { @attrs, size }

  mounted: ->
    console.warn @$refs.slate

    if @value
      # @editor.loadHTML @value
    else
      @restore()

    @$emit 'ready', @editor

  beforeDestroy: ->

  methods:
    restore: (backup = window.localStorage[@id])->
      return unless @editor && backup
      @editor.loadJSON JSON.parse backup

    action_invoke: (e)->
      { actionName } = e
      [..., type, mode] = actionName.split("-")

      range = @editor.getSelectedRange()
      str = @editor.getDocument().getStringAtRange range
      invoke[type] @editor, mode, range, str

    change_bare: ({ operations, value })->
      @data = value
      console.warn value.toJSON(), operations
      @log.text = ""
      @log.html = ""

      @$emit "input", @log.html
      @change()

    change: _.debounce ->
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

      @log.text.replace /(ftp|https?):\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/ig, (url, protocol, head, src)=>
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

      window.localStorage[@id] = @value
    , 300

    paste: ({ paste })->
      { range, string, type } = paste
      console.log { range, string, type }

    focus: (e)->
      range = @editor.getSelectedRange()
      @$emit 'selection', range

    blur: (e)->
      @$emit 'selection', null

    logger: (e)->
      console.log e

  watch:
    value: _.debounce (newValue)->
      unless @log.html == newValue
        console.log "force change."
    , 500

</script>
<style lang="sass">
</style>
