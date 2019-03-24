/**
 * @external document
 * @type {Document}
 */

/**
 * @param {string} url
 * @returns {HTMLAnchorElement}
 */
function parseUrl (url) {
  if ((typeof url !== 'string') || url.indexOf('http', 0) === -1) 
    return undefined
  
  const urlElement = document.createElement('a')
  urlElement.href = url
  // Internet Explorer omits the leading slash, so we should normalize it
  urlElement.pathname = urlElement.pathname.replace(/(^\/?)/,'/')
  return urlElement
}

function formatObj(obj) {
  return '\n{' + '\n  host: ' + obj.hostname + ',' + '\n  path: ' + obj.pathname + '\n}\n'
}

const tests = [
  0,
  1,
  -1,
  NaN,
  undefined,
  null,
  {},
  'com/29',
  'example',
  'example.com',
  'https://example.com',
  'https://example.com/some/path?name',
  'https://www.example.com/some/path?name=value&foo=bar#anchor',
  'https://www.example.com/some/path?name=value#anchor',
  'http://www.example.com/some/path?name=value#anchor',
  'http://www.example.com/some/path'
]
tests.forEach(function(item, i) {

  /**
   * @typedef {ParsedURL}
   */
  const result = parseUrl(item)

  console.log('Test #%s : %c%s %c%s', i, 'color:red', (result) ? formatObj(result) : 'undefined', 'color:blue', item)
})
