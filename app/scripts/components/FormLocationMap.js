import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { LocationMap } from './'
import { asFormField } from '../containers'
import { translate } from '../../../common/services/i18n'

class FormLocationMap extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    input: PropTypes.object.isRequired,
  }

  onChange(position) {
    this.props.input.onChange(this.currentValue(position))
  }

  onBlur() {
    this.props.input.onBlur(this.currentValue())
  }

  onFocus() {
    this.props.input.onFocus(this.currentValue())
  }

  onMapClick(event) {
    const { latitude, longitude } = event

    this.onChange(
      {
        latitude,
        longitude,
      },
    )

    this.setState({
      position: {
        latitude,
        longitude,
      },
    })
  }

  onZoom(event) {
    this.props.input.onChange(this.currentValue({ zoom: event.target._zoom }))
    this.setState({
      zoom: event.target._zoom,
    })
  }

  renderGpsSelector() {
    const { latitude, longitude } = this.state.position
    const zoom = this.state.zoom
    return (
      <div className="location-selector__view">
        <div className="location-selector__panel">
          <div className="form__field">

            <input
              className="form__field-input"
              disabled={this.props.disabled}
              name="defaultLatitude"
              readOnly={true}
              type="text"
              value={this.state.position.latitude}
            />

            <input
              className="form__field-input"
              disabled={this.props.disabled}
              name="defaultLongitude"
              readOnly={true}
              type="text"
              value={this.state.position.longitude}
            />

            <input
              className="form__field-input"
              disabled={this.props.disabled}
              name="defaultZoom"
              readOnly={true}
              type="text"
              value={this.state.zoom}
            />

            <small>{ translate('components.locationSelector.clickMap') }</small>
          </div>
        </div>

        <LocationMap
          defaultZoom={zoom}
          initialCenter={ { lat: latitude, lng: longitude } }
          onClick={this.onMapClick}
          onZoom={this.onZoom}
        />
      </div>
    )
  }

  render() {
    return (
      <div className="location-selector">
        {this.renderGpsSelector()}
      </div>
    )
  }

  currentValue(newValues = {}) {
    return Object.assign({}, this.props.input.value, {
      ...newValues,
    })
  }

  constructor(props) {
    super(props)

    const { latitude, longitude, zoom } = props.input.value

    this.state = {
      position: {
        latitude: latitude,
        longitude: longitude,
      },
      zoom: zoom,
    }

    this.onBlur = this.onBlur.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onMapClick = this.onMapClick.bind(this)
    this.onZoom = this.onZoom.bind(this)
  }
}

export default asFormField(FormLocationMap)
