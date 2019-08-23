<script lang="coffee">
format = require 'date-fns/format/index'
locale = require "date-fns/locale/ja"
{ relative } = require "vue-petit-store"

module.exports =
  mixins: [
    relative "since", limit: "1y", format: (since)-> format since, "yyyy/MM/dd(EE)頃", { locale }
  ]

  props:
    since:
      required: true

  render: (m)->
    m 'time', @since_text

</script>
