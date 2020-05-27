'use strict'

import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import cx from 'classnames'
import { Map, TileLayer } from 'react-leaflet'

import Zoom from 'components/Zoom'
import FullScreen from 'components/FullScreen'

// const ReactGeoEngine = react_geoengine.default
// const MemoryDatasource = react_geoengine.MemoryDatasource
// const { HttpDatasource, resource } = react_geoengine

@inject('Map', 'UI')
@observer
export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      zoom: 16,
      mapCenter: [23.1381500649, 113.2608032227]
    }
  }

  render () {
    const { zoom, mapCenter } = this.state

    const { activeIndex, foldSideBar } = this.props.UI

    return (
      <div style={{ zIndex: 1, position: 'relative', height: '100%' }} className={cx({'gas-mask': true, 'gas-mask-hide': activeIndex !== -1 && !foldSideBar})}>
        <div className='map-container' style={{ zIndex: 10, height: '100%' }}>
          <Map
            ref={map => (this.map = map)}
            zoomControl={false}
            className='map'
            // style={{ height: window.innerHeight, width: '100%' }}
            center={mapCenter}
            minZoom={4}
            maxZoom={16}
            zoom={zoom}
          >
            <TileLayer
              url='https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
              subdomains={['04', '02', '03']}
              // url={window.cityData.tiles[0].tileUrl}
              // subdomains={window.cityData.tiles[0].subdomains}

            />
            <Zoom />
          </Map>
        </div>
        <FullScreen />
      </div>
    )
  }
}
