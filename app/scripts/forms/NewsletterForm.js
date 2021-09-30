import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { FormInput, FormCheckbox } from '../components'
import { translate } from '../../../common/services/i18n'

const MAILCHIMP_URL = 'https://openfutures.us5.list-manage.com/subscribe/post?u=846e64db7559ea131acebbe4d&amp;id=7cedee47fb'
const GDPR_CODE = 356106

class NewsletterForm extends Component {
  render() {
    return (
      <form action={MAILCHIMP_URL} method="post" name="mc-embedded-subscribe-form" noValidate={true} target="_blank">
        <Field
          component={FormInput}
          label={translate('forms.newsletter.email')}
          name="EMAIL"
          type="email"
        />
        <Field
          component={FormCheckbox}
          inline={true}
          label={translate('forms.newsletter.gdpr')}
          name={`gdpr[${GDPR_CODE}]`}
          value="Y"
        />
        <div id="mce-error-response" style={ { display: 'none' } } />
        <div id="mce-success-response" style={ { display: 'none' } } />
        <div aria-hidden="true" style={ { position: 'absolute', left: -500 } }><input name="b_79c1658d0ccddf704a07d8f95_1fd08b7b47" tabIndex="-1" type="text" value="" /></div>
        <button
          className="form__submit button button--blue"
          type="submit"
          value="Subscribe"
        >
          { translate('forms.newsletter.subscribeButton') }
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'newsletter',
})(NewsletterForm)
