import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { FormInput } from '../components'

import { translate } from '../../../common/services/i18n'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = translate('forms.auth.errors.mailRequired')
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,16}$/i.test(values.email)) {
    errors.email = translate('forms.auth.errors.invalidMail')
  }
  if (!values.password) {
    errors.password = translate('forms.auth.errors.passwordRequired')
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
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.auth.email')}
          name="email"
          type="email"
        />
        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.auth.password')}
          name="password"
          type="password"
        />
        <button
          className="form__submit button button--blue"
          disabled={this.props.isLoading}
          type="submit"
        >
          { translate('forms.auth.loginButton') }
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'login',
  validate,
})(LoginForm)
