import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { FormInput } from '../components'

import { translate } from '../../../common/services/i18n'

const validate = values => {
  const errors = {}
  if (!values.password) {
    errors.password = translate('forms.auth.errors.passwordRequired')
  }
  if (!values.newPassword) {
    errors.newPassword = translate('forms.auth.errors.passwordRequired')
  } else if (values.newPassword.length < 8) {
    errors.password = translate(
      'forms.auth.errors.passwordLength', {
        len: 8,
      }
    )
  }
  if (!values.newPasswordRepeat) {
    errors.newPasswordRepeat = translate('forms.auth.errors.passwordRepeat')
  }
  if (values.newPasswordRepeat !== values.newPassword) {
    errors.newPasswordRepeat = translate('forms.auth.errors.passwordMatch')
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
        <h2>{ translate('forms.auth.changePassword') }</h2>
        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.auth.password')}
          name="password"
          type="password"
        />
        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.auth.newPassword')}
          name="newPassword"
          type="password"
        />
        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.auth.newPasswordRepeat')}
          name="newPasswordRepeat"
          type="password"
        />
        <hr />

        <button
          className="form__submit button button--blue"
          disabled={this.props.isLoading}
          type="submit"
        >
          { translate('forms.auth.changePasswordButton') }
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'profile',
  validate,
})(ProfileForm)
