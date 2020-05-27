import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import React from 'react'
import Layout from 'components/Layout'

export default class extends React.Component {
  render() {
    // const userinfo  = (location, cb) => {
    //     require.ensure([], require => {
    //         cb(null, require('pages/userinfo'));
    //     }, 'userinfo');
    // }

    // const ques  = (location, cb) => {
    //     require.ensure([], require => {
    //         cb(null, require('pages/ques'));
    //     }, 'ques');
    // }

    // const result  = (location, cb) => {
    //     require.ensure([], require => {
    //         cb(null, require('pages/result'));
    //     }, 'result');
    // }

    // const home  = (location, cb) => {
    //     require.ensure([], require => {
    //         cb(null, require('pages/home'));
    //     }, 'home');
    // }

    const index = (location, cb) => {
      require.ensure([], require => {
        cb(null, require('pages'))
      }, 'index')
    }

    return (
      <Router history={browserHistory}>
        <Route path='/app/app-name' component={Layout}>
          <IndexRedirect to="login" />
          <Route path='realtime' getComponent={index} />
          <Route path='history' getComponent={index} />
          <Route path='statistics' getComponent={index} />
          <Route path='*' getComponent={index} />
        </Route>
      </Router>
    )
  }
}
