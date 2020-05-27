import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import axios from 'axios'
import { useStrict } from 'mobx'
import { IntlProvider } from 'react-intl'
import { messages, currentLang } from './lang/index'

useStrict(true)

function getUserInfo () {
  return axios.get(`/permissions/api/userInfo`)
    .then(response => {
      window.userInfo = response.data ? response.data.userInfo : { cityCode: '440100' }
      window.adcode = window.userInfo.cityCode
      window.appName = response.data.userInfo.cityPermissions.apps
    })
    .catch(error => {
      window.userInfo = { cityCode: '440100' }
      window.adcode = window.userInfo.cityCode
      console.log('get userinfo api error', error)
    })
}

function getCityInfo () {
  return axios.get(`${window.cityInfoReqPrefix}/api/situation_analysis/getCityInfo?adcode=${window.adcode}&appcode=${10004}`)
    .then((res) => {
      const cityData = res.data.data
      window.cityData = cityData ? { center_coor: cityData.center_coor, unAuthComs: cityData.unAuthComs, tiles: cityData.tiles } : null
    })
}

function postSome () {
  return axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }).then(function (response) {
    console.log(response)
  }).catch(function (error) {
    console.log(error)
  })
}

async function run () {
  try {
    // await getUserInfo()
    // await getCityInfo()
    // await postSome()
    ReactDOM.render(
      <IntlProvider locale={currentLang} messages={messages[currentLang]}>
        <App />
      </IntlProvider>, document.getElementById('container')
    )
  } catch (e) {
    console.error('run is error', e)
  }
}

run()
