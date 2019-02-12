import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'

import styles from '../utils/googleMapStyle.json'
import { translate } from '../../../common/services/i18n'

import { withConfig } from '../containers'

const DEFAULT_ZOOM = 15
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
    config: PropTypes.object.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }

  render() {
    const googleMapUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${this.props.config.googleMapApiKey}`

    return (
      <LocationGoogleMap
        containerElement={<div className="location-map" />}
        googleMapURL={googleMapUrl}
        loadingElement={
          <div className="location-selector__loading">
            { translate('common.loading') }
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

export default withConfig('googleMapApiKey', true, LocationMap)
