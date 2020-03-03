import L from 'leaflet'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

const DEFAULT_ZOOM = 11

const markerIcon = new L.Icon.Default({
  imagePath: '/static/',
})

class CalendarMap extends Component {
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
    plots: null,
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
    const EventListPopup = ({ events, place }) => {
      const content = events.map(item => (
        <tr key={item.title} slug={item.slug}>
          <td><img className="map-popup-img" src={item.imageUrl} /></td>
          <td>{item.title}</td>
          <td>{item.time}</td>
        </tr>
      ))
      return (
        <Popup>
          <b>{place}</b><br />
          <table>
            <tbody>
              {content}
            </tbody>
          </table>
        </Popup>
      )
    }

    const VenueMarker = ({ map, latitude, longitude, events, place }) => (
      <Marker icon={markerIcon} map={map} position={[latitude, longitude]}>
        <EventListPopup events={events} place={place} />
      </Marker>
    )

    const VenueMarkers = ({ map, markers }) => {
      const items = markers.map(({ key, events, place, ...props }) => (
        <VenueMarker events={events} key={key} map={map} place={place} {...props} />
      ))
      return <div style={ { display: 'none' } }>{items}</div>
    }

    const VenueMapTileLayer = () => (
      <TileLayer
        attribution='&amp;copy <a target="_blank" href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    )

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
        <VenueMapTileLayer />
        <VenueMarkers markers={this.props.plots} />
      </Map>
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

export default CalendarMap