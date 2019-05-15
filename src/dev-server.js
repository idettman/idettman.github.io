// "start": "node index.js",
// "server": "node build-scripts/server.js",

const http = require('http');

const hostname = '127.0.0.1';
const port = 8006

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('idettman.github.io - dev-server$\n');
});

server.listen(port, hostname, () => {
  console.info(`Server running at http://localhost:8080/`);
});