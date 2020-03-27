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

  componentWillMount() {
    this.props.updateMetaInformation(true)
  }

  onSave() {
    const defaultTags = this.props.form.values.defaultTags
    if (!Array.isArray(defaultTags)) {
      this.props.form.values.defaultTags = defaultTags.replace(/\s+/g, '').split(',')
    }
    const values = this.props.form.values
    const { defaultGPS } = values
    const { latitude, longitude, zoom } = defaultGPS
    values.defaultLatitude = latitude
    values.defaultLongitude = longitude
    values.defaultZoom = zoom
    this.props.saveConfiguration(this.props.form.values)
  }

  render() {
    const config = this.props.config
    const defaultGPS = {
      latitude: config.defaultLatitude,
      longitude: config.defaultLongitude,
      zoom: config.defaultZoom,
    }
    config.defaultGPS = defaultGPS

    return (
      <AdminConfigForm
        errorMessage={this.props.errorMessage}
        initialValues={ { ...config } }
        isLoading={this.props.isLoading}
        onSubmit={this.onSave}
      />
    )
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
