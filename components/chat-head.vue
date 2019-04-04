<template lang="pug">
.name.center(v-if="(!! to)")
  span.pull-right {{ to }}
  | ▷
  span.pull-left {{ head }}
.name(v-else)
  sup.pull-right(v-if="label") {{ label }}
  | {{ head }}
</template>

<script lang="coffee">
module.exports =
  props: ["full","head", "to", "label"]
</script>
