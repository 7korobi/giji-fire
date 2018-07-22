{ Query, Set, State } = require "~/plugins/memory-record"
_ = require 'lodash'

head = (o)->
  if o
    "#{o.job} #{o.face.name}"
  else
    "-該当なし-"

module.exports = (word, ctx)->
  words = word.split("|")
  if 1 < words.length
    return _.sample words

  if word in Query.tags.ids
    # TODO: _.sampleSize list, size
    return head _.sample Query.chr_jobs.tag(word).list

  switch word
    when 'tarot'
      ""
    when 'role'
      { list } = Query.roles.where (o)-> !( o.group in ["SPECIAL", "EVENT"] )
      { label } = _.sample list
      return label

    when 'who'
      { book_id } = ctx
      return head _.sample Query.potofs.where({ book_id }).list

    else
      "-該当なし-"
