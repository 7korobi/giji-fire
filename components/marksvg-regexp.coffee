regexp_join = (regex, ...names) ->
  { flags, source } = regex

  for name in names
    key = new RegExp name, 'g'
    val = syntax[name]
    val = val.source or val
    source = source.replace key, val
  new RegExp source, flags

syntax =
  nodes: /^(?:_header_)? *((?:(?:_xy_)?_id__sep_)+)_eol_/
  edges: /^ *((_id_)?(?: *_arrow_ *_id_)+) *(?:_comment_)?_eol_/
  newline: /^ *\n|^ +$/
  error: /^[^\n]*\n|[^\n]+$/

  pick_node: /(?:<(\d+)(_side_| )?(\d+)>)?(_id_)/g

  _xy_: /<\d+(?:_side_| )?\d+>/
  _id_: /[^\n\s<>#]+/
  _arrow_: /(<|X|x|O|o)?_line_(_side_{2,2})?_line_(>|X|x|O|o)?/
  _header_: /#{1,3} *(.*) *\n/
  _comment_: /#{1,3} *(.*) */
  _line_: /(-|=|\.)+/
  _side_: /[udlrUDLRv^<>]/
  _sep_: / *\n? */
  _eol_: / *(?:\n|$)/

syntax._xy_      = regexp_join syntax._xy_,                    '_side_'
syntax._arrow_   = regexp_join syntax._arrow_,       '_line_', '_side_'

syntax.pick_node = regexp_join syntax.pick_node,       '_id_', '_side_'

syntax.nodes     = regexp_join syntax.nodes,   '_xy_', '_id_', '_header_',    '_sep_', '_eol_'
syntax.edges     = regexp_join syntax.edges,           '_id_', '_arrow_', '_comment_', '_eol_'

module.exports = { syntax }
