const s = require('http').createServer((q, s) => {

  console.error(q.method, q.url)
  switch (q.url) {
    case '/':
      return html(s)

    case '/app.js':
      return js(s)

    default:
      s.statusCode = 404
      s.setHeader('content-type', 'text/plain')
      s.end('Not found: ' + q.url + '\n')
  }
})

const html = s => {
  s.setHeader('content-type', 'text/html')
  s.end(`<!doctype html><html>
<script type=module>
import app from './app.js';
app();
</script>`)
}

const js = s => {
  s.setHeader('content-type', 'application/javascript')
  s.end(`
const el = document.createElement('h1')
el.innerHTML = 'blerg'
document.body.appendChild(el)
const app = () => console.log('hi from app.js')
export default app
`)
}

s.listen(8080)
