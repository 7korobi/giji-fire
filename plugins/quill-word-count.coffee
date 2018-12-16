module.exports = class WordCount
  constructor: (@quill, @props)->
    @container = @quill.container
    @quill.on 'text-change', @update.bind @
    @toolbar = @quill.getModule 'toolbar'
    @update()
  
  calculate: ->
    text = @quill.getText().trim()
    text.length && text.split(/\s+/).length

  update: ->
    length = @calculate()
    label =
      if length == 1
        "word"
      else
        "words"
    @toolbar = @quill.getModule 'toolbar'
    countView = document.getElementById 'quill-word-count'
    if ! countView
      countView = document.createElement 'span'
      countView.id = 'quill-word-count'
      @toolbar.container.appendChild countView
    countView.innerHTML = length + ' ' + label
