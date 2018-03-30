module.exports =
  static:
    maxAge: '1y'
    setHeaders: (res, path, stat)->
      if /\.json\.gz$/.test path
        { atime, mtime, ctime, size } = stat
        console.log { mtime, size, path }
        res.setHeader 'Content-Type', 'application/javascript'
        res.setHeader 'Content-Encoding', 'gzip'

  gzip:
    threshold: 0
  etag:
    weak: true
