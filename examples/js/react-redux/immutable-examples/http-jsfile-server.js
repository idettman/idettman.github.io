const http = require("http"), url = require("url"), path = require("path"), fs = require("fs"), port = process.argv[2] || 8888

const server = http.createServer(function(req, res) {

  const parsedURL = url.parse(req.url), uri = parsedURL.pathname, lastPathname = uri.split('/').slice(-1), filename = path.join(process.cwd(), uri), isJsfile = /\.js/.test(filename), isHtml = /.\.html$/.test(filename)

  console.log('lastPathname', lastPathname);
  console.log('request: isJS: %s, isHTML: %s', isJsfile, isHtml)
  // console.log('request: %O,  response: %O  isJS: %s, isHTML: %s', req, res, isJsfile, isHtml)
  console.log('uri:%s filename:%s', uri, filename)

  if (isJsfile) {
    fs.exists(filename, function fsExists (exists) {
      if (exists) {
        fs.readFile(filename, "binary", function fsReadFile (err, file) {
          if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"})
            res.write(err + "\n")
            res.end()
            return
          }
          res.writeHead(200)
          res.write(file, "binary")
          res.end()
        })
      } else {
        res.writeHead(500, {"Content-Type": "text/plain"})
        res.write("File does not exist\n")
        res.end()
      }
    });
  } else {
    if (isHtml) {
      const body = `<!doctype html>
<html lang="en">
<head>
<title>HTLM JS HARNESS</title>
<meta charset="UTF-8">
</head>
<body>
<script src="${uri.slice(0, -4) + 'js'}"></script>
</body>
</html>`
      
      res.setHeader('Content-Type', 'text/html; charset=UTF-8')
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
      res.write(new Buffer(body))
      res.end()
    }
  }
}).listen(parseInt(port, 10))

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");