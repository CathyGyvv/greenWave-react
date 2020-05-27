'use strict'

import React, { Component } from 'react'
import { ZoomControl } from 'react-leaflet'
import { observer } from 'mobx-react'
import { injectIntl, intlShape } from 'react-intl'

import './index.less'

@observer
class Zoom extends Component {
  componentDidMount () {
    let zoomInDom = document.getElementsByClassName(
      'leaflet-control-zoom-in'
    )[0]
    let zoomOutDom = document.getElementsByClassName(
      'leaflet-control-zoom-out'
    )[0]
    zoomInDom.setAttribute('title', '放大')
    zoomInDom.innerHTML = `<img src="${require('../../public/img/zoom-in.png')}"/>`
    zoomOutDom.setAttribute('title', '缩小')
    zoomOutDom.innerHTML = `<img src="${require('../../public/img/zoom-out.png')}"/>`
  }

  render () {
    return <ZoomControl position='topright' />
  }
}
Zoom.propTypes = {
  intl: intlShape.isRequired
}
export default injectIntl(Zoom)
