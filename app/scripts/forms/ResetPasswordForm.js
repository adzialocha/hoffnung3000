import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { FormField } from '../components'

const validate = values => {
  const errors = {}
  if (!values.password) {
    errors.password = 'Please enter your password'
  } else if (values.password.length < 8) {
    errors.password = 'Must be 8 characters or more'
  }
  if (!values.passwordRepeat) {
    errors.passwordRepeat = 'Please repeat your password'
  }
  if (values.passwordRepeat !== values.password) {
    errors.passwordRepeat = 'The given passwords do not match'
  }
  return errors
}

class ResetPasswordForm extends Component {
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
          label="New Password"
          name="password"
          type="password"
        />
        <Field
          component={FormField}
          disabled={this.props.isLoading}
          label="Repeat new password"
          name="passwordRepeat"
          type="password"
        />
        <hr />

        <button
          className="form__submit button button--blue"
          disabled={this.props.isLoading}
          type="submit"
        >
          Update
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'resetPassword',
  validate,
})(ResetPasswordForm)
