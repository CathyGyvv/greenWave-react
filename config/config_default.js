'use strict'
const path = require('path')

module.exports = {
  /* honeybee config occupied */
  dumpConfig: true,
  root: undefined,
  serverRoot: undefined,
  serverEnv: undefined,
  /* honeybee config end */
  systemToken: 'Please Enter Your Own Token into ~/.honeycomb.json',
  debug: true,
  isDev: true,
  prefix: '/app/app-name',
  staticPath: undefined,
  logs: {
    sys: {
      level: 'INFO'
    }
  },
  middleware: {
    cookieSession: {
      config: {
        name: 'permissions_session',
        secret: 'defalutSecret!PLEASE!REPLACE!'
      }
    },
    public: {
      enable: true,
      router: '/static',
      extends: 'static',
      config: {
        root: path.join(__dirname, '../static')
      }
    },
    webpack: {
      enable: true,
      module: 'honeypack',
      router: '/assets'
    },
    thirdPartyBind: {
      enable: false,
      module: '../middleware/thirdPartyBind'
    },
    login: {
      enable: false,
      module: '../middleware/login'
    },
    loginLocal: {
      enable: false,
      module: '../middleware/loginLocal'
    },
    spa: {
      enable: true,
      module: '../middleware/spa',
      config: {
        ignore: [
          '/api',
          '/assets'
        ]
      }
    }
  },
  extension: {
    redirect: {
      config: {
        allowDomains: []
      }
    },
    appClient: {
      enable: true,
      module: 'hc-service-client',
      config: {}
    }
  },
  services: {
    backend_server: 'http://192.168.2.24:8082/',
    // 需要自行配置对应的后端服务器地址
  },
  logoutPage: 'https://account.aliyun.com/logout/logout.htm?oauth_callback=',
  // reqPrefix: '/app/app-name/api/proxy/event',
  cityInfoReqPrefix: '/app/app-name/api/proxy/cityInfo'
}
