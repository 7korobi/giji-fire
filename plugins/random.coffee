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
    when 'coin'
      i = _.random(0, 1000)
      text =
        if i
          ["表","裏"][ i % 2 ]
        else
          "立った"
      return { title, text }

    when 'tarot'
      { label, roman, hebrew } = _.sample Query.tarots.list
      side = ["正","逆"][_.random(0,1)]
      text = "#{side} #{roman}.#{label}"
      return { title, text }

    when 'trump'
      { label } = _.sample Query.trumps.list
      return { title, text: label }

    when 'role'
      { list } = Query.roles.where (o)-> !( o.group in ["SPECIAL", "EVENT"] )
      { label } = _.sample list
      return { title, text: label }

    when 'who'
      { book_id } = ctx
      text = head _.sample Query.potofs.where({ book_id }).list
      return { title, text }

    else
      "-該当なし-"
