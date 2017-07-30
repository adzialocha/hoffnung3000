import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { resetPassword } from '../actions/auth'
import { ResetPasswordForm } from '../forms'
import { translate } from '../services/i18n'

class ResetPassword extends Component {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    resetPassword: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
  }

  onSubmit(values) {
    this.props.resetPassword(values.password, this.props.token)
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.forgotPassword.title') }</h1>
        <ResetPasswordForm
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

function mapStateToProps(state, ownProps) {
  const { errorMessage, isLoading } = state.auth
  return {
    errorMessage,
    isLoading,
    token: ownProps.match.params.token,
  }
}

export default connect(
  mapStateToProps, {
    resetPassword,
  }
)(ResetPassword)
