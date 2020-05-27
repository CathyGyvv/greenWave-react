'use strict'

const config = require('./config')
const app = require('./app')
const Proxy = require('hc-proxy')
const proxyInstance = new Proxy({
  service: {
    bus: {
      endpoint: config.services.backend_server,
      client: 'http',
      api: [
        '/*'
      ]
    }
  },
  headers: [
    'x-csrf-token',
    'X-Operator',
    'Authorization'
  ]
})

proxyInstance.setProxyPrefix('/api/proxy')

module.exports = function (router) {
  proxyInstance.mount(router, app)
}
