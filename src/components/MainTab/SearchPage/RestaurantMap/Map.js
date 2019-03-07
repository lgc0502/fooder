/*global google*/
import React, { Component, Fragment } from 'react'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  google,
} from 'react-google-maps'

import unSelect from '../../../../image/place_grey.png'
import Select from '../../../../image/place_red.png'
import MyLocation from '../../../../image/mylocation.png' 

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
    const { position, data, scrollrecord } = this.props
    //console.log(data[scrollrecord].location.lat)
    return (
      <Fragment>
        <this.CMap
          googleMapURL={this.props.googleMapURL}
          loadingElement={<div style={{ height: `80%` }} />}
          containerElement={
            <div style={{ height: `calc(100vh - 106px)`, width: `100vw` }} />
          }
          mapElement={<div style={{ height: `100%` }} />}
          center={{lat: data[scrollrecord].location.lat, lng:  data[scrollrecord].location.lng }}
        >
          <Marker 
            position={{ lat: this.props.position[0], lng: this.props.position[1] }} 
            defaultOpacity={0.9} 
            icon={{
              url: MyLocation,
              scaledSize: new window.google.maps.Size(18, 18)
            }}
          />
          {data.map(d => {
            return (
              <Marker
                key={data.indexOf(d)}
                position={{ lat: d.location.lat, lng: d.location.lng }} 
                defaultOpacity={0.9} 
                visible={
                  Math.floor(scrollrecord/20)==Math.floor(data.indexOf(d)/20)?(true):(false)
                }
                icon={{
                  url: data.indexOf(d)==scrollrecord?(Select):(unSelect),
                  scaledSize: new window.google.maps.Size(50, 50)
                }}
                
              />
            )
          })}
        </this.CMap>
      </Fragment>
    )
  }
}

export default Map
