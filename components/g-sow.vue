<script lang="coffee">

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
      if /\.(?:jpg|jpeg|png|gif|bmp)$/i.exec(href)
        if title
          """<img chk="confirm" href="#{href}" src="#{href}" title="#{title}">"""
        else
          """<img chk="confirm" href="#{href}" src="#{href}" title="#{text}">"""
      else
        if title
          """<b chk="confirm" href="#{href}" title="#{title}">#{text}</b>"""
        else
          """<b chk="confirm" href="#{href}">#{text}</b>"""

sow = (log)->
  log
  .replace ///<br>///g, "\n"

  .replace ///<strong>([^<]*?)<\/strong><sup>([^<]*?)</sup>///g, (tag, item, title, idx, src)->
    """<kbd title="#{title}">#{item}</kbd>"""

  .replace ///<a\ title="([^"]*?)"><strong>([^<]*?)</strong></a>///g, (tag, title, item, idx, src)->
    """<kbd title="#{title}">#{item}</kbd>"""

  .replace /// ((\/\*) ([\s\S]*?) (\*\/|$)) ///g, (human)->
    """<del>#{human}</del>"""
  
  .replace ///<strong>([^<]*?)</strong>///g, (tag, item, idx, src)->
    """<label>#{item}</label>"""

  .replace ///[a-z]+://[^\s<]+[^<.,:;"')\]\s]///g, (url, idx, src)->
    return url if '<a href="' == src[idx - 9 ... idx].toLowerCase()
    suffix = ""
    url = url.replace ///&lt;$|&gt;$|\]$|\[$///, (last)->
      suffix = last
      ""
    link(url) + suffix

module.exports =
  props: ["value"]

  render: (m)->
    { value } = @
    if value
      m "article",
        domProps:
          innerHTML: sow value
    else
      ''

  methods: {}
  computed: {}
</script>

<style lang="sass" scoped>
</style>
