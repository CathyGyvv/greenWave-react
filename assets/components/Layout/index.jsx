'use strict'

import React from 'react'
import { browserHistory } from 'react-router'

import Header from 'components/Header'
import Login from 'components/Login'
import classnames from 'classnames'
import './index.less'

class Layout extends React.Component {
  render () {
    const className = classnames({
      'right-content': true
    })
    let currentRoute = browserHistory.getCurrentLocation().pathname
    return (
      currentRoute == '/app/app-name/login' ?
        <div className="main container">
          <Login />
        </div>
        : <div className='main container'>
          <Header key={Math.random()} />
          <div className='main-content'>
            <div className={className}>
              {this.props.children}
            </div>
          </div>
        </div>
    )
  }
}

Layout.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.element
  ])
}
export default Layout
