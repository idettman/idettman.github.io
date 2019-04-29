'use strict'
const test = require('tap').test
const server = {
  inject: options => new Promise(r => r({ statusCode: 200, payload: 'Hello world' }))
}

test('Home entry', async t => {
  const options = {
    method: 'GET',
    url: '/'
  }

  const response = await server.inject(options)

  t.equal(response.statusCode, 200, 'status code = 200')
  t.equal(response.payload, 'Hello world', 'Text must be Hello world')
})
