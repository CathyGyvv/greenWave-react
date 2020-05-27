'use strict'

import React from 'react'

import { observer } from 'mobx-react'
import classnames from 'classnames/bind'
import styles from './index.less'
import { injectIntl } from 'react-intl'
import { Link, browserHistory } from 'react-router'
import { CBAppHeader } from 'citybrain'

const cx = classnames.bind(styles)

@observer
class Header extends React.Component {
  selectMenu(n) {

  }

  onAppItemClick = (e, item) => {
    window.location.href = item.href
  }

  returnAppList = () => {
    let appName = []
    let appList = []
    let appMap = { 10001: '/app/situation-analysis/', 10002: '/app/event-perceiving/', 10003: '/app/vehicle-scheduling/', 10004: '/app/traffic-org-optimize' }
    if (window.appName) {
      for (let key in window.appName) {
        if (window.appName[key]) {
          appName.push(parseInt(key))
        }
      }
    } else {
      appName = [10004, 10002, 10001, 10003]
    }
    appName.forEach((item, index) => {
      appList.push({ name: item, href: appMap[item] })
    })
    return appList
  }

  handleExit = () => {
    const { logoutPage } = window
    window.location = `${logoutPage}${encodeURIComponent(window.location.href)}`
  }

  render() {
    let currentRoute = browserHistory.getCurrentLocation().pathname
    const menu = <div className='sitenav'>
      <div className={cx({ 'header-right': true, 'header-info': true, 'header-item': true, 'active': currentRoute == '/app/app-name/realtime' })} onClick={e => this.selectMenu(0)}>
        <Link to='/app/app-name/realtime'>实时报警</Link>
      </div>
      <div className={cx({ 'header-right': true, 'header-info': true, 'header-item': true, 'active': currentRoute == '/app/app-name/history' })} onClick={e => this.selectMenu(1)}>
        <Link to='/app/app-name/history'>事件查询</Link>
      </div>
      <div className={cx({ 'header-right': true, 'header-info': true, 'header-item': true, 'active': currentRoute == '/app/app-name/statistics' })} onClick={e => this.selectMenu(2)}>
        <Link to='/app/app-name/statistics'>事件统计</Link>
      </div>
    </div >

    return (
      <div className='header-component'>
        <CBAppHeader appList={this.returnAppList()} menu={menu} onAppItemClick={this.onAppItemClick} onExit={this.handleExit} userName={'heisan'} selectedApp={10004} />
      </div>
    )
  }
}
export default injectIntl(Header)
