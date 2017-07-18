import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import {
  FormCheckbox,
  FormInput,
  FormLocationSelector,
  FormSlotEditor,
  FormTextarea,
} from '../components'
import { translate } from '../services/i18n'

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = translate('forms.place.errors.titleRequired')
  }
  if (!values.description) {
    errors.description = translate('forms.place.errors.descriptionRequired')
  }
  if (values.location) {
    if (values.location.mode === 'gps') {
      if (!values.location.latitude || !values.location.longitude) {
        errors.location = translate('forms.place.errors.gpsCoordinatesRequired')
      }
    } else if (values.location.mode === 'address') {
      if (!values.location.city) {
        errors.location = translate('forms.place.errors.cityRequired')
      } else if (!values.location.cityCode) {
        errors.location = translate('forms.place.errors.cityCodeRequired')
      } else if (!values.location.street) {
        errors.location = translate('forms.place.errors.streetRequired')
      } else if (!values.location.country) {
        errors.location = translate('forms.place.errors.countryRequired')
      }
    }
  }
  if (!values.slotSize) {
    errors.slotSize = translate('forms.place.errors.slotSizeRequired')
  } else if (!/\d\d:\d\d:\d\d/i.test(values.slotSize)) {
    errors.slotSize = translate('forms.place.errors.slotSizeWrongFormat')
  } else {
    const slotSizeValues = values.slotSize.split(':').map(val => parseInt(val, 10))
    console.log(slotSizeValues)
    if (slotSizeValues[0] > 24) {
      errors.slotSize = translate('forms.place.errors.slotSizeWrongFormat')
    } else if (slotSizeValues[1] > 59) {
      errors.slotSize = translate('forms.place.errors.slotSizeWrongFormat')
    } else if (slotSizeValues[2] > 59) {
      errors.slotSize = translate('forms.place.errors.slotSizeWrongFormat')
    } else if (slotSizeValues[0] === 24 && (slotSizeValues[1] > 0 || slotSizeValues[2] > 0)) {
      errors.slotSize = translate('forms.place.errors.slotSizeMaximum')
    } else if (slotSizeValues[0] === 0 && slotSizeValues[1] === 0 && slotSizeValues[2] === 0) {
      errors.slotSize = translate('forms.place.errors.slotSizeMinimum')
    }
  }

  return errors
}

class PlaceForm extends Component {
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
        <h2>Basic information</h2>
        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label="Title"
          name="title"
          type="text"
        />
        <Field
          component={FormTextarea}
          disabled={this.props.isLoading}
          label="Description"
          name="description"
          type="text"
        />
        <hr />
        <h2>Where?</h2>
        <Field
          component={FormLocationSelector}
          disabled={this.props.isLoading}
          label={translate('components.locationSelector.selectAMode')}
          name="location"
        />
        <hr />
        <h2>Public or private?</h2>
        <Field
          component={FormCheckbox}
          disabled={this.props.isLoading}
          inline={true}
          label="Are events in this place visible in the calendar?"
          name="isPublic"
        />
        <hr />
        <h2>Slots</h2>
        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label="Slot-size (hh:mm:ss)"
          name="slotSize"
          type="text"
        />
        <p>{ translate('forms.place.slotSizeNote') }</p>
        <Field
          component={FormSlotEditor}
          disabled={this.props.isLoading}
          label="Blocked slots"
          name="blockedSlots"
        />
        <hr />
        <button
          className="form__submit button button--blue"
          disabled={this.props.isLoading}
          type="submit"
        >
          { translate('forms.place.submit') }
        </button>
      </form>
    )
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: 'place',
  validate,
})(PlaceForm)
