import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ForgotPasswordForm } from '../forms'
import { requestPasswordToken } from '../actions/auth'
import { translate } from '../../../common/services/i18n'

class ForgotPassword extends Component {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    requestPasswordToken: PropTypes.func.isRequired,
  }

  onSubmit(values) {
    this.props.requestPasswordToken(values.email)
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.forgotPassword.title') }</h1>
        <ForgotPasswordForm
          errorMessage={this.props.errorMessage}
          isLoading={this.props.isLoading}
          onSubmit={this.onSubmit}
        />
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }
}

function mapStateToProps(state) {
  const { errorMessage, isLoading } = state.auth
  return {
    errorMessage,
    isLoading,
  }
}

export default connect(
  mapStateToProps, {
    requestPasswordToken,
  }
)(ForgotPassword)
