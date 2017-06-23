import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { login } from '../actions/auth'
import { LoginForm } from '../forms'

class Login extends Component {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
  }

  onSubmit(values) {
    this.props.login(values.email, values.password)
  }

  render() {
    return (
      <section>
        <h1>Login</h1>
        <LoginForm
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
    login,
  }
)(Login)
