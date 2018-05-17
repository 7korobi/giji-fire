<template lang="pug">
div
  p.
    #[.btn {{ faces.list.length }}名]から選択できます。
  hr
  span
    check(set v-model="value", :as="tags_all") {{ tag("all").label }}
    check(set v-model="value", :as="tags_giji") {{ tag("giji").label }}
    check(set v-model="value", :as="[]") なし
  span
    check(v-model="value" as="shoji") {{ tag("shoji").label }}
    check(v-model="value" as="travel") {{ tag("travel").label }}
    check(v-model="value" as="stratos") {{ tag("stratos").label }}
    check(v-model="value" as="myth") {{ tag("myth").label }}
    check(v-model="value" as="asia") {{ tag("asia").label }}
    check(v-model="value" as="marchen") {{ tag("marchen").label }}
    check(v-model="value" as="animal") {{ tag("animal").label }}
    check(v-model="value" as="school") {{ tag("school").label }}
  span
    check(v-model="value" as="kid") {{ tag("kid").label }}
    check(v-model="value" as="young") {{ tag("young").label }}
    check(v-model="value" as="middle") {{ tag("middle").label }}
    check(v-model="value" as="elder") {{ tag("elder").label }}
  span
    check(v-model="value" as="river") {{ tag("river").label }}
    check(v-model="value" as="road") {{ tag("road").label }}
    check(v-model="value" as="immoral") {{ tag("immoral").label }}
  span
    check(v-model="value" as="guild") {{ tag("guild").label }}
    check(v-model="value" as="elegant") {{ tag("elegant").label }}
    check(v-model="value" as="ecclesia") {{ tag("ecclesia").label }}
  span
    check(v-model="value" as="medical") {{ tag("medical").label }}
    check(v-model="value" as="market") {{ tag("market").label }}
  span
    check(v-model="value" as="apartment") {{ tag("apartment").label }}
    check(v-model="value" as="servant") {{ tag("servant").label }}
    check(v-model="value" as="farm") {{ tag("farm").label }}
    check(v-model="value" as="government") {{ tag("government").label }}
  span
    check(v-model="value" as="god") {{ tag("god").label }}

</template>
<script lang="coffee">
{ Query } = require "~/plugins/memory-record"

module.exports =
  props:
    value:
      required: true
  computed:
    faces: -> Query.faces.tag @value
    tags_all: -> Query.tags.leaf.ids
    tags_giji: -> Query.tags.nodes("giji", 1).ids

  methods:
    tag: (id)->
      Query.tags.find(id)
    
</script>

<style lang="stylus">
</style>


