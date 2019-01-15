<script lang="coffee">
module.exports =
  props: ['node', 'updateAttrs', 'editable']
  methods:
    onChange: ->
      @updateAttrs
        done: ! @node.attrs.done

</script>
<style lang="sass" scoped>
</style>

<template lang="pug">
li(data-type="todo_item" :data-done="node.attrs.done.toString()")
  span.todo-checkbox(contenteditable="false" @click="onChange")
  .todo-content(ref="content" :contenteditable="editable.toString()")
</template>
