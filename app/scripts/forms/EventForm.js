import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import {
  FormCheckbox,
  FormInput,
  FormPlaceSlotSelector,
  FormTextarea,
} from '../components'
import { translate } from '../services/i18n'

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = translate('forms.event.errors.titleRequired')
  } else if (values.title.length < 3) {
    errors.title = translate(
      'forms.common.errors.minLength', { len: 3 }
    )
  }

  if (!values.description) {
    errors.description = translate('forms.event.errors.descriptionRequired')
  } else if (values.description.length < 20) {
    errors.description = translate(
      'forms.common.errors.minLength', { len: 20 }
    )
  }

  return errors
}

class EventForm extends Component {
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
          label={translate('forms.event.title')}
          name="title"
          type="text"
        />
        <Field
          component={FormTextarea}
          disabled={this.props.isLoading}
          label={translate('forms.event.description')}
          name="description"
          type="text"
        />
        <hr />
        <h2>{ translate('forms.event.whereAndWhen') }</h2>
        <Field
          component={FormPlaceSlotSelector}
          disabled={this.props.isLoading}
          name="placeSlots"
        />
        <hr />
        <h2>{ translate('forms.event.publicOrPrivate') }</h2>
        <Field
          component={FormCheckbox}
          disabled={this.props.isLoading}
          inline={true}
          label={translate('forms.event.areEventsPublic')}
          name="isPublic"
        />
        <hr />
        <button
          className="form__submit button button--blue"
          disabled={this.props.isLoading}
          type="submit"
        >
          { translate('forms.event.submit') }
        </button>
      </form>
    )
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: 'event',
  validate,
})(EventForm)
