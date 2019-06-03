Delta = require "quill-delta"

voice_chrs   = "がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゔゞガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴヷヸヹヺヾ"
devoice_chrs = "かきくけこさしすせそたちつてとはひふへほはひふへほうゝカキクケコサシスセソタチツテトハヒフヘホハヒフヘホウワヰヱヲヽ"
devoice = {}
for voice_chr, idx in voice_chrs
  devoice_chr = devoice_chrs[idx]
  devoice[voice_chr] = devoice_chr

selected_change = (editor, cb)->
  range = editor.getSelectedRange()
  full = editor.getDocument()
  doc = editor.getSelectedDocument()
  str = full.getStringAtRange range
  str = cb str
  editor.insertString str

module.exports = (editor, mode)->
  switch mode
    when 'invert'
      # ひらがなをカタカナに、カタカナをひらがなに
      selected_change editor, (text)->
        text.replace /([\u3041-\u3096])|([\u30a1-\u30f6])/g, (match, hira, kata)->
          if hira
            return String.fromCharCode hira.charCodeAt(0) + 0x60
          if kata
            return String.fromCharCode kata.charCodeAt(0) - 0x60
    when 'none'
      selected_change editor, (text)->
        text = text.replace /([\u3099\u309a])/g, (match, cut)->
          ""
        text = text.replace /([\u3041-\u3096\u309d\309f\u30a1-\u30fa\u30fd\u30fe\u30ff])/g, (match, chr)->
          devoice[chr] ? chr
        text
    when 'half'
      selected_change editor, (text)->
        text = text.replace /([\u3099\u309a])/g, (match, cut)->
          ""
        text = text.replace /([\u3041-\u3096\u309d\309f\u30a1-\u30fa\u30fd\u30fe\u30ff])/g, (match, chr)->
          chr = devoice[chr] ? chr
          chr + "\u309a"
        text = text.replace /([はひふへほハヒフヘホ])[\u309a]/g, (match, chr)->
          String.fromCharCode chr.charCodeAt(0) + 2
        text
    when 'full'
      selected_change editor, (text)->
        text = text.replace /([\u3099\u309a])/g, (match, cut)->
          ""
        text = text.replace /([\u3041-\u3096\u309d\309f\u30a1-\u30fa\u30fd\u30fe\u30ff])/g, (match, chr)->
          chr = devoice[chr] ? chr
          chr + "\u3099"
        text = text.replace /([かきくけこさしすせそたちつてとはひふへほカキクケコサシスセソタチツテトハヒフヘホ])[\u3099]/g, (match, chr)->
          String.fromCharCode chr.charCodeAt(0) + 1
        text
