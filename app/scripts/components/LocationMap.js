import L from 'leaflet'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'

const markerIcon = new L.Icon.Default({
  imagePath: '/static/',
})

class LocationMap extends Component {
  static propTypes = {
    defaultZoom: PropTypes.number,
    initialCenter: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
    onZoom: PropTypes.func,
  }

  static defaultProps = {
    defaultZoom: 13,
    onClick: undefined,
    onZoom: undefined,
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

  render() {
    return (
      <Map
        center={this.props.initialCenter}
        className="location-map"
        doubleClickZoom={false}
        keyboard={false}
        scrollWheelZoom={false}
        zoom={this.props.defaultZoom}
        onClick={this.onClick}
        onZoom={this.props.onZoom}
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
    }

    this.onClick = this.onClick.bind(this)
  }
}

export default LocationMap
