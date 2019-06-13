Trix = require 'trix'

reset = (tgt, set)->
  for key of tgt when ! set[key]
    delete tgt[key]
  for key, val of set
    tgt[key] = val

reset Trix.config.attachments.preview.caption,
  name: false
  size: false

reset Trix.config.lang,
  attachFiles: "Attach Files"
  byte:  "Byte"
  bytes: "Bytes"
  captionPlaceholder: "Add a caption…"
  remove: ""

  url: "URL"
  urlPlaceholder: "Enter a URL…"
  link: "Link"
  unlink: "Unlink"

  ruby: "RUBY"
  rubyPlaceholder: "Enter a ruby…"
  setRuby: "Ruby"
  unRuby: "UnRuby"
  GB: "GB"
  KB: "KB"
  MB: "MB"
  PB: "PB"
  TB: "TB"

Trix.config.toolbar.getDefaultHTML = ->
  { lang } = Trix.config
  """
    <div class="trix-button-row">
      <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="bold" data-trix-key="b" tabindex="-1"><strong>太</strong></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="del" tabindex="-1"><del>薄</del></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="ins" tabindex="-1"><ins>◎</ins></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="s" tabindex="-1"><s>◎</s></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="em" data-trix-key="i" tabindex="-1"><em style="font-size: 1.4ex">あ</em></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="sup" data-trix-key="i" tabindex="-1"><sup>上</sup></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="sub" data-trix-key="i" tabindex="-1"><sub>下</sub></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="abbr" data-trix-key="i" tabindex="-1"><abbr>あ</abbr></button>
      </span>
      <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">
        <button type="button" class="trix-button trix-button--icon" data-trix-action="x-kana-invert" tabindex="-1"></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-action="x-kana-none" tabindex="-1"></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-action="x-kana-half" tabindex="-1"></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-action="x-kana-full" tabindex="-1"></button>
      </span>
      <span class="trix-button-group trix-button-group--block-tools" data-trix-button-group="block-tools">
        <button type="button" class="trix-button" data-trix-action="x-hr-stripe" tabindex="-1"><p><hr class="stripe"></p></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="h1" tabindex="-1"><h5>H1</h5></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="h2" tabindex="-1"><h5>H2</h5></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="h3" tabindex="-1"><h5>H3</h5></button>
      </span>
    </div>
    <div class="trix-button-row">
      <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-link" data-trix-attribute="href" data-trix-action="link" data-trix-key="k" tabindex="-1"></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="title" data-trix-key="i" tabindex="-1"><kbd title="random">🎲</kbd></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="data-ruby" data-trix-action="data-ruby" data-trix-key="r" tabindex="-1"><ruby data-ruby="ふりがな">仮名</ruby></button>
      </span>
      <span class="trix-button-group trix-button-group--block-tools" data-trix-button-group="block-tools">
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="default" tabindex="-1">⇦</button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="center" tabindex="-1">⇆</button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="right" tabindex="-1">⇨</button>
      </span>
      <span class="trix-button-group trix-button-group--block-tools" data-trix-button-group="block-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-quote" data-trix-attribute="quote" tabindex="-1"></button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-bullet-list" data-trix-attribute="bullet" tabindex="-1"></button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-number-list" data-trix-attribute="number" tabindex="-1"></button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-decrease-nesting-level" data-trix-action="decreaseNestingLevel" tabindex="-1"></button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-increase-nesting-level" data-trix-action="increaseNestingLevel" tabindex="-1"></button>
      </span>
      <span class="trix-button-group-spacer"></span>
      <span class="trix-button-group trix-button-group--file-tools" data-trix-button-group="file-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-attach mdi mdi-file-plus" data-trix-action="attachFiles" tabindex="-1"></button>
      </span>
      <span class="trix-button-group trix-button-group--history-tools" data-trix-button-group="history-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-undo" data-trix-action="undo" data-trix-key="z" tabindex="-1"></button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-redo" data-trix-action="redo" data-trix-key="shift+z" tabindex="-1"></button>
      </span>
    </div>
    <div class="trix-dialogs" data-trix-dialogs>
      <div class="trix-dialog trix-dialog--link" data-trix-dialog="href" data-trix-dialog-attribute="href">
        <div class="trix-dialog__link-fields">
          <input type="url" name="href" class="trix-input trix-input--dialog" placeholder="#{lang.urlPlaceholder}" aria-label="#{lang.url}" required data-trix-input>
          <div class="trix-button-group">
            <input type="button" class="trix-button trix-button--dialog" value="#{lang.link}" data-trix-method="setAttribute">
            <input type="button" class="trix-button trix-button--dialog" value="#{lang.unlink}" data-trix-method="removeAttribute">
          </div>
        </div>
      </div>
      <div class="trix-dialog trix-dialog--ruby" data-trix-dialog="data-ruby" data-trix-dialog-attribute="data-ruby">
        <div class="trix-dialog__ruby-fields">
          <input type="text" name="href" class="trix-input trix-input--dialog" placeholder="#{lang.rubyPlaceholder}" aria-label="#{lang.ruby}" required data-trix-input>
          <div class="trix-button-group">
            <input type="button" class="trix-button trix-button--dialog" value="#{lang.setRuby}" data-trix-method="setAttribute">
            <input type="button" class="trix-button trix-button--dialog" value="#{lang.unRuby}" data-trix-method="removeAttribute">
          </div>
        </div>
      </div>
    </div>
  """

reset Trix.config.blockAttributes, attributes =
  default:
    tagName: "p"
    parse: false
    breakOnReturn: true
  center:
    tagName: "p"
    className: "center"
    parse: false
    breakOnReturn: true
  right:
    tagName: "p"
    className: "right"
    parse: false
    breakOnReturn: true
  quote:
    tagName: "blockquote"
    nestable: true
  h1:
    tagName: "h1"
    terminal: true
    breakOnReturn: true
    group: false
  h2:
    tagName: "h2"
    terminal: true
    breakOnReturn: true
    group: false
  h3:
    tagName: "h3"
    terminal: true
    breakOnReturn: true
    group: false
  h4:
    tagName: "h4"
    terminal: true
    breakOnReturn: true
    group: false
  h5:
    tagName: "h5"
    terminal: true
    breakOnReturn: true
    group: false
  h6:
    tagName: "h6"
    terminal: true
    breakOnReturn: true
    group: false
  bulletList:
    tagName: "ul"
    parse: false
  bullet:
    tagName: "li"
    listAttribute: "bulletList"
    group: false
    nestable: true
    test: (element) ->
      Trix.tagName(element.parentNode) is attributes[@listAttribute].tagName
  numberList:
    tagName: "ol"
    parse: false
  number:
    tagName: "li"
    listAttribute: "numberList"
    group: false
    nestable: true
    test: (element) ->
      Trix.tagName(element.parentNode) is attributes[@listAttribute].tagName
  attachmentGallery:
    tagName: "div"
    exclusive: true
    terminal: true
    parse: false
    group: false

reset Trix.config.textAttributes,
  bold:
    tagName: "strong"
    inheritable: true
    parser: (element) ->
      style = window.getComputedStyle(element)
      style["fontWeight"] is "bold" or style["fontWeight"] >= 600
  em:
    tagName: "em"
    inheritable: true
    parser: (element) ->
      style = window.getComputedStyle(element)
      style["fontStyle"] is "em"
  del:
    tagName: "del"
    inheritable: true
  ins:
    tagName: "ins"
    inheritable: true
  s:
    tagName: "s"
    inheritable: true
  sup:
    tagName: "sup"
    inheritable: true
  sub:
    tagName: "sub"
    inheritable: true

  kbd:
    tagName: "kbd"
    inheritable: false
  abbr:
    tagName: "abbr"
    inheritable: false

  title:
    groupTagName: "kbd"
    parser: (element) ->
      {attachmentSelector} = Trix.AttachmentView
      matchingSelector = "a:not(#{attachmentSelector})"
      if link = Trix.findClosestElementFromNode(element, {matchingSelector})
        link.getAttribute("title")

  "data-ruby":
    groupTagName: "ruby"
    parser: (element) ->
      {attachmentSelector} = Trix.AttachmentView
      console.log "ruby", element, attachmentSelector
      matchingSelector = "a:not(#{attachmentSelector})"
      if ruby = Trix.findClosestElementFromNode(element, {matchingSelector})
        ruby.getAttribute("data-ruby")

  href:
    groupTagName: "a"
    parser: (element) ->
      {attachmentSelector} = Trix.AttachmentView
      matchingSelector = "a:not(#{attachmentSelector})"
      if link = Trix.findClosestElementFromNode(element, {matchingSelector})
        link.getAttribute("href")

  frozen:
    style: { "backgroundColor": "highlight" }
