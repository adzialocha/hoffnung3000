import PropTypes from 'prop-types'
import React, { Fragment, Component } from 'react'
import { DateTime } from 'luxon'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import {
  FormCheckbox,
  FormImageUploader,
  FormInput,
  FormPlaceSlotSelector,
  FormResourceSelector,
  FormTagSelector,
  FormTextarea,
} from '../components'

import {
  generateNewSlotItems,
  getSlotWithIndex,
} from '../../../common/utils/slots'

import { translate } from '../../../common/services/i18n'
import { withConfig } from '../containers'

const validate = values => {
  const errors = {}

  function isValidURL(string) {
    const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
    return (res !== null)
  }

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

  if (values.tags) {
    if (values.tags.length === 0) {
      errors.tags = translate('forms.event.errors.setTags')
    }
  }

  if (values.ticketUrl && values.ticketUrl !== 'https://') {
    if (!isValidURL(values.ticketUrl)) {
      errors.ticketUrl = translate(
        'forms.event.errors.validUrl'
      )
    }
  }

  if (values.websiteUrl && values.websiteUrl !== 'https://') {
    if (!isValidURL(values.websiteUrl)) {
      errors.websiteUrl = translate(
        'forms.event.errors.validUrl'
      )
    }
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
    config: PropTypes.object.isRequired,
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

  renderResourcesTitle() {
    if (!this.props.config.isDerMarktEnabled) {
      return null
    }

    return (
      <Fragment>
        <hr />
        <h2>{ translate('forms.event.pickResources') }</h2>
      </Fragment>
    )
  }

  renderResourcesSelector() {
    if (!this.props.config.isDerMarktEnabled) {
      return null
    }

    const { place, selectedSlotsIndexes } = this.props.placeSlots

    if (!place || !place.id || selectedSlotsIndexes.length === 0) {
      return <p>{ translate('forms.event.selectPlaceAndSlotsFirst') }</p>
    }

    const { eventFromStr, eventToStr } = this.generateIsoEventTimeframe(selectedSlotsIndexes)

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

  renderFormTagSelector() {
    const defaultTags = this.props.config.defaultTags.map(tag =>{
      return { label: tag, value: tag }
    })

    return (
      <Field
        component={FormTagSelector}
        defaultTags={defaultTags}
        disabled={this.props.isLoading}
        multi={true}
        name="tags"
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
          placeholder={translate('forms.event.textFieldPlaceholder')}
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.event.websiteUrl')}
          name="websiteUrl"
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.event.ticketUrl')}
          name="ticketUrl"
          type="text"
        />

        <Field
          component={FormTextarea}
          disabled={this.props.isLoading}
          label={translate('forms.event.additionalInfo')}
          name="additionalInfo"
          placeholder={translate('forms.event.textFieldPlaceholder')}
          type="text"
        />

        <h2>{translate('forms.event.tags')}</h2>

        { this.renderFormTagSelector() }

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

        { this.renderResourcesTitle() }
        { this.renderResourcesSelector() }

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

  generateSlots() {
    const { place, selectedSlotsIndexes } = this.props.placeSlots

    return generateNewSlotItems(
      place.slotSize,
      selectedSlotsIndexes,
      this.props.config.festivalDateStart,
      this.props.config.festivalDateEnd
    )
  }

  generateIsoEventTimeframe(slotIndexes) {
    if (slotIndexes.length === 0) {
      return {
        eventFromStr: undefined,
        eventToStr: undefined,
      }
    }

    const slots = this.generateSlots()
    const firstSlot = getSlotWithIndex(slots, slotIndexes[0])
    const lastSlot = getSlotWithIndex(
      slots, slotIndexes[slotIndexes.length - 1]
    )

    return {
      eventFromStr: DateTime.fromISO(firstSlot.from, { zone: 'utc' }).toISO(),
      eventToStr: DateTime.fromISO(lastSlot.to, { zone: 'utc' }).toISO(),
    }
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
})(withConfig(SelectingEventForm))
