import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { FormInput, FormCheckbox, FormLocationMap } from '../components'

import { translate } from '../../../common/services/i18n'

const validate = values => {
  const errors = {}

  if (!values.mailAddressAdmin) {
    errors.mailAddressAdmin = translate('forms.auth.errors.mailRequired')
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mailAddressAdmin)) {
    errors.mailAddressAdmin = translate('forms.auth.errors.invalidMail')
  }

  if (!values.mailAddressRobot) {
    errors.mailAddressRobot = translate('forms.auth.errors.mailRequired')
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mailAddressRobot)) {
    errors.mailAddressRobot = translate('forms.auth.errors.invalidMail')
  }

  if (!values.title) {
    errors.title = translate('forms.common.errors.required')
  }

  if (!values.description) {
    errors.description = translate('forms.common.errors.required')
  }

  if (!values.baseUrl) {
    errors.baseUrl = translate('forms.common.errors.required')
  }

  if (!values.currency) {
    errors.currency = translate('forms.common.errors.required')
  }

  if (!values.defaultCity) {
    errors.defaultCity = translate('forms.common.errors.required')
  }

  if (!values.defaultCountry) {
    errors.defaultCountry = translate('forms.common.errors.required')
  }

  if (!values.defaultGPS) {
    errors.defaultGPS = translate('forms.common.errors.required')
  }

  if (!values.festivalDateStart) {
    errors.festivalDateStart = translate('forms.common.errors.required')
  }

  if (!values.festivalDateEnd) {
    errors.festivalDateEnd = translate('forms.common.errors.required')
  }

  return errors
}

class AdminConfigForm extends Component {
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

        <h2>{ translate('forms.config.basicInformation') }</h2>

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.baseUrl')}
          name="baseUrl"
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.title')}
          name="title"
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.description')}
          name="description"
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.defaultTags')}
          name="defaultTags"
          type="text"
        />

        <hr />

        <h2>{ translate('forms.config.mails') }</h2>

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.mailAddressAdmin')}
          name="mailAddressAdmin"
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.mailAddressRobot')}
          name="mailAddressRobot"
          type="text"
        />

        <h2>{ translate('forms.config.localization') }</h2>

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.currency')}
          name="currency"
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.defaultCity')}
          name="defaultCity"
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.defaultCountry')}
          name="defaultCountry"
          type="text"
        />

        <Field
          component={FormLocationMap}
          disabled={this.props.isLoading}
          label={translate('forms.config.defaultFestivalGPS')}
          name="defaultGPS"
        />

        <hr />

        <h2>{ translate('forms.config.festivalDuration') }</h2>

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.festivalDateStart')}
          name="festivalDateStart"
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.festivalDateEnd')}
          name="festivalDateEnd"
          type="text"
        />

        <hr />

        <h2>{ translate('forms.config.festivalTickets') }</h2>

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.maximumParticipantsCount')}
          name="maximumParticipantsCount"
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.festivalTicketPrice')}
          name="festivalTicketPrice"
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.participationPrice')}
          name="participationPrice"
          type="text"
        />

        <hr />

        <h2>{ translate('forms.config.wireTransfer') }</h2>

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.transferReceiverName')}
          name="transferReceiverName"
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.transferBankName')}
          name="transferBankName"
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.transferIBAN')}
          name="transferIBAN"
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.transferBIC')}
          name="transferBIC"
          type="text"
        />

        <hr />

        <h2>{ translate('forms.config.videos') }</h2>

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.videoHomeId')}
          name="videoHomeId"
          type="text"
        />

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.videoIntroductionId')}
          name="videoIntroductionId"
          type="text"
        />

        <hr />

        <h2>{ translate('forms.config.features') }</h2>

        <Field
          component={FormCheckbox}
          disabled={this.props.isLoading}
          inline={true}
          label={translate('forms.config.isActivityStreamEnabled')}
          name="isActivityStreamEnabled"
        />

        <Field
          component={FormCheckbox}
          disabled={this.props.isLoading}
          inline={true}
          label={translate('forms.config.isAnonymizationEnabled')}
          name="isAnonymizationEnabled"
        />

        <Field
          component={FormCheckbox}
          disabled={this.props.isLoading}
          inline={true}
          label={translate('forms.config.isInboxEnabled')}
          name="isInboxEnabled"
        />

        <Field
          component={FormCheckbox}
          disabled={this.props.isLoading}
          inline={true}
          label={translate('forms.config.isRandomMeetingEnabled')}
          name="isRandomMeetingEnabled"
        />

        <Field
          component={FormCheckbox}
          disabled={this.props.isLoading}
          inline={true}
          label={translate('forms.config.isDerMarktEnabled')}
          name="isDerMarktEnabled"
        />

        <Field
          component={FormCheckbox}
          disabled={this.props.isLoading}
          inline={true}
          label={translate('forms.config.isSignUpParticipantEnabled')}
          name="isSignUpParticipantEnabled"
        />

        <Field
          component={FormCheckbox}
          disabled={this.props.isLoading}
          inline={true}
          label={translate('forms.config.isSignUpVisitorEnabled')}
          name="isSignUpVisitorEnabled"
        />

        <hr />

        <h2>{ translate('forms.config.services') }</h2>

        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.config.gifStreamServerUrl')}
          name="gifStreamServerUrl"
          type="text"
        />

        <hr />

        <button
          className="form__submit button button--blue"
          disabled={this.props.isLoading}
          type="submit"
        >
          { translate('forms.common.submit') }
        </button>
      </form>
    )
  }
}

AdminConfigForm = reduxForm({
  enableReinitialize: true,
  form: 'config',
  validate,
})(AdminConfigForm)

export default AdminConfigForm
