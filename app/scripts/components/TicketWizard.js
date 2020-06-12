import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Scroll from 'react-scroll'
import { connect } from 'react-redux'

import pick from '../../../common/utils/pick'
import { StaticPage } from './'
import { TicketForm } from '../forms'
import { buyTicket } from '../actions/auth'
import { translate } from '../../../common/services/i18n'
import { withConfig } from '../containers'

const totalSteps = 2

const permittedFields = [
  'city',
  'cityCode',
  'country',
  'email',
  'firstname',
  'lastname',
  'password',
  'paymentMethod',
  'street',
]

class TicketWizard extends Component {
  static propTypes = {
    buyTicket: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
    errorMessage: PropTypes.string.isRequired,
    form: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    form: {},
  }

  onFreeCheckout() {
    this.setState({
      isCheckoutClicked: true,
    })

    this.props.buyTicket('free', pick(permittedFields, this.props.form.values))
  }

  onPayPalCheckout() {
    this.setState({
      isCheckoutClicked: true,
    })

    this.props.buyTicket('paypal', pick(permittedFields, this.props.form.values))
  }

  onTransferCheckout() {
    this.setState({
      isCheckoutClicked: true,
    })

    this.props.buyTicket('transfer', pick(permittedFields, this.props.form.values))
  }

  onTermsAcceptedChanged() {
    this.setState({
      isTermsAccepted: this._termsCheckboxElem.checked,
    })
  }

  renderFreeButton() {
    return (
      <button
        className="button button--rainbow"
        disabled={!this.state.isTermsAccepted || this.props.isLoading}
        onClick={this.onFreeCheckout}
      >
        { translate('components.common.freeCheckout') }
      </button>
    )
  }

  renderErrorMessage() {
    if (this.props.errorMessage) {
      Scroll.animateScroll.scrollToTop()

      return (
        <div className="form__error">
          { this.props.errorMessage }
        </div>
      )
    }

    return null
  }

  renderPayPalButton() {
    if (!this.props.config.isPayPalEnabled) {
      return null
    }

    return (
      <button
        className="button button--rainbow"
        disabled={!this.state.isTermsAccepted || this.props.isLoading}
        onClick={this.onPayPalCheckout}
      >
        { translate('components.common.payViaPayPal') }
      </button>
    )
  }

  renderTransferButton() {
    if (!this.props.config.isTransferEnabled) {
      return null
    }

    return (
      <button
        className="button button--rainbow"
        disabled={!this.state.isTermsAccepted || this.props.isLoading}
        onClick={this.onTransferCheckout}
      >
        { translate('components.common.payViaTransfer') }
      </button>
    )
  }

  renderPaymentButtons() {
    if (this.state.isCheckoutClicked && this.props.isLoading) {
      return (
        <p>{ translate('common.loading') }</p>
      )
    }

    if (this.props.config.festivalTicketPrice === 0) {
      return (
        <div className="button-group">
          { this.renderFreeButton() }
        </div>
      )
    }

    if (
      !this.props.config.isTransferEnabled &&
      !this.props.config.isPayPalEnabled
    ) {
      return <p>Warning: No payment was configured</p>
    }

    return (
      <div className="button-group">
        { this.renderPayPalButton() }
        { this.renderTransferButton() }
      </div>
    )
  }

  renderPaymentGateway() {
    const title = translate('components.ticketWizard.stepTitle', {
      currentStep: 2,
      totalSteps,
    })

    return (
      <div className="form left">
        <h1>{ title }</h1>

        { this.renderErrorMessage() }

        <StaticPage hideTitle={true} slug="ticket-payment" />

        <div className="form__field form__field--inline">
          <input
            checked={this.state.isTermsAccepted}
            className="form__field-input"
            disabled={this.props.isLoading}
            ref={c => { this._termsCheckboxElem = c }}
            type="checkbox"
            onChange={this.onTermsAcceptedChanged}
          />

          <label className="form__field-label">
            { translate('components.common.agreeWithTerms') }
          </label>
        </div>

        <hr />
        { this.renderPaymentButtons() }
        <hr />

        <button
          className="button button--clear"
          disabled={this.props.isLoading}
          onClick={this.previousStep}
        >
          { translate('components.common.previousStep') }
        </button>
      </div>
    )
  }

  renderTicketForm() {
    const title = translate('components.ticketWizard.stepTitle', {
      currentStep: 1,
      totalSteps,
    })

    return (
      <div className="form">
        <h1>{ title }</h1>
        <StaticPage hideTitle={true} slug="ticket-intro" />
        <TicketForm
          errorMessage={this.props.errorMessage}
          isLoading={this.props.isLoading}
          onSubmit={this.nextStep}
        />
      </div>
    )
  }

  render() {
    if (!this.props.config.isSignUpVisitorEnabled) {
      return null
    }

    if (this.state.registrationStep === 0) {
      return this.renderTicketForm()
    } else if (this.state.registrationStep === 1) {
      return this.renderPaymentGateway()
    }

    return null
  }

  nextStep() {
    this.setState({
      registrationStep: this.state.registrationStep + 1,
    })

    Scroll.animateScroll.scrollToTop({ duration: 0, smooth: false })
  }

  previousStep() {
    this.setState({
      registrationStep: this.state.registrationStep - 1,
    })

    Scroll.animateScroll.scrollToTop({ duration: 0, smooth: false })
  }

  constructor(props) {
    super(props)

    this.state = {
      isCheckoutClicked: false,
      isTermsAccepted: false,
      registrationStep: 0,
    }

    this.nextStep = this.nextStep.bind(this)
    this.onFreeCheckout = this.onFreeCheckout.bind(this)
    this.onPayPalCheckout = this.onPayPalCheckout.bind(this)
    this.onTermsAcceptedChanged = this.onTermsAcceptedChanged.bind(this)
    this.onTransferCheckout = this.onTransferCheckout.bind(this)
    this.previousStep = this.previousStep.bind(this)
  }
}

function mapStateToProps(state) {
  const { errorMessage, isLoading } = state.ticket

  return {
    errorMessage,
    form: state.form.ticket,
    isLoading,
  }
}

export default connect(
  mapStateToProps, {
    buyTicket,
  }
)(withConfig(TicketWizard))
