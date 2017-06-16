import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { FormField, FormCheckbox } from './'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!values.firstname) {
    errors.firstname = 'Required'
  }
  if (!values.lastname) {
    errors.lastname = 'Required'
  }
  if (!values.street) {
    errors.street = 'Required'
  }
  if (!values.city) {
    errors.city = 'Required'
  }
  if (!values.cityCode) {
    errors.cityCode = 'Required'
  }
  if (!values.country) {
    errors.country = 'Required'
  }
  return errors
}

class UserForm extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    showPasswordField: PropTypes.bool,
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

  renderPasswordField() {
    if (!this.props.showPasswordField) {
      return null
    }

    return (
      <Field
        component={FormField}
        disabled={this.props.isLoading}
        label="Password (plaintext)"
        name="password"
        type="text"
      />
    )
  }

  render() {
    return (
      <form className="form" onSubmit={this.props.handleSubmit}>
        { this.renderErrorMessage() }
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
        <hr />
        <Field
          component={FormField}
          disabled={this.props.isLoading}
          label="E-Mail-Address"
          name="email"
          type="email"
        />
        { this.renderPasswordField() }
        <hr />
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
        <Field
          component={FormCheckbox}
          disabled={this.props.isLoading}
          label="Administrator"
          name="isAdmin"
        />
        <Field
          component={FormCheckbox}
          disabled={this.props.isLoading}
          label="Participates at festival"
          name="isParticipant"
        />
        <hr />
        <Field
          component={FormCheckbox}
          disabled={this.props.isLoading}
          label="Account is enabled (Payment accepted)"
          name="isActive"
        />
        <hr />
        <button
          className="form__submit button button--blue"
          disabled={this.props.isLoading}
          type="submit"
        >
          Save
        </button>
      </form>
    )
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: 'user',
  validate,
})(UserForm)
