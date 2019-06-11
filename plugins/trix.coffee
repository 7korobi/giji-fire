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
  link: "Link"
  unlink: "Unlink"
  url: "URL"
  remove: ""
  urlPlaceholder: "Enter a URL…"
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
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="abbr" data-trix-key="i" tabindex="-1"><abbr>あ</abbr></button>
      </span>
      <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">
        <button type="button" class="trix-button trix-button--icon" data-trix-action="x-kana-invert" tabindex="-1"></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-action="x-kana-none" tabindex="-1"></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-action="x-kana-half" tabindex="-1"></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-action="x-kana-full" tabindex="-1"></button>
      </span>
      <span class="trix-button-group trix-button-group--block-tools" data-trix-button-group="block-tools">
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="h1" tabindex="-1"><h5>H1</h5></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="h2" tabindex="-1"><h5>H2</h5></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="h3" tabindex="-1"><h5>H3</h5></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="h4" tabindex="-1"><h5>H4</h5></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="h5" tabindex="-1"><h5>H5</h5></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="h6" tabindex="-1"><h5>H6</h5></button>
      </span>
    </div>
    <hr class="stripe">
    <div class="trix-button-row">
      <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-link" data-trix-attribute="href" data-trix-action="link" data-trix-key="k" tabindex="-1"></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="kbd" data-trix-key="i" tabindex="-1"><kbd>🎲</kbd></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="ruby" data-trix-key="i" tabindex="-1"><ruby data-ruby="ふりがな">仮名</ruby></button>
      </span>
      <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">
      </span>
      <span class="trix-button-group trix-button-group--block-tools" data-trix-button-group="block-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-quote" data-trix-attribute="quote" tabindex="-1"></button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-code" data-trix-attribute="code" tabindex="-1"></button>
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
    </div>
    <hr class="stripe">
  """

reset Trix.config.blockAttributes, attributes =
  default:
    tagName: "div"
    parse: false
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
  kbd:
    tagName: "kbd"
    inheritable: true
  del:
    tagName: "del"
    inheritable: true
  ins:
    tagName: "ins"
    inheritable: true
  s:
    tagName: "s"
    inheritable: true
  abbr:
    tagName: "abbr"
    inheritable: true
  ruby:
    tagName: "ruby"
    inheritable: true
  href:
    groupTagName: "a"
    parser: (element) ->
      {attachmentSelector} = Trix.AttachmentView
      matchingSelector = "a:not(#{attachmentSelector})"
      if link = Trix.findClosestElementFromNode(element, {matchingSelector})
        link.getAttribute("href")
  frozen:
    style: { "backgroundColor": "highlight" }
