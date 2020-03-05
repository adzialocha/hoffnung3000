import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { checkSlotSize } from '../../../common/utils/slots'
import {
  FormCheckbox,
  FormImageUploader,
  FormInput,
  FormLocationSelector,
  FormSlotSizeEditor,
  FormTextarea,
} from '../components'
import { translate } from '../../../common/services/i18n'

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = translate('forms.place.errors.titleRequired')
  } else if (values.title.length < 3) {
    errors.title = translate(
      'forms.place.errors.titleMinLength', { len: 3 }
    )
  }

  if (!values.description) {
    errors.description = translate('forms.place.errors.descriptionRequired')
  } else if (values.description.length < 20) {
    errors.description = translate(
      'forms.place.errors.descriptionMinLength', { len: 20 }
    )
  }

  if (!values.accessibilityInfo) {
    errors.accessibilityInfo = translate('forms.place.errors.accessibilityInfoRequired')
  }

  if (!values.capacity) {
    errors.capacity = translate('forms.place.errors.capacityRequired')
  }

  if (values.location) {
    if (values.location.mode === 'gps') {
      if (!values.location.latitude || !values.location.longitude) {
        errors.location = translate('forms.place.errors.gpsCoordinatesRequired')
      }
    } else if (values.location.mode === 'address') {
      if (!values.location.street) {
        errors.location = translate('forms.place.errors.streetRequired')
      } else if (!values.location.cityCode) {
        errors.location = translate('forms.place.errors.cityCodeRequired')
      } else if (!values.location.city) {
        errors.location = translate('forms.place.errors.cityRequired')
      } else if (!values.location.country) {
        errors.location = translate('forms.place.errors.countryRequired')
      }
    }
  }

  if (values.slots) {
    const slotSize = checkSlotSize(values.slots.slotSize)
    if (!slotSize.isValid) {
      errors.slots = slotSize.errorMessage
    }
  }

  return errors
}

class PlaceForm extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isSlotSizeVisible: PropTypes.bool,
  }

  static defaultProps = {
    errorMessage: undefined,
    isLoading: false,
    isSlotSizeVisible: true,
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
          label={translate('forms.place.title')}
          name="title"
          type="text"
        />

        <Field
          component={FormTextarea}
          disabled={this.props.isLoading}
          label={translate('forms.place.description')}
          name="description"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.place.capacity')}
          name="capacity"
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.place.accessibilityInfo')}
          name="accessibilityInfo"
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

        <h2>{ translate('forms.place.where') }</h2>

        <Field
          component={FormLocationSelector}
          disabled={this.props.isLoading}
          name="location"
        />

        <hr />

        <h2>{ translate('forms.place.publicOrPrivate') }</h2>

        <Field
          component={FormCheckbox}
          disabled={this.props.isLoading}
          inline={true}
          label={translate('forms.place.areEventsPublic')}
          name="isPublic"
        />

        <hr />

        <h2>{ translate('forms.place.slots') }</h2>

        <Field
          component={FormSlotSizeEditor}
          disabled={this.props.isLoading}
          isSlotSizeVisible={this.props.isSlotSizeVisible}
          name="slots"
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
