import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { FormField, FormCheckbox } from './'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }
  return errors
}

class UserForm extends Component {
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
          label="E-Mail-Address"
          name="email"
          type="email"
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
        <button
          className="form__submit"
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
