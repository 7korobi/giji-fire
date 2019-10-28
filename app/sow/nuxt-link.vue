<template lang="pug">
a(:href="href")
  slot
</template>
<script lang="coffee">
module.exports =
  props: ["to"]
  computed:
    href: ->
      if @to
        { path, query } = @to
        if path || query
          query_ary =
            for key, val of query
              "#{key}=#{val}"
          query_string = query_ary.join("&")
          "https://giji.f5.si#{path}?#{query_string}"
        else
          "https://giji.f5.si#{@to}"
      else
        undefined
</script>
