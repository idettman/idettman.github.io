var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')
var baseDirectory = __dirname   // or whatever base directory you want

var port = 9999

http.createServer(function (request, response) {
  console.log('createServer', request, response)
   try {
     var requestUrl = url.parse(request.url)
     console.log('requestUrl', requestUrl)

     // need to use path.normalize so people can't access directories underneath baseDirectory
     var fsPath = baseDirectory+'/'+requestUrl.pathname
     console.log('fsPath', fsPath)
     
     response.writeHead(200)
     var fileStream = fs.createReadStream(fsPath)
     fileStream.pipe(response)
     fileStream.on('error',function(e) {
       console.log('error 404', e)
         response.writeHead(404)     // assume the file doesn't exist
         response.end()
     })
   } catch(e) {
     response.writeHead(500)
     response.end()     // end the response so browsers don't hang
     console.log(e.stack)
   }
}).listen(port)

console.log("listening on port "+port)