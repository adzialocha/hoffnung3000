import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { FormInput, FormCheckbox } from '../components'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!values.username) {
    errors.username = 'Required'
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
        component={FormInput}
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
          component={FormInput}
          disabled={this.props.isLoading}
          label="Username"
          name="username"
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label="E-Mail-Address"
          name="email"
          type="email"
        />

        { this.renderPasswordField() }

        <hr />

        <Field
          component={FormCheckbox}
          disabled={this.props.isLoading}
          inline={true}
          label="Administrator"
          name="isAdmin"
        />

        <Field
          component={FormCheckbox}
          disabled={this.props.isLoading}
          inline={true}
          label="Participates at festival"
          name="isParticipant"
        />

        <Field
          component={FormCheckbox}
          disabled={this.props.isLoading}
          inline={true}
          label="Visitor"
          name="isVisitor"
        />

        <hr />

        <Field
          component={FormCheckbox}
          disabled={this.props.isLoading}
          inline={true}
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
