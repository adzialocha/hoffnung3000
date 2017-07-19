import PropTypes from 'prop-types'
import React, { Component } from 'react'
import withScriptjs from 'react-google-maps/lib/async/withScriptjs'
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps'

import config from '../../../config'
import styles from '../utils/googleMapStyle.json'
import { translate } from '../services/i18n'

const DEFAULT_ZOOM = 15
const GOOGLE_MAP_SCRIPT_URL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${config.googleMapApiKey}`
const MAP_OPTIONS = {
  disableDefaultUI: true,
  styles,
  zoomControl: true,
}

const LocationGoogleMap = withScriptjs(withGoogleMap(props => {
  return (
    <GoogleMap
      defaultCenter={props.markerPosition}
      defaultOptions={MAP_OPTIONS}
      defaultZoom={DEFAULT_ZOOM}
    >
      <Marker position={props.markerPosition} />
    </GoogleMap>
  )
}))

class LocationMap extends Component {
  static propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }

  render() {
    return (
      <LocationGoogleMap
        containerElement={<div className="location-map" />}
        googleMapURL={GOOGLE_MAP_SCRIPT_URL}
        loadingElement={
          <div className="location-selector__loading">
            { translate('components.common.loading') }
          </div>
        }
        mapElement={<div className="location-map__google-map" />}
        markerPosition={ {
          lat: this.props.latitude,
          lng: this.props.longitude,
        } }
      />
    )
  }
}

export default LocationMap
