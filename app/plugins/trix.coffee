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
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="strong" data-trix-key="b" tabindex="-1"><strong>太</strong></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="del" tabindex="-1"><del>薄</del></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="ins" tabindex="-1"><ins>◎</ins></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="s" tabindex="-1"><s>◎</s></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="sup" tabindex="-1"><i class="mdi mdi-format-superscript"></i></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="sub" tabindex="-1"><i class="mdi mdi-format-subscript"></i></button>
      <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">
      </span>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="em" tabindex="-1"><em style="font-size: 1.4ex">あ</em></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="mark" tabindex="-1"><mark>あ</mark></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="abbr" tabindex="-1"><abbr>あ</abbr></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="q" tabindex="-1"><q>あ</q></button>
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
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="kbd" tabindex="-1"><kbd>🎲</kbd></button>
      </span>
      <span class="trix-button-group trix-button-group--block-tools" data-trix-button-group="block-tools">
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="default" tabindex="-1"><i class="mdi mdi-format-align-left"></i></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="center" tabindex="-1"><i class="mdi mdi-format-align-center"></i></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="nav" tabindex="-1"><i class="mdi mdi-format-align-right"></i></button>
      </span>
      <span class="trix-button-group trix-button-group--block-tools" data-trix-button-group="block-tools">
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="details" tabindex="-1"><i class="mdi mdi-details"></i></button>
        <button type="button" class="trix-button trix-button--icon" data-trix-attribute="marquee" tabindex="-1"><i class="mdi mdi-transfer-left"></i></button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-quote" data-trix-attribute="quote" tabindex="-1"></button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-pre" data-trix-attribute="pre" tabindex="-1"></button>
      </span>
      <span class="trix-button-group trix-button-group--block-tools" data-trix-button-group="block-tools">
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
  """


reset Trix.config.blockAttributes, attributes =
  default:
    tagName: "p"
    parse: false
    breakOnReturn: false
  center:
    tagName: "center"
    parse: false
    breakOnReturn: false
  nav:
    tagName: "nav"
    parse: false
    breakOnReturn: false
  details:
    tagName: "details"
    parse: false
    breakOnReturn: false
  marquee:
    tagName: "marquee"
    parse: false
    breakOnReturn: false
  quote:
    tagName: "blockquote"
    nestable: true
  pre:
    tagName: "pre"
    terminal: true
    text:
      plaintext: true
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
  strong:
    tagName: "strong"
    inheritable: true
  em:
    tagName: "em"
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

  sup:
    tagName: "sup"
    inheritable: true
  sub:
    tagName: "sub"
    inheritable: true

  kbd:
    tagName: "kbd"
    inheritable: true
    terminal: true
    text:
      plaintext: true
  mark:
    tagName: "mark"
    inheritable: true
  abbr:
    tagName: "abbr"
    inheritable: true
  q:
    tagName: "q"
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
