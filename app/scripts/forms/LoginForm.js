import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { FormField } from '../components'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Please enter your email address'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Please enter your password'
  }
  return errors
}

class LoginForm extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    errorMessage: undefined,
    isLoading: false,
  }

  renderErrorMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="form__error">
          { this.props.errorMessage }
        </div>
      )
    }
    return null
  }

  render() {
    return (
      <form className="form" onSubmit={this.props.handleSubmit}>
        { this.renderErrorMessage() }
        <Field
          component={FormField}
          disabled={this.props.isLoading}
          label="Email-Address"
          name="email"
          type="email"
        />
        <Field
          component={FormField}
          disabled={this.props.isLoading}
          label="Password"
          name="password"
          type="password"
        />
        <button
          className="form__submit button button--blue"
          disabled={this.props.isLoading}
          type="submit"
        >
          Login
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'login',
  validate,
})(LoginForm)
