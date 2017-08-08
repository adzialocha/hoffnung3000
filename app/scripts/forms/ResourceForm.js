import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { FormInput, FormImageUploader } from '../components'
import { translate } from '../../../common/services/i18n'

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = translate('forms.resource.errors.titleRequired')
  } else if (values.title.length < 3) {
    errors.title = translate(
      'forms.common.errors.minLength', { len: 3 }
    )
  }

  if (!values.description) {
    errors.description = translate('forms.resource.errors.descriptionRequired')
  } else if (values.description.length < 10) {
    errors.description = translate(
      'forms.common.errors.minLength', { len: 10 }
    )
  } else if (values.description.length > 120) {
    errors.description = translate(
      'forms.common.errors.maxLength', { len: 120 }
    )
  }

  return errors
}

class ResourceForm extends Component {
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
          label={translate('forms.resource.title')}
          name="title"
          type="text"
        />
        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.resource.description')}
          name="description"
          type="text"
        />
        <hr />
        <h2>{ translate('forms.common.uploadImages') }</h2>
        <Field
          component={FormImageUploader}
          disabled={this.props.isLoading}
          maxImagesCount={1}
          name="images"
        />
        <hr />
        <button
          className="form__submit button button--blue"
          disabled={this.props.isLoading}
          type="submit"
        >
          { translate('forms.resource.submit') }
        </button>
      </form>
    )
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: 'resource',
  validate,
})(ResourceForm)
