import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateMetaInformation } from '../actions/meta'

export default function withConfig(...args) {
  let field
  let WrappedComponent

  if (args.length === 2 && typeof args[0] === 'string') {
    field = args[0]
    WrappedComponent = args[1]
  } else {
    WrappedComponent = args[0]
  }

  class ConfigContainer extends Component {
    static propTypes = {
      config: PropTypes.object.isRequired,
      isReady: PropTypes.bool.isRequired,
      updateMetaInformation: PropTypes.func.isRequired,
    }

    componentWillMount() {
      // Fetch configuration from server when not given yet
      if (!this.props.isReady) {
        this.props.updateMetaInformation()
      }
    }

    render() {
      if (!this.props.isReady) {
        return null
      }

      // Do not render component when config field was not set
      if (field && !(field in this.props.config)) {
        return null
      }

      return <WrappedComponent config={this.props.config} />
    }
  }

  function mapStateToProps(state) {
    const { config, isReady } = state.meta

    return {
      config,
      isReady,
    }
  }

  return connect(mapStateToProps, { updateMetaInformation })(props => {
    return <ConfigContainer {...props} />
  })
}
