import PropTypes from 'prop-types'
import React, { Component } from 'react'

class AdminConfigField extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    disabled: PropTypes.boolean.isRequired,
    saveConfiguration: PropTypes.func.isRequired,
    updateMetaInformation: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.updateMetaInformation()
  }

  onSave(key, value) {
    this.props.onSave(key, value)
  }

  render() {
    return Object.keys(this.props.config).map(configKey => {
      return (
        <AdminConfigField
          disabled={this.props.isLoading}
          key={configKey}
          name={configKey}
          value={this.props.config[configKey]}
          onSave={this.onSave}
        />
      )
    })
  }

  constructor(props) {
    super(props)

    this.onSave = this.onSave.bind(this)
  }
}

export default AdminConfigField
