<script lang="coffee">

module.exports =
  props: ["value"]

  render: (m)->
    { value } = @
    if value
      m "article",
        domProps:
          innerHTML: value
    else
      ''

</script>
