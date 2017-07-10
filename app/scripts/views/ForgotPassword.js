import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { ForgotPasswordForm } from '../forms'
import { requestPasswordToken } from '../actions/auth'

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
        <h1>Reset your password</h1>
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
