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

  if (!values.firstname) {
    errors.firstname = translate('forms.auth.errors.firstnameRequired')
  }

  if (!values.lastname) {
    errors.lastname = translate('forms.auth.errors.lastnameRequired')
  }

  if (!values.password) {
    errors.password = translate('forms.auth.errors.passwordRequired')
  } else if (values.password.length < 8) {
    errors.password = translate(
      'forms.auth.errors.passwordLength', {
        len: 8,
      }
    )
  }

  if (!values.passwordRepeat) {
    errors.passwordRepeat = translate('forms.auth.errors.passwordRepeat')
  }

  if (values.passwordRepeat !== values.password) {
    errors.passwordRepeat = translate('forms.auth.errors.passwordMatch')
  }

  if (!values.phone) {
    errors.phone = translate('forms.auth.errors.phoneRequired')
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

        <h2>{ translate('forms.common.basicInformation') }</h2>

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.auth.firstname')}
          name="firstname"
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.auth.lastname')}
          name="lastname"
          type="text"
        />

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
          label={translate('forms.auth.phone')}
          name="phone"
          type="text"
        />

        <small>{ translate('forms.auth.whyPhone') }</small>

        <hr />

        <h2>{ translate('forms.auth.yourPassword') }</h2>

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
          label={translate('forms.auth.passwordRepeat')}
          name="passwordRepeat"
          type="password"
        />

        <hr />

        <button
          className="form__submit button button--blue"
          disabled={this.props.isLoading}
          type="submit"
        >
          { translate('forms.auth.nextStepButton') }
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
