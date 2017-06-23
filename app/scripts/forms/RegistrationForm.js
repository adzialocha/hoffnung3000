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
  if (!values.firstname) {
    errors.firstname = 'Please enter your first name'
  }
  if (!values.lastname) {
    errors.lastname = 'Please enter your last name'
  }
  if (!values.phone) {
    errors.phone = 'Please enter your mobile number'
  }
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
  if (!values.street) {
    errors.street = 'Please enter your street and number'
  }
  if (!values.cityCode) {
    errors.cityCode = 'Please enter your city code'
  }
  if (!values.city) {
    errors.city = 'Please enter your city'
  }
  if (!values.country) {
    errors.country = 'Please enter your country'
  }
  return errors
}

class RegistrationForm extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    errorMessage: undefined,
    isLoading: false,
    showPasswordField: false,
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
        <h2>Basic Information</h2>
        <Field
          component={FormField}
          disabled={this.props.isLoading}
          label="Firstname"
          name="firstname"
          type="text"
        />
        <Field
          component={FormField}
          disabled={this.props.isLoading}
          label="Lastname"
          name="lastname"
          type="text"
        />
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
          label="Your phone number"
          name="phone"
          type="text"
        />
        <small>We need your mobile number only in case we need to reach you during the festival.</small>
        <hr />

        <h2>Your Password</h2>
        <Field
          component={FormField}
          disabled={this.props.isLoading}
          label="Password"
          name="password"
          type="password"
        />
        <Field
          component={FormField}
          disabled={this.props.isLoading}
          label="Repeat password"
          name="passwordRepeat"
          type="password"
        />
        <hr />

        <h2>Your Address</h2>
        <Field
          component={FormField}
          disabled={this.props.isLoading}
          label="Street and number"
          name="street"
          type="text"
        />
        <Field
          component={FormField}
          disabled={this.props.isLoading}
          label="City code"
          name="cityCode"
          type="text"
        />
        <Field
          component={FormField}
          disabled={this.props.isLoading}
          label="City"
          name="city"
          type="text"
        />
        <Field
          component={FormField}
          disabled={this.props.isLoading}
          label="Country"
          name="country"
          type="text"
        />
        <hr />

        <button
          className="form__submit button button--blue"
          disabled={this.props.isLoading}
          type="submit"
        >
          Next Step
        </button>
      </form>
    )
  }
}

export default reduxForm({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: 'registration',
  validate,
})(RegistrationForm)
