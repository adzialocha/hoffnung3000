import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateMetaInformation } from '../actions/meta'

/**
 * Assures the config is fetched from server and ready to be used by a wrapped
 * component. Hides the component or shows a warning when configuration was
 * required but not found or set.
 */
export default function withConfig(...args) {
  let field
  let isRequired = false
  let WrappedComponent

  if (args.length === 2 && typeof args[0] === 'string') {
    // Ask for a certain config, hide component when not set
    field = args[0]
    WrappedComponent = args[1]
  } else if (
    args.length === 3 &&
    typeof args[0] === 'string' &&
    typeof args[1] === 'boolean'
  ) {
    // Ask for a certain config and show a warning when not set
    field = args[0]
    isRequired = args[1]
    WrappedComponent = args[2]
  } else {
    // Just load the config object
    WrappedComponent = args[0]
  }

  class ConfigContainer extends Component {
    static propTypes = {
      config: PropTypes.object.isRequired,
      isLoading: PropTypes.bool.isRequired,
      isReady: PropTypes.bool.isRequired,
      updateMetaInformation: PropTypes.func.isRequired,
    }

    componentWillMount() {
      // Fetch configuration from server when not given yet
      if (!this.props.isReady && !this.props.isLoading) {
        this.props.updateMetaInformation()
      }
    }

    render() {
      if (!this.props.isReady) {
        return null
      }

      if (field && !(field in this.props.config)) {
        if (isRequired) {
          return <p>Warning! <em>{ field }</em> is not set. Please check your configuration.</p>
        }

        // Do not render component when config field was not set
        return null
      }

      return <WrappedComponent config={this.props.config} {...this.props} />
    }
  }

  function mapStateToProps(state) {
    const { config, isLoading, isReady } = state.meta

    return {
      config,
      isLoading,
      isReady,
    }
  }

  return connect(mapStateToProps, { updateMetaInformation })(props => {
    return <ConfigContainer {...props} />
  })
}
