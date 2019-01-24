window.Quill = Quill = require('quill/quill').default
Delta = require "quill-delta"
normalizeUrl = require "normalize-url"

Color = Quill.import 'attributors/class/color'
Color.whitelist = ['Y0','Y1','Y2','Y4','Y6','Y8']

Background = Quill.import 'attributors/class/background'
Background.whitelist = ['Y0','Y1','Y2','Y4','Y6','Y8']

Font = Quill.import 'attributors/class/font'
Font.whitelist = ["monospace"]

Size = Quill.import 'attributors/class/size'
Size.whitelist = ["small", "large", "huge"]

Keyboard = Quill.import 'modules/keyboard'
Keyboard.DEFAULTS.bindings.tab.handler

icons = Quill.import 'ui/icons'
icons.italic = """<em>あ</em>"""
icons.ruby = """<ruby data-ruby="るび">文字</ruby>"""
icons.codeblock = icons.code = """<code>あ</code>"""
icons.abbr = """<abbr>あ</abbr>"""
icons.random = """🎲"""

Inline = Quill.import 'blots/inline'
Inline.order.push 'abbr'

class ABBR extends Quill.import 'formats/code'
  @tagName: 'ABBR'
  @blotName: 'abbr'

class RANDOM extends Quill.import 'blots/inline'
  @tagName: 'KBD'
  @blotName: 'random'
  @create: (value)->
    domNode = super.create value
    return domNode unless value?.length
    domNode.title = value
    domNode

  @value: (domNode)->
    domNode.title

  @formats: (domNode)->
    domNode.title

  constructor: (scroll, node)->
    super(scroll, node)

  format: (name, value)->
    if name == @statics.blotName && value?.length
      @domNode.title = value
    else
      super.format name, value


class Ruby extends Quill.import 'blots/inline'
  @tagName:  'RUBY'
  @blotName: 'ruby'
  @create: (value)->
    domNode = super.create value
    return domNode unless value?.length
    domNode.dataset.ruby = value
    domNode

  @value: (domNode)->
    console.log "value"
    console.log domNode
    domNode.dataset.ruby

  @formats: (domNode)->
    console.log "formats"
    console.log domNode
    domNode.dataset.ruby

  constructor: (scroll, node)->
    super(scroll, node)

  format: (name, value)->
    if name == @statics.blotName && value?.length
      @domNode.dataset.ruby = value
    else
      super.format name, value

require "quill-mention/dist/quill.mention.min"

class mention extends Quill.import 'blots/embed'
  @tagName: 'q'
  @blotName: 'mention'
  @className: 'cite-bottom'

  @value: (node)-> node.dataset
  @setDataValues: null
  @create: (data)->
    node = super.create("#{data.mark}#{data.id}")
    node.setAttribute "cite", data.id
    node.innerText = "#{data.mark}#{data.id}"
    for key, val of data
      node.dataset[key] = val
    node

  constructor: (scroll, node)->
    super(scroll, node)
    console.log @

Quill.register
  'formats/background': Background
  'formats/color': Color
  'formats/font': Font
  'formats/size': Size
  'formats/abbr': ABBR
  'formats/ruby': Ruby
  'formats/random':  RANDOM
  'formats/mention': mention
  'modules/keyboard': Keyboard
