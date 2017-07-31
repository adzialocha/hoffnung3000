import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { FormInput, FormTextarea } from '../components'
import { translate } from '../services/i18n'

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = translate('forms.message.errors.titleRequired')
  } else if (values.title.length < 3) {
    errors.title = translate('forms.common.errors.minLength', { len: 3 })
  }

  if (!values.text || values.length === 0) {
    errors.text = translate('forms.message.errors.textRequired')
  }

  return errors
}

class MessageForm extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isWithTitle: PropTypes.bool,
  }

  static defaultProps = {
    errorMessage: undefined,
    isLoading: false,
    isWithTitle: true,
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

  renderTitleField() {
    if (!this.props.isWithTitle) {
      return null
    }

    return (
      <Field
        component={FormInput}
        disabled={this.props.isLoading}
        label={translate('forms.message.title')}
        name="title"
        type="text"
      />
    )
  }

  render() {
    return (
      <form className="form" onSubmit={this.props.handleSubmit}>
        { this.renderErrorMessage() }
        <h2>{ translate('forms.message.formTitle') }</h2>
        { this.renderTitleField() }
        <Field
          component={FormTextarea}
          disabled={this.props.isLoading}
          label={translate('forms.message.text')}
          name="text"
        />
        <hr />
        <button
          className="form__submit button button--blue"
          disabled={this.props.isLoading}
          type="submit"
        >
          { translate('forms.message.submit') }
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'message',
  validate,
})(MessageForm)
