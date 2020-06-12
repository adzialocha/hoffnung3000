import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AdminConfigForm } from '../forms'
import { saveConfiguration, updateMetaInformation } from '../actions/meta'

class AdminConfigPanel extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    errorMessage: PropTypes.string.isRequired,
    form: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    saveConfiguration: PropTypes.func.isRequired,
    updateMetaInformation: PropTypes.func.isRequired,
  }

  static defaultProps = {
    form: {},
  }

  onSave() {
    // Create an updated / new config
    const newConfig = Object.assign({}, this.props.form.values)
    const oldConfig = this.props.config

    const { defaultTags, defaultGPS } = this.props.form.values

    // Prepare new default tags
    if (!Array.isArray(defaultTags) && defaultTags) {
      newConfig.defaultTags = defaultTags.replace(/\s+/g, '').split(',')
    } else {
      newConfig.defaultTags = defaultTags || []
    }

    // Prepare new default GPS position
    if (defaultGPS) {
      const { latitude, longitude, zoom } = defaultGPS

      newConfig.defaultLatitude = latitude || oldConfig.defaultLatitude
      newConfig.defaultLongitude = longitude || oldConfig.defaultLongitude
      newConfig.defaultZoom = zoom || oldConfig.defaultZoom
    }

    // Fill in fields from older config, when not set and store it!
    const config = Object.assign({}, this.props.config, newConfig)

    // Remove unused fields
    delete config.defaultGPS
    delete config.isTransferEnabled
    delete config.isPayPalEnabled
    delete config.app

    this.props.saveConfiguration(config)
  }

  render() {
    const config = Object.assign({}, this.props.config)

    // Convert GPS position to form format
    const defaultGPS = {
      latitude: config.defaultLatitude,
      longitude: config.defaultLongitude,
      zoom: config.defaultZoom,
    }

    config.defaultGPS = defaultGPS

    delete config.defaultLatitude
    delete config.defaultLongitude
    delete config.zoom

    return (
      <AdminConfigForm
        errorMessage={this.props.errorMessage}
        initialValues={ { ...config } }
        isLoading={this.props.isLoading}
        onSubmit={this.onSave}
      />
    )
  }

  // @TODO: Update to modern React API
  /* eslint-disable-next-line camelcase */
  UNSAFE_componentWillMount() {
    this.props.updateMetaInformation(true)
  }

  constructor(props) {
    super(props)

    this.onSave = this.onSave.bind(this)
  }
}

function mapStateToProps(state) {
  const { config, isLoading, errorMessage } = state.meta

  return {
    config,
    errorMessage,
    form: state.form.config,
    isLoading,
  }
}

export default connect(
  mapStateToProps, {
    saveConfiguration,
    updateMetaInformation,
  }
)(AdminConfigPanel)
