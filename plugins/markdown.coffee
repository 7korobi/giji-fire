if window?
  marked = require 'marked-pre'
  { mermaidAPI } = require 'mermaid'
  mermaidAPI.initialize
    theme: null
    startOnLoad: false

  link = (href, title, text)->
    [protocol, hostname] = href.split /// \:// | / | \? | \# ///g
    text  ||= protocol
    title ||= [protocol, hostname].join("\n")
    switch href
      when null, undefined, "", "#"
        if title
          """<q title="#{title}">#{text}</q>"""
        else
          """<q>#{text}</q>"""
      else
        if title
          """<b chk="confirm" href="#{href}" title="#{title}">#{text}</b>"""
        else
          """<b chk="confirm" href="#{href}">#{text}</b>"""

  giji_renderer = Object.assign new marked.Renderer(),
    link: link

  giji_options =
    renderer: giji_renderer
    tag: 'article'
    gfm: true
    tables: true
    indentCode: false
    taskLists: true
    breaks: true
    pedantic: false
    sanitize: true
    smartLists: true
    smartypants: true


  idx = 0
  mermaid = ({ log, id }, cb)->
    if log
      try
        mermaidAPI.render "mermaid-#{idx++}", log, cb
      catch e
        console.warn e.message
        cb e.message
    else
      cb ''

  center = giji = ({ log, id }, cb)->
    if log
      cb marked log, giji_options
    else
      cb ''

  sow = head = mono = ({ log, id }, cb)->
    log = log
    .replace ///<br>///g, "\n"

    .replace ///^\s*([~=＝…ー－―‐-])\1{4,}\s*$///gm, "<hr>"

    .replace ///<strong>([^<]*?)<\/strong><sup>([^<]*?)</sup>///g, (tag, item, title, idx, src)->
      """<abbr title="#{title}">#{item}</abbr>"""

    .replace ///<a\ title="([^"]*?)"><strong>([^<]*?)</strong></a>///g, (tag, title, item, idx, src)->
      """<abbr title="#{title}">#{item}</abbr>"""

    .replace /// ((\/\*) ([\s\S]*?) (\*\/|$)) ///g, (human)->
      """<del>#{human}</del>"""

    .replace ///[a-z]+://[^\s<]+[^<.,:;"')\]\s]///g, (url, idx, src)->
      return url if '<a href="' == src[idx - 9 ... idx].toLowerCase()
      suffix = ""
      url = url.replace ///&lt;$|&gt;$|\]$|\[$///, (last)->
        suffix = last
        ""
      link(url) + suffix

    cb """<article>#{log}</article>"""
    return

else
  sow = head = mono = giji = center = mermaid = ({ log }, cb)->
    cb log

module.exports = { sow, head, mono, giji, center, mermaid }
