import L from 'leaflet'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'

const DEFAULT_ZOOM = 13

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
    plots: PropTypes.array,
  }

  static defaultProps = {
    onClick: undefined,
    plots: undefined,
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
    const markers = this.props.plots
    const MyMarker = ({ map, latitude, longitude }) => (
      <Marker icon={markerIcon} map={map} position={[latitude, longitude]} />
    )

    const MyMarkersList = ({ map }) => {
      const items = markers.map(({ key, ...props }) => (
        <MyMarker key={key} map={map} {...props} />
      ))
      return <div style={ { display: 'none' } }>{items}</div>
    }

    const MyMap = () => (
      <Map
        center={this.props.initialCenter}
        className="location-map"
        doubleClickZoom={false}
        keyboard={false}
        scrollWheelZoom={false}
        zoom={this.state.zoom}
        onClick={this.onClick}
        onZoom={this.onZoom}
      />
    )

    const MyTileLayer = () => (
      <TileLayer
        attribution='&amp;copy <a target="_blank" href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    )

    if (!this.state.plots) {
      return (
        <MyMap >
          <MyTileLayer />
          <Marker icon={markerIcon} position={this.state.position} />
        </MyMap>
      )
    }
    return (
      <MyMap >
        <MyTileLayer />
        <MyMarkersList markers={markers} />
      </MyMap>
    )
  }

  constructor(props) {
    super(props)

    const { lat, lng } = props.initialCenter
    const plots = props.plots

    this.state = {
      plots: plots,
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
