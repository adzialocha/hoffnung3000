import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { RegistrationWizard, StaticPage } from '../components'
import { translate } from '../services/i18n'
import { updateMetaInformation } from '../actions/meta'

class Register extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isRegistrationFull: PropTypes.bool.isRequired,
    updateMetaInformation: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.updateMetaInformation()
  }

  renderRegisterContent() {
    if (this.props.isLoading) {
      return <p>{ translate('common.loading') }</p>
    }

    if (this.props.isRegistrationFull) {
      return <StaticPage slug="registration-full" />
    }

    return <RegistrationWizard />
  }

  render() {
    return (
      <section>
        { this.renderRegisterContent() }
      </section>
    )
  }
}

function mapStateToProps(state) {
  const { isRegistrationFull, isLoading } = state.meta

  return {
    isLoading,
    isRegistrationFull,
  }
}

export default connect(
  mapStateToProps, {
    updateMetaInformation,
  }
)(Register)
