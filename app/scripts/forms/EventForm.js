import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import {
  FormCheckbox,
  FormImageUploader,
  FormInput,
  FormPlaceSlotSelector,
  FormResourceSelector,
  FormTextarea,
} from '../components'

import { translate } from '../../../common/services/i18n'

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

  if (values.placeSlots) {
    if (!values.placeSlots.place) {
      errors.placeSlots = translate('forms.event.errors.selectPlace')
    } else if (values.placeSlots.selectedSlotsIndexes.length === 0) {
      errors.placeSlots = translate('forms.event.errors.selectTime')
    }
  } else {
    errors.placeSlots = translate('forms.event.errors.selectPlaceAndTime')
  }

  return errors
}

class EventForm extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    eventId: PropTypes.number,
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    placeSlots: PropTypes.object,
  }

  static defaultProps = {
    errorMessage: undefined,
    eventId: undefined,
    isLoading: false,
    placeSlots: {},
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

  renderPrivateField() {
    const { place } = this.props.placeSlots

    if (place && !place.isPublic) {
      return <p>{ translate('forms.event.placeIsPrivate') }</p>
    }

    return (
      <Field
        component={FormCheckbox}
        disabled={this.props.isLoading || (place && !place.isPublic)}
        inline={true}
        label={translate('forms.event.areEventsPublic')}
        name="isPublic"
      />
    )
  }

  renderResourcesSelector() {
    const { place, selectedSlotsIndexes } = this.props.placeSlots

    if (!place || !place.id || selectedSlotsIndexes.length === 0) {
      return <p>{ translate('forms.event.selectPlaceAndSlotsFirst') }</p>
    }

    const { eventFromStr, eventToStr } = this.props.placeSlots

    return (
      <Field
        component={FormResourceSelector}
        disabled={this.props.isLoading}
        eventId={this.props.eventId}
        from={eventFromStr}
        name="resources"
        to={eventToStr}
      />
    )
  }

  render() {
    return (
      <form className="form" onSubmit={this.props.handleSubmit}>
        { this.renderErrorMessage() }
        <h2>{ translate('forms.event.what') }</h2>
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
        <h2>{ translate('forms.common.uploadImages') }</h2>
        <Field
          component={FormImageUploader}
          disabled={this.props.isLoading}
          name="images"
        />
        <hr />
        <Field
          component={FormPlaceSlotSelector}
          disabled={this.props.isLoading}
          name="placeSlots"
        />
        <hr />
        <h2>{ translate('forms.event.publicOrPrivate') }</h2>
        { this.renderPrivateField() }
        <hr />
        <h2>{ translate('forms.event.pickResources') }</h2>
        { this.renderResourcesSelector() }
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

const SelectingEventForm = reduxForm({
  enableReinitialize: true,
  form: 'event',
  validate,
})(EventForm)

const selector = formValueSelector('event')

export default connect(state => {
  return {
    placeSlots: selector(state, 'placeSlots'),
  }
})(SelectingEventForm)
