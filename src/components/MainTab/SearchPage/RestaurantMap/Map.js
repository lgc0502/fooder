/*global google*/
import React, { Component, Fragment } from 'react'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  google,
} from 'react-google-maps'
import fetch from "isomorphic-fetch"
import { compose, withProps, withHandlers } from "recompose"
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer"

import unSelect from '../../../../image/unselect.png'
import Select from '../../../../image/select.png'
import MyLocation from '../../../../image/mylocation.png' 
import cluster from '../../../../image/marker_clustering.png' 


const defaultMapOptions = {
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  zoomControl: false
}

class Map extends React.PureComponent {
  static defaultProps = {
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAGQwS8HQIBVmsK1LLwx0Hu3w1MeG0P_YE&v=3.exp&libraries=geometry,drawing,places'
  }
  CMap = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: this.props.position[0], lng: this.props.position[1] }}
        defaultOptions={defaultMapOptions}
        center={{ 
          lat: this.props.data[this.props.scrollrecord]['location']['coordinates'][1], 
          lng: this.props.data[this.props.scrollrecord]['location']['coordinates'][0] 
        }}
      >
        {props.children}
      </GoogleMap>
    ))
  )
  render() {
    const { position, data, scrollrecord, sortType } = this.props
    return (
      <Fragment>
        <this.CMap
          googleMapURL={this.props.googleMapURL}
          loadingElement={<div style={{ height: `80%` }} />}
          containerElement={
            <div style={{ 
                height: sortType===1?"calc(100vh - 186px)":"calc(100vh - 146px)", 
                width: `100vw`
              }} 
            />
          }
          mapElement={<div style={{ height: `100%` }} />}
        >
          <Marker 
            position={{ lat: this.props.position[0], lng: this.props.position[1] }} 
            defaultOpacity={0.9} 
            icon={{
              url: MyLocation,
              scaledSize: new window.google.maps.Size(18, 18)
            }}
          />
          <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={15}
            styles={[
              {
                url: cluster,
                height: 30,
                lineHeight: 30,
                width: 42,
                textColor:'white',
                'font-size':'14px'
              },
              {
                url: cluster,
                height: 30,
                lineHeight: 30,
                width: 42,
                textColor:'white',
                'font-size':'14px'
              },
              {
                url: cluster,
                height: 30,
                lineHeight: 30,
                width: 42,
                textColor:'white',
                'font-size':'14px'
              },
              {
                url: cluster,
                height: 30,
                lineHeight: 30,
                width: 42,
                textColor:'white',
                'font-size':'14px'
              },
              {
                url: cluster,
                height: 30,
                lineHeight: 30,
                width: 42,
                textColor:'white',
                'font-size':'14px'
              },
              ]}
            >
            {data.map(d => (
              <Marker
                key={data.indexOf(d)}
                position={{ lat: d['location']['coordinates'][1], lng: d['location']['coordinates'][0] }} 
                defaultOpacity={0.9} 
                visible={
                  Math.floor(scrollrecord/20)==Math.floor(data.indexOf(d)/20)?(true):(false)
                }
                icon={{
                  url: data.indexOf(d)==scrollrecord?(Select):(unSelect),
                  scaledSize: new window.google.maps.Size(40, 40)
                }}
                
              />
            ))}
          </MarkerClusterer>
        </this.CMap>
      </Fragment>
    )
  }
}

export default Map
