
require "~/models/index"

ctx = require.context ".", true, ///(.+)-spec\.coffee$///
for fname in ctx.keys()
  ctx(fname)
