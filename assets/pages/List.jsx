'use strict'

import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import cx from 'classnames'

import Shrink from 'components/Shrink'

@inject('List', 'UI')
@observer
export default class extends Component {
  componentWillMount () {

  }

  render () {
    const { foldSideBar } = this.props.UI

    return (
      <div className={cx({ list: true, 'list-hide': foldSideBar })}>
        <Shrink />
      </div>
    )
  }
}
