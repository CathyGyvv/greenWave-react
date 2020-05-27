// import { EtLang } from '@alife/et-components'
// 脚手架搭建默认的语言json格式（和项目中语言包格式一致）
// var i18n1 = require ("../mockLang.json")

// 项目中已经形成的语言包（一个或者多个）
// var i18n1 = require('@alife/mcms_event-perceiving_et-brain')
// var i18n2 = require('@alife/mcms_event-perceiving_et-brain')
// var i18n3 = require('@alife/mcms_et-components_et-brain')

/*
i18n1为项目的主要语言包，其余的为辅助的语言包（i18n2、i18n3......）
主语言包的appCode，可以不传入，辅助语言包的appCode必传
*/
// let i18n = [
//   {appCode: '1001', langes: i18n1}
//   // {appCode:"1002",langes:i18n2},
//   // {appCode:"1003",langes:i18n3},
// ]

// var i18 = EtLang(i18n)
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

/*
最终返回的i18是多个语言包合并后的语言包
合并规则: key:appCode_key,value:value
主语言包的key不做任何修改
返回结果：
{
  "zh-cn":{
    "title":"交通在组织优化",
    "1002_title":"城市事件感知"
    "1003_title":"交通诱导"
  },
  "en-us":{
    "title":"english....",
    "1002_title":"english..."
    "1003_title":"english..."
  }
}
*/
export {
  messages,
  currentLang
}
