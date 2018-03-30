Vue = require 'vue'

if window?
  Vue = Vue.default

pager = new Vue
  data: ->
    head_idx: 0
    tail_idx: 0

module.exports =
  data: ->
    { pager }
  methods:
    page_add: (tail)->
      @pager.tail_idx = Number(tail)

  computed:
    page_idxs:
      get: ->
        [@pager.head_idx .. @pager.tail_idx]

      set: ([head, ..., tail])->
        @pager.head_idx = Number(head)
        @pager.tail_idx = Number(tail)

    page_next_idx: ->
      next = @pager.tail_idx + 1
      all = @page_all_contents ? [[]]
      next if next < all.length

    page_contents: ->
      all = @page_all_contents ? [[]]
      @page_idxs.map (page)-> all[page]
