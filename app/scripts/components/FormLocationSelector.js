import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'

import styles from '../utils/googleMapStyle.json'
import { asFormField, withConfig } from '../containers'
import { translate } from '../../../common/services/i18n'

const DEFAULT_ZOOM = 17
const MAP_OPTIONS = { disableDefaultUI: true, zoomControl: true, styles }

const LocationSelectorMap = withScriptjs(withGoogleMap(props => {
  const defaultCenter = {
    lat: props.config.defaultLatitude,
    lng: props.config.defaultLongitude,
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

const LocationSelectorMapContainer = withConfig('googleMapApiKey', true, props => {
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${props.config.googleMapApiKey}`

  return <LocationSelectorMap {... { ...props, googleMapURL, config }} />
})

class FormLocationSelector extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    input: PropTypes.object.isRequired,
  }

  onChange(values) {
    this.props.input.onChange(this.currentValue(values))
  }

  onBlur() {
    this.props.input.onBlur(this.currentValue())
  }

  onFocus() {
    this.props.input.onFocus(this.currentValue())
  }

  onMapClick(event) {
    this.onChange({
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng(),
    })
  }

  onAddressChange(event) {
    this.onChange({
      [event.target.name]: event.target.value,
    })
  }

  onGpsSelect(event) {
    event.preventDefault()

    this.onChange({
      mode: 'gps',
    })
  }

  onAddressSelect(event) {
    event.preventDefault()

    this.onChange({
      mode: 'address',
    })
  }

  onVirtualSelect(event) {
    event.preventDefault()

    this.onChange({
      mode: 'virtual',
    })
  }

  renderGpsSelector() {
    const { latitude, longitude } = this.props.input.value

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

        <LocationSelectorMapContainer
          containerElement={<div className="location-selector__container" />}
          loadingElement={
            <div className="location-selector__loading">
              { translate('common.loading') }
            </div>
          }
          mapElement={<div className="location-selector__map" />}
          markerPosition={ {
            lat: latitude,
            lng: longitude,
          } }
          onMapClick={this.onMapClick}
        />
      </div>
    )
  }

  renderAddressSelector() {
    const { street, cityCode, city, country } = this.props.input.value

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
              value={street}
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
              value={cityCode}
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
              value={city}
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
              value={country}
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
          src="/static/future.jpg"
        />
      </div>
    )
  }

  renderSelector() {
    const { mode } = this.props.input.value

    if (mode === 'gps') {
      return this.renderGpsSelector()
    } else if (mode === 'address') {
      return this.renderAddressSelector()
    }

    return this.renderVirtualSelector()
  }

  render() {
    const { mode } = this.props.input.value

    return (
      <div className="location-selector">
        <div className="button-group">
          <button
            className="button button--green button--small-mobile"
            disabled={mode === 'gps' || this.props.disabled}
            onClick={this.onGpsSelect}
          >
            { translate('components.locationSelector.gpsPositionMode') }
          </button>

          <button
            className="button button--green button--small-mobile"
            disabled={mode === 'address' || this.props.disabled}
            onClick={this.onAddressSelect}
          >
            { translate('components.locationSelector.addressMode') }
          </button>

          <button
            className="button button--green button--small-mobile"
            disabled={mode === 'virtual' || this.props.disabled}
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
    const { latitude, longitude } = this.props.input.value

    return `${latitude}, ${longitude}`
  }

  currentValue(newValues = {}) {
    return Object.assign({}, this.props.input.value, {
      ...newValues,
    })
  }

  constructor(props) {
    super(props)

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
