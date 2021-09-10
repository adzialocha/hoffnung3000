import L from 'leaflet'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { translate } from '../../../common/services/i18n'

const DEFAULT_ZOOM = 11

const markerIcon = new L.Icon.Default({
  imagePath: '/static/',
})

const customMarker = new L.Icon({
  iconUrl: '/static/virtualeventslogo.png',
  iconSize: [40, 40],
})

class CalendarMap extends Component {
  static propTypes = {
    defaultZoom: PropTypes.number.isRequired,
    initialCenter: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    plots: PropTypes.array,
    push: PropTypes.func.isRequired,
    virtualEvents: PropTypes.array,
  }

  static defaultProps = {
    plots: null,
    virtualEvents: null,
  }

  onPopupClick(slug) {
    this.props.push(`/events/${slug}`)
  }

  onClick(event) {
    const { lat, lng } = event.latlng

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

  onPopupMapClick(event) {
    onPopupClick(event.target.parentElement.attributes.slug.value)
  }

  render() {
    const EventListPopup = ({ events, place }) => {
      const content = events.map(item => (
        <tr className={'map-popup'} key={item.title} slug={item.slug} onClick={this.onPopupMapClick}>
          <td><img className="map-popup-img" src={item.imageUrl} /></td>
          <td>{item.title}</td>
          <td>{item.time}</td>
        </tr>
      ))

      return (
        <Popup>
          <strong>{place}</strong>
          <br />

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
        <EventListPopup events={events} place={place} onPopupClick={this.onPopupClick} />
      </Marker>
    )

    const VenueMarkers = ({ map, markers }) => {
      return markers.map(({ key, events, place, ...props }) => (
        <VenueMarker events={events} key={key} map={map} place={place} {...props} />
      ))
    }

    const VenueMapTileLayer = () => (
      <TileLayer
        attribution='&amp;copy <a target="_blank" href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    )

    return (
      <Map
        center={this.state.position}
        className="location-map"
        doubleClickZoom={false}
        keyboard={false}
        scrollWheelZoom={true}
        zoom={this.state.zoom}
        onClick={this.onClick}
        onZoom={this.onZoom}
      >
        <VenueMapTileLayer />

        <Marker icon={customMarker} position={this.state.position}>
          <EventListPopup
            events={this.props.virtualEvents}
            place={translate('components.calendarMap.virtualPlace')}
          />
        </Marker>

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

    this.onPopupClick = this.onPopupClick.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onZoom = this.onZoom.bind(this)
  }
}

function mapStateToProps() {
  return {}
}

export default connect(
  mapStateToProps, {
    push,
  }
)(CalendarMap)
