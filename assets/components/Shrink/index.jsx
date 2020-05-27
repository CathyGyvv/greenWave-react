'use strict'

import React, { Component } from 'react'
import cx from 'classnames'
import { observer, inject } from 'mobx-react'

import './index.less'

@inject('UI')
@observer
export default class Shrink extends Component {
  render () {
    const { foldSideBar } = this.props.UI
    return (
      <div
        className={cx({
          'shrink-arrow': true
        })}
        onClick={() => {
          this.props.UI.toggleFoldSideBar()
        }}
      >
        {
          !foldSideBar
            ? <i className='ET-BRAIN arrowLeft'>&#xe612;</i>
            : <i className='ET-BRAIN arrowLeft'>&#xe613;</i>
        }
      </div>
    )
  }
}
