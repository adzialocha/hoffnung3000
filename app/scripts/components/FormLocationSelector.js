import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { LocationMap } from './'
import { asFormField } from '../containers'
import { translate } from '../../../common/services/i18n'

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
    const { latitude, longitude } = event

    this.onChange({
      latitude,
      longitude,
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

        <LocationMap
          className="location-selector__container"
          initialCenter={ { lat: latitude, lng: longitude } }
          onClick={this.onMapClick}
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
