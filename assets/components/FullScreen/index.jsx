'use strict'

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import cx from 'classnames'

import './index.less'

@inject('UI')
@observer
export default class extends Component {
  componentDidMount () {
    // 监听地图全屏打开关闭事件
    document.addEventListener('webkitfullscreenchange', e => {
      if (!document.webkitIsFullScreen) {
        this.props.UI.exitFullScreen()
      }
    })
  }

  render () {
    const { fullscreen, activeIndex, foldSideBar } = this.props.UI
    const iconPrefix = fullscreen ? require('../../public/img/exit-full-screen.png') : require('../../public/img/full-screen.png')
    return (
      <div
        className={cx('full-screen', {
          hasRightWin: activeIndex !== -1 && !foldSideBar
        })}
        onClick={() => {
          this.props.UI.toggleFullScreen()
        }}
      >
        <img
          className={cx('full-screen-icon')}
          src={iconPrefix}
        />
      </div>
    )
  }
}
