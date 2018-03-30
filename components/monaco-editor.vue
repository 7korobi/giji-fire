<template lang="pug">
div(v-once)
</template>

<script lang="coffee">

if window?
  window.require.config
    paths:
      vs: 'https://s3-ap-northeast-1.amazonaws.com/giji-assets/nuxt/monaco-editor/vs'

module.exports =
  default:
    props:
      value: String

    data: ->
      value_past: ""
      editor: null
      monaco: null

    mounted: ->
      window?.require ['vs/editor/editor.main'], =>
        @monaco = monaco
        @editor = monaco.editor.create @$el,
          value: @value
          theme: 'vs'
          language: 'markdown'

          rulers: [58, 70]

          scrollbar:
            horizontal: 'hidden'
            vertical:   'hidden'

          folding: true
          readOnly: false

          disableMonospaceOptimizations: true
          experimentalScreenReader: false
          emptySelectionClipboard: false
          fixedOverflowWidgets: false
          scrollBeyondLastLine: false
          selectOnLineNumbers: true
          snippetSuggestions: "bottom"
          roundedSelection: true
          automaticLayout: false
          parameterHints: true
          glyphMargin: true
          useTabStops: true

          cursorStyle: "line"
          cursorBlinking: "smooth"

          wordWrap: false
          wrappingColumn: 58
          wrappingIndent: 'same'

          renderControlCharacters: true
          renderLineHighlight: "line"
          renderWhitespace: "all"
          renderIndentGuides: true

          formatOnPaste: true
          formatOnType:  true

          suggestLineHeight: 14
          suggestFontSize: 12

          lineNumbers: "on"
          lineNumbersMinChars: 2
          lineDecorationsWidth: 4
          lineHeight: 20
          fontSize: 16
          fontWeight: "normal"
          fontFamily: "monospace"
          fontLigatures: false
        
        @editor.onDidChangeModelContent (e)=>
          @$emit "input", @editor.getValue
            preserveBOM: false
        @editor.onDidChangeCursorPosition (e)=>
          console.log arguments
        @editor.onDidChangeCursorSelection (e)=>
          console.log arguments
        

    beforeDestroy: ->
      return unless window?
      # garbage cleanup
      @editor.dispose()

    watch:
      value: (newStr, oldStr)->
        @value_past = @editor.getValue
          preserveBOM: false
        return if newStr == @value_past

        console.log newStr, oldStr
        @editor.setValue newStr

    computed: {}

</script>