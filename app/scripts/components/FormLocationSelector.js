import PropTypes from 'prop-types'
import React, { Component } from 'react'
import withScriptjs from 'react-google-maps/lib/async/withScriptjs'
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps'

import { asFormField } from '../containers'
import config from '../../../config'
import styles from '../utils/googleMapStyle.json'
import { translate } from '../services/i18n'

const DEFAULT_MODE = 'address'
const DEFAULT_ZOOM = 17
const GOOGLE_MAP_SCRIPT_URL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${config.googleMapApiKey}`
const MAP_OPTIONS = { disableDefaultUI: true, zoomControl: true, styles }

const LocationSelectorMap = withScriptjs(withGoogleMap(props => {
  const defaultCenter = {
    lat: config.defaultLatitude,
    lng: config.defaultLongitude,
  }
  const center = props.markerPosition ? props.markerPosition : defaultCenter

  return (
    <GoogleMap
      defaultCenter={center}
      defaultOptions={MAP_OPTIONS}
      defaultZoom={DEFAULT_ZOOM}
      onClick={props.onMapClick}
    >
      <Marker
        position={props.markerPosition}
        title={translate('components.locationSelector.yourPlacePosition')}
      />
    </GoogleMap>
  )
}))

class FormLocationSelector extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    input: PropTypes.object.isRequired,
  }

  componentDidUpdate() {
    this.props.input.onChange(this.state)
  }

  onBlur() {
    this.props.input.onBlur(this.state)
  }

  onFocus() {
    this.props.input.onFocus(this.state)
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

  onGpsSelect(event) {
    event.preventDefault()
    this.setState({
      mode: 'gps',
    })
  }

  onAddressSelect(event) {
    event.preventDefault()
    this.setState({
      mode: 'address',
    })
  }

  onVirtualSelect(event) {
    event.preventDefault()
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
              { translate('common.loading') }
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
              onBlur={this.onBlur}
              onChange={this.onAddressChange}
              onFocus={this.onFocus}
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
              onBlur={this.onBlur}
              onChange={this.onAddressChange}
              onFocus={this.onFocus}
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
              onBlur={this.onBlur}
              onChange={this.onAddressChange}
              onFocus={this.onFocus}
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
              onBlur={this.onBlur}
              onChange={this.onAddressChange}
              onFocus={this.onFocus}
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
            className="button button--green button--small-mobile"
            disabled={this.state.mode === 'gps' || this.props.disabled}
            onClick={this.onGpsSelect}
          >
            { translate('components.locationSelector.gpsPositionMode') }
          </button>
          <button
            className="button button--green button--small-mobile"
            disabled={this.state.mode === 'address' || this.props.disabled}
            onClick={this.onAddressSelect}
          >
            { translate('components.locationSelector.addressMode') }
          </button>
          <button
            className="button button--green button--small-mobile"
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

    const { value } = props.input

    this.state = {
      city: value.city || config.defaultCity,
      cityCode: value.cityCode || '',
      country: value.country || config.defaultCountry,
      latitude: value.latitude || config.defaultLatitude,
      longitude: value.longitude || config.defaultLongitude,
      mode: value.mode || DEFAULT_MODE,
      street: value.street || '',
    }

    this.onAddressChange = this.onAddressChange.bind(this)
    this.onAddressSelect = this.onAddressSelect.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onGpsSelect = this.onGpsSelect.bind(this)
    this.onMapClick = this.onMapClick.bind(this)
    this.onVirtualSelect = this.onVirtualSelect.bind(this)
  }
}

export default asFormField(FormLocationSelector)
