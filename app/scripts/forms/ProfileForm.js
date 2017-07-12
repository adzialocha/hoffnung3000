import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { FormField } from '../components'

const validate = values => {
  const errors = {}
  if (!values.password) {
    errors.password = 'Please enter your current password'
  }
  if (!values.newPassword) {
    errors.newPassword = 'Please enter your password'
  } else if (values.newPassword.length < 8) {
    errors.newPassword = 'Must be 8 characters or more'
  }
  if (!values.newPasswordRepeat) {
    errors.newPasswordRepeat = 'Please repeat your password'
  }
  if (values.newPasswordRepeat !== values.newPassword) {
    errors.newPasswordRepeat = 'The given passwords do not match'
  }
  return errors
}

class ProfileForm extends Component {
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
        <h2>Change your password</h2>
        <Field
          component={FormField}
          disabled={this.props.isLoading}
          label="Your current password"
          name="password"
          type="password"
        />
        <Field
          component={FormField}
          disabled={this.props.isLoading}
          label="New Password"
          name="newPassword"
          type="password"
        />
        <Field
          component={FormField}
          disabled={this.props.isLoading}
          label="Repeat new password"
          name="newPasswordRepeat"
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
  form: 'profile',
  validate,
})(ProfileForm)
