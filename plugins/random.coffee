{ Query, Set, State } = require "~/plugins/memory-record"
_ = require 'lodash'

head = (o)->
  if o
    "#{o.job} #{o.face.name}"
  else
    "-該当なし-"

module.exports = (title, ctx)->
  words = title.split "|"

  if 1 < words.length
    text = _.sample words
    return { title, text }

  if dices = title.match /^(\d*)d(\d+)$/
    size  = Number dices[1] or 1
    range = Number dices[2]
    results =
      for i in [1..size]
        _.random 1, range
    text = "" + _.sum results
    title = "#{title} = #{results.join("+")}"
    return { title, text }

  if title in Query.tags.ids
    # TODO: _.sampleSize list, size
    text = head _.sample Query.chr_jobs.tag(title).list
    return { title, text }

  switch title
    when 'role'
      { list } = Query.roles.where (o)-> !( o.group in ["SPECIAL", "EVENT"] )
      { label } = _.sample list
      text = label
      return { title, text }

    when 'who'
      { book_id } = ctx
      text = head _.sample Query.potofs.where({ book_id }).list
      return { title, text }

    else
      if Query.random.deck(title)
        text = Query.random.choice(title)
        return { title, text }

      else
        text = title
        return { title, text }
