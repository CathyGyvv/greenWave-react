'use strict'

import React from 'react'
import { observer, inject } from 'mobx-react'
import { injectIntl } from 'react-intl'
import { Icon, Input, Button } from 'antd'
import 'antd/lib/icon/style'
import 'antd/lib/input/style'
import 'antd/lib/button/style'

import './index.less'
import loginAPI from '../../models/login.js'

import favicon_3x from '../../public/img/favicon@3x.png'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'admin',
      password: '123456'
    }
  }

  handleName = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  handlePwd = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  handleSubmit = () => {
    if (!this.state.username || !this.state.password) {
      message.warning('请输入用户名或密码')
      return false
    }
    // let params = {
    //   username: this.state.username,
    //   pwd: this.state.password,
    // }
    // loginAPI.getLogin(params)
    //   .then(res => {
    //     let id = res.data.data.tokenId
    //     window.sessionStorage.setItem('tokenId', id)
    //     window.sessionStorage.setItem('username', res.data.data.userInfo.name)
    //     window.location.href = 'realtime'
    //   })
    window.location.href = 'realtime'
  }

  componentDidMount() {
  }
  render() {
    return (
      <div className="login-component">
        <img src={favicon_3x} alt="" />
        <div className="title">公交线路优化系统</div>
        <div className="login">
          <Input.Group>
            <Input size="large" prefix={<Icon type="user" style={{ fontSize: '20px', color: '#9F9F9F' }} />} type='text' onChange={this.handleName} placeholder="请输入用户名" value={this.state.username} />
            <Input size="large" prefix={<Icon type="lock" style={{ fontSize: '20px', color: '#9F9F9F' }} />} type='password' onChange={this.handlePwd} placeholder="请输入密码" value={this.state.password} />
          </Input.Group>
          <Button type="primary" className="submit" onClick={this.handleSubmit}>登录</Button>
        </div>
      </div>
    )
  }
}
export default injectIntl(Login)