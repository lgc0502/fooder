import React, { Component, Fragment } from 'react'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'

const defaultMapOptions = {
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  zoomControl: false
}

class Map extends Component {
  static defaultProps = {
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAGQwS8HQIBVmsK1LLwx0Hu3w1MeG0P_YE&v=3.exp&libraries=geometry,drawing,places'
  }
  
  CMap = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: this.props.position[0], lng: this.props.position[1] }}
        defaultOptions={defaultMapOptions}
      >
        {props.children}
      </GoogleMap>
    ))
  )

  render() {
    const { position, data } = this.props
    return (
      <Fragment>
        <this.CMap
          googleMapURL={this.props.googleMapURL}
          loadingElement={<div style={{ height: `80%` }} />}
          containerElement={
            <div style={{ height: `calc(100vh - 106px)`, width: `100vw` }} />
          }
          mapElement={<div style={{ height: `100%` }} />}
          center={{ lat: 25.03, lng: 121.6 }}
        >
          <Marker 
            position={{ lat: this.props.position[0], lng: this.props.position[1] }} 
          />
          {data.map(d => {
            return (
              <Marker
                key={data.indexOf(d)}
                position={{ lat: d.location.lat, lng: d.location.lng }} 
                color={'#CFCFCF'}
              />
            )
          })}
        </this.CMap>
      </Fragment>
    )
  }
}

export default Map
