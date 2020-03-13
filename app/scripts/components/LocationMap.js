import L from 'leaflet'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'

const DEFAULT_ZOOM = 1

const markerIcon = new L.Icon.Default({
  imagePath: '/static/',
})

class LocationMap extends Component {
  static propTypes = {
    initialCenter: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    onClick: undefined,
  }

  onClick(event) {
    if (!this.props.onClick) {
      return
    }

    const { lat, lng } = event.latlng

    this.props.onClick({
      latitude: lat,
      longitude: lng,
    })

    this.setState({
      position: {
        lat,
        lng,
      },
    })
  }

  onZoom(event) {
    this.setState({
      zoom: event.target._zoom,
    })
  }

  render() {
    return (
      <Map
        center={this.props.initialCenter}
        className="location-map"
        doubleClickZoom={false}
        keyboard={false}
        scrollWheelZoom={false}
        zoom={this.state.zoom}
        onClick={this.onClick}
        onZoom={this.onZoom}
      >
        <TileLayer
          attribution='&amp;copy <a target="_blank" href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker icon={markerIcon} position={this.state.position} />
      </Map>
    )
  }

  constructor(props) {
    super(props)

    const { lat, lng } = props.initialCenter

    this.state = {
      position: {
        lat,
        lng,
      },
      zoom: DEFAULT_ZOOM,
    }

    this.onClick = this.onClick.bind(this)
    this.onZoom = this.onZoom.bind(this)
  }
}

export default LocationMap
