import React from 'react'
import { Provider } from 'mobx-react'
import Route from './router/index'
import store from './store/index'

export default class extends React.Component {
  render () {
    return (
      <Provider {...store}>
        <Route />
      </Provider>
    )
  }
}
