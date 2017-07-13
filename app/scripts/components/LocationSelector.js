import PropTypes from 'prop-types'
import React, { Component } from 'react'
import withScriptjs from 'react-google-maps/lib/async/withScriptjs'
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps'

import { translate } from '../services/i18n'

const DEFAULT_CITY = 'Berlin'
const DEFAULT_COUNTRY = 'Germany'
const DEFAULT_LATITUDE = 52.53647
const DEFAULT_LONGITUDE = 13.40780
const DEFAULT_MODE = 'address'

const DEFAULT_ZOOM = 17
const GOOGLE_MAP_SCRIPT_URL = 'https://maps.googleapis.com/maps/api/js?v=3.exp'
const MAP_OPTIONS = {
  disableDefaultUI: true,
  zoomControl: true,
}

const LocationSelectorMap = withScriptjs(withGoogleMap(props => {
  return (
    <GoogleMap
      center={ { lat: DEFAULT_LATITUDE, lng: DEFAULT_LONGITUDE } }
      options={MAP_OPTIONS}
      zoom={DEFAULT_ZOOM}
      onClick={props.onMapClick}
    >
      <Marker
        position={props.markerPosition}
        title={translate('components.locationSelector.yourPlacePosition')}
      />
    </GoogleMap>
  )
}))

class LocationSelector extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
  }

  static defaultProps = {
    disabled: false,
  }

  componentWillUpdate(nextProps, nextState) {
    this.props.onChange(nextState)
  }

  onMapClick(event) {
    this.setState({
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng(),
    })
  }

  onAddressChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  onGpsSelect() {
    this.setState({
      mode: 'gps',
    })
  }

  onAddressSelect() {
    this.setState({
      mode: 'address',
    })
  }

  onVirtualSelect() {
    this.setState({
      mode: 'virtual',
    })
  }

  renderGpsSelector() {
    return (
      <div className="location-selector__view">
        <div className="location-selector__panel">
          <div className="form__field">
            <label className="form__field-label">
              { translate('components.locationSelector.currentGpsPosition') }
            </label>
            <input
              className="form__field-input"
              readOnly={true}
              type="text"
              value={this.currentLatLngString()}
            />
            <small>{ translate('components.locationSelector.clickMap') }</small>
          </div>
        </div>
        <LocationSelectorMap
          containerElement={<div className="location-selector__container" />}
          googleMapURL={GOOGLE_MAP_SCRIPT_URL}
          loadingElement={
            <div className="location-selector__loading">
              { translate('components.common.loading') }
            </div>
          }
          mapElement={<div className="location-selector__map" />}
          markerPosition={ {
            lat: this.state.latitude,
            lng: this.state.longitude,
          } }
          onMapClick={this.onMapClick}
        />
      </div>
    )
  }

  renderAddressSelector() {
    return (
      <div className="location-selector__view">
        <div className="form">
          <div className="form__field">
            <label className="form__field-label">
              { translate('components.locationSelector.street') }
            </label>
            <input
              className="form__field-input"
              disabled={this.props.disabled}
              name="street"
              type="text"
              value={this.state.street}
              onChange={this.onAddressChange}
            />
          </div>
          <div className="form__field">
            <label className="form__field-label">
              { translate('components.locationSelector.cityCode') }
            </label>
            <input
              className="form__field-input"
              disabled={this.props.disabled}
              name="cityCode"
              type="text"
              value={this.state.cityCode}
              onChange={this.onAddressChange}
            />
          </div>
          <div className="form__field">
            <label className="form__field-label">
              { translate('components.locationSelector.city') }
            </label>
            <input
              className="form__field-input"
              disabled={this.props.disabled}
              name="city"
              type="text"
              value={this.state.city}
              onChange={this.onAddressChange}
            />
          </div>
          <div className="form__field">
            <label className="form__field-label">
              { translate('components.locationSelector.country') }
            </label>
            <input
              className="form__field-input"
              disabled={this.props.disabled}
              name="country"
              type="text"
              value={this.state.country}
              onChange={this.onAddressChange}
            />
          </div>
        </div>
      </div>
    )
  }

  renderVirtualSelector() {
    return (
      <div className="location-selector__view">
        <img
          className="location-selector__kitty-future"
          src="/static/images/future.jpg"
        />
      </div>
    )
  }

  renderSelector() {
    if (this.state.mode === 'gps') {
      return this.renderGpsSelector()
    } else if (this.state.mode === 'address') {
      return this.renderAddressSelector()
    }
    return this.renderVirtualSelector()
  }

  render() {
    return (
      <div className="location-selector">
        <div className="button-group">
          <button
            className="button button--green"
            disabled={this.state.mode === 'gps' || this.props.disabled}
            onClick={this.onGpsSelect}
          >
            { translate('components.locationSelector.gpsPositionMode') }
          </button>
          <button
            className="button button--green"
            disabled={this.state.mode === 'address' || this.props.disabled}
            onClick={this.onAddressSelect}
          >
            { translate('components.locationSelector.addressMode') }
          </button>
          <button
            className="button button--green"
            disabled={this.state.mode === 'virtual' || this.props.disabled}
            onClick={this.onVirtualSelect}
          >
            { translate('components.locationSelector.virtualMode') }
          </button>
        </div>
        { this.renderSelector() }
      </div>
    )
  }

  currentLatLngString() {
    return `${this.state.latitude}, ${this.state.longitude}`
  }

  constructor(props) {
    super(props)

    this.state = {
      city: this.props.value.city || DEFAULT_CITY,
      cityCode: this.props.value.cityCode || '',
      country: this.props.value.country || DEFAULT_COUNTRY,
      latitude: this.props.value.latitude || DEFAULT_LATITUDE,
      longitude: this.props.value.longitude || DEFAULT_LONGITUDE,
      mode: this.props.value.mode || DEFAULT_MODE,
      street: this.props.value.street || '',
    }

    this.onAddressSelect = this.onAddressSelect.bind(this)
    this.onGpsSelect = this.onGpsSelect.bind(this)
    this.onMapClick = this.onMapClick.bind(this)
    this.onVirtualSelect = this.onVirtualSelect.bind(this)
    this.onAddressChange = this.onAddressChange.bind(this)
  }
}

export default LocationSelector
