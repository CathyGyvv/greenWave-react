'use strict'
const pathIgnore = require('path-ignore')
const config = require('../config')

// var EtLangSpa = require('@alife/et-components/lib/components/Lang/EtLangSpa')
// 脚手架搭建默认的语言json格式（和项目中语言包格式一致）
// var i18n1 = require ("../assets/mockLang.json")

// 项目中已经形成的语言包
// var i18n1 = require('@alife/mcms_event-perceiving_et-brain')
// var i18n2 = require('@alife/mcms_event-perceiving_et-brain')
// var i18n3 = require('@alife/mcms_et-components_et-brain')
// let i18n = [
//   {appCode: '1001', langes: i18n1}
//   // {appCode:"1002",langes:i18n2},
//   // {appCode:"1003",langes:i18n3},
// ]

module.exports = function (app, options) {
  const tester = pathIgnore(options.ignore)

  return (req, res, next) => {
    if (tester(req.path)) {
      return next()
    }
    // var i18 = EtLangSpa(req, i18n)
    // let currentLang = i18.currentLang
    // let messages = i18.messages
    let currentLang = 'zh-cn'
    let messages = {
      'zh-cn': {
        'title': '交通在组织优化',
        '1002_title': '城市事件感知',
        '1003_title': '交通诱导'
      },
      'en-us': {
        'title': 'english....',
        '1002_title': 'english...',
        '1003_title': 'english...'
      }
    }
    res.render('index.html', {
      isDebug: config.debug,
      reqPrefix: config.reqPrefix,
      cityInfoReqPrefix: config.cityInfoReqPrefix,
      downloadPrefix: config.downloadPrefix,
      csrfToken: req.csrfToken(),
      prefix: config.staticPath || (config.prefix === '/' ? '' : config.prefix),
      env: config.env,
      privateCloud: !!config.privateCloud,
      title: messages[currentLang]['title'],
      // title: '应用名称',
      logoutPage: config.logoutPage
    })
  }
}
