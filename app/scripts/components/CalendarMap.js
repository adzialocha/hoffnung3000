import { connect } from 'react-redux'
import L from 'leaflet'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { push } from 'connected-react-router'

const DEFAULT_ZOOM = 11

const markerIcon = new L.Icon.Default({
  imagePath: '/static/',
})

const customMarker = new L.Icon({
  iconUrl: '../../../static/virtualeventslogo.png',
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

  render() {
    const EventListPopup = ({ events, place, onPopupClick }) => {
      function handleClick(event) {
        onPopupClick(event.target.parentElement.attributes.slug.value)
      }
      const content = events.map(item => (
        <tr className={'map-popup'} key={item.title} slug={item.slug} onClick={handleClick}>
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
        <EventListPopup events={events} place={place} onPopupClick={this.onPopupClick} />
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
        center={this.state.position}
        className="location-map"
        doubleClickZoom={false}
        keyboard={false}
        scrollWheelZoom={false}
        zoom={this.props.defaultZoom}
        onClick={this.onClick}
        onZoom={this.onZoom}
      >
        <VenueMapTileLayer />
        <Marker icon={customMarker} position={this.state.position}>
          <EventListPopup events={this.props.virtualEvents} place={'VIRTUAL REALITY'} onPopupClick={this.onPopupClick} />
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
